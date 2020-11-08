const router = require('express').Router()
const Product = require('../models/product')
const { restrictToAdmin } = require('../utils/authenticate')
const getDbProductsFilter = require('../utils/filter')
const { isMongoError } = require('../utils/utils')

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
        productRanges.gender = ['M', 'F']

        productRanges.categories = productRanges.categories.flat()

        productRanges.minCount = Math.min(...productRanges.minCount)
        productRanges.maxCount = Math.max(...productRanges.maxCount)

        let minSize = Number.MAX_VALUE
        let maxSize = 0
        const sizes = new Set()
        for (const size of productRanges.allSizes.flat()) {
            let sizeNumber = Number(size)

            if (isNaN(sizeNumber)) {
                sizes.add(size)
            } else {
                if (sizeNumber < minSize) {
                    minSize = sizeNumber
                } else if (sizeNumber > maxSize) {
                    maxSize = sizeNumber
                }
            }
        }

        productRanges.sizes = Array.from(sizes)
                                   .sort((a, b) => {
                                       if (a[a.length - 1] !== b[b.length - 1]) {
                                           return b[b.length - 1].localeCompare(a[a.length - 1])
                                       }

                                       return a.slice(0, a.length - 1)
                                               .localeCompare(b.slice(0, b.length - 1))
                                   })

        if (minSize !== maxSize) {
            productRanges.minSize = minSize
            productRanges.maxSize = maxSize
        }

        delete productRanges._id
        delete productRanges.allSizes

        return res.send(productRanges)

    } catch (error) {
        return res.send(error.message)
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
        isMale,
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
            isMale,
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
            isMale: currentProduct.isMale,
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

router.get('/products', async (req, res) => {
    try {
        const allProducts = await Product.find({})
        return res.send({ allProducts })
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send(error.message)
        }
        return res.status(500).send(error.message)
    }
})

module.exports = router