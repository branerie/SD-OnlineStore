const router = require('express').Router()
const Product = require('../models/product')
const getDbProductsFilter = require('../utils/filter')
const { isMongoError } = require('../utils/utils')
const { getSizeRange, sortSizes, getImageUrl } = require('../utils/product')

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

        productRanges.categories = [...new Set(productRanges.categories.flat())]
        productRanges.categories.sort((a, b) => a.localeCompare(b))

        productRanges.brand.sort((a, b) => a.localeCompare(b))

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
        if (isMongoError(error)) {
            return res.status(403).send({ error: error.message })
        }

        return res.status(500).send({ error: error.message })
    }
})

router.get('/products', async (req, res) => {
    try {
        const page = Math.max(0, req.query.page)
        const pageLength = Math.max(1, req.query.pageLength)
        const productFilters = getDbProductsFilter(req.query)

        const totalCount = await Product.find(productFilters).count()
        const fullProducts = await Product.find(productFilters)
                                          .skip(page * pageLength)
                                          .limit(pageLength)

        const products = fullProducts.map(p => {
            return {
            id: p._id,
            sizes: p.sizes,
            price: p.price,
            discount: p.discount.$isEmpty() ? null : {
                percent: p.discount.percent * 100,
                endDate: p.discount.endDate.toISOString().slice(0, 10)
            },
            brand: p.brand,
            description: p.description,
            images: p.images.length > 0
                ? p.images.map(image => getImageUrl(image))
                : null,
            gender: p.gender,
            categories: p.categories,
            discountPrice: p.discountPrice
        }})

        return res.send({ total: totalCount, productInfo: products })
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send({ error: error.message })
        }

        return res.status(500).send({ error: error.message })
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
            return res.status(403).send({ error: error.message })
        }

        if (error.name === 'CastError') {
            return res.status(403).send({ error: `Product with id ${id} does not exist.` })
        }

        return res.status(500).send({ error: error.message })
    }
})

module.exports = router