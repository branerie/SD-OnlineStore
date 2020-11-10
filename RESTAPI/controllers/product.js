const router = require('express').Router()
const Product = require('../models/product')
const { restrictToAdmin } = require('../utils/authenticate')
const getDbProductsFilter = require('../utils/filter')
const { isMongoError } = require('../utils/utils')
const { getSizeRange, sortSizes } = require('../utils/product')

router.get('/ranges', async (req, res) => {
    const dbRequestFilter = getDbProductsFilter(req.query)

    try {
        let productRanges = await Product.aggregate([
            {
                $match: dbRequestFilter
            },
            {
                $group: {
                    _id: 0,
                    'brand': { $addToSet: '$brand' },
                    'categories': { $addToSet: '$categories' },
                    'gender': { $addToSet: '$gender' },
                    'minPrice': { $min: '$price' },
                    'maxPrice': { $max: '$price' },
                    'minCount': { $min: '$sizes.count' },
                    'maxCount': { $max: '$sizes.count' },
                    'allSizes': { $addToSet: '$sizes.sizeName' }
                }
            }
        ])

        if (productRanges.length === 0) {
            return res.send([])
        }

        productRanges = productRanges[0]

        productRanges.categories = productRanges.categories.flat()

        productRanges.minCount = Math.min(...productRanges.minCount)
        productRanges.maxCount = Math.max(...productRanges.maxCount)

        const sizes = new Set()
        for (const size of productRanges.allSizes.flat()) {
            let sizeNumber = Number(size)

            if (isNaN(sizeNumber)) {
                sizes.add(size)
            } else {
                sizes.add(getSizeRange(sizeNumber))
            }
        }

        productRanges.sizes = Array.from(sizes)
                                   .sort(sortSizes)

        delete productRanges._id
        delete productRanges.allSizes

        return res.send(productRanges)

    } catch (error) {
        return res.send(error.message)
    }
})

router.get('/products', async (req, res) => {
    try {
        const fullProducts = await Product.find({})
        const products = fullProducts.map(p => {
            return {
            id: p._id,
            sizes: p.sizes,
            price: p.price,
            discount: p.discount,
            brand: p.brand,
            description: p.description,
            images: p.images,
            gender: p.gender,
            categories: p.categories,
            discountPrice: p.discountPrice
        }})

        return res.send(products)
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send(error.message)
        }
        
        return res.status(500).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const currentProduct = await Product.findById(id)
        return res.send({
            sizes: currentProduct.sizes,
            price: currentProduct.price,
            discount: currentProduct.discount,
            brand: currentProduct.brand,
            description: currentProduct.description,
            images: currentProduct.images,
            gender: currentProduct.gender,
            categories: currentProduct.categories
        })
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send(error.message)
        }

        if (error.name === 'CastError') {
            return res.status(403).send(`Product with id ${id} does not exist.`)
        }

        return res.status(500).send(error.message)
    }
})


router.post('/', restrictToAdmin, async (req, res) => {
    const {
        sizes,
        price,
        discount,
        brand,
        description,
        images,
        gender,
        categories
    } = req.body
    try {
        const createdProduct = await Product.create({
            sizes,
            price,
            discount,
            brand,
            description,
            images,
            gender,
            categories
        })
        res.send({ status: 'Success', id: createdProduct._id })
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send(error.message)
        }

        return res.status(500).send(error.message)
    }

})

router.put('/:id', restrictToAdmin, async (req, res) => {
    try {
        const id = req.params.id
        const productProps = Object.entries(req.body)
            .filter(kvp => Product.schema.obj.hasOwnProperty(kvp[0]))

        const updateProductObject = productProps.reduce((acc, kvp) => {
            acc[kvp[0]] = kvp[1]
            return acc
        }, {})


        await Product.findByIdAndUpdate(id, { $set: updateProductObject })

        return res.send(`Product with id ${id} successfully updated.`)
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send(error.message)
        }

        if (error.name === 'CastError') {
            return res.status(403).send(`Product with id ${id} does not exist.`)
        }

        return res.status(500).send(error.message)
    }
})

router.delete('/:id', restrictToAdmin, async (req, res) => {
    try {
        const id = req.params.id
        await Product.findByIdAndDelete(id)

        return res.send({ success: true, removedId: id })
    } catch (error) {
        if (isMongoError(error)) {
            res.status(403).send(error.message)
        }

        if (error.name === 'CastError') {
            return res.status(403).send(`Product with id ${id} does not exist.`)
        }

        res.status(500).send(error.message)
    }
})

module.exports = router