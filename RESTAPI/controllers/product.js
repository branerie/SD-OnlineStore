const router = require('express').Router()
const User = require('../models/user')
const Product = require('../models/product')
const { 
    getDbProductsFilter, 
    getSortCriteria, 
    getProductsAggregationObject 
} = require('../utils/filter')
const { 
    getSizeRange, 
    sortSizes, 
    getAllCategories, 
    parseFullMongoProducts,
    parseCartMongoProducts
} = require('../utils/product')
const { isMongoError } = require('../utils/general')
const { restrictToUser } = require('../utils/authenticate')
const { Types: { ObjectId } } = require('mongoose')

router.get('/ranges', async (req, res) => {
    try {
        const dbRequestFilter = getDbProductsFilter(req.query)
        
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
        const page = Math.max(0, (req.query.page || 0))
        const pageLength = Math.max(1, (req.query.pageLength || 0))
        const productFilters = getDbProductsFilter(req.query || '')
        const sortCriteria = getSortCriteria(req.query.sort || '')

        const aggObj = getProductsAggregationObject(productFilters, sortCriteria, page, pageLength)
        const [{ totalCount, fullProducts }] = await (await Product.aggregate(aggObj))
        const total = totalCount.length > 0 ? totalCount[0].count : 0

        const products = parseFullMongoProducts(fullProducts)
        return res.send({ total: total, productInfo: products })
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send({ error: error.message })
        }

        return res.status(500).send({ error: error.message })
    }
})

router.get('/categories', (req, res) => {
    try {
        const categories = getAllCategories()
        return res.send({ categories })
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server Error' })
    }
})

router.get('/details/main', async (req, res) => {
    try {
        const { pid: productStringIds } = req.query

        if (!productStringIds) {
            return res.status(400).send({ error: 'Missing product ids' })
        }

        const productIds = productStringIds.split(',').map(id => new ObjectId(id))

        const fullProductsInCart = await Product.find({ _id: { $in: productIds } })
        const productDetailsMain = parseCartMongoProducts(fullProductsInCart)

        const detailsById = productDetailsMain.reduce((acc, productInfo) => {
            return { ...acc, [productInfo.productId]: productInfo }
        }, {})

        return res.send(detailsById)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const currentProduct = await Product.findById(id)
        return res.send(parseFullMongoProducts([currentProduct])[0])
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

router.patch('/rating', restrictToUser, async (req, res) => {
    try {
        const { rating , productId } = req.body
        const product = await Product.findById(productId)
        const numRating = Number(rating)

        if (isNaN(numRating) || !Number.isInteger(numRating) || numRating < 0) {
            return res.status(400).send({ 
                error: 'Product rating must be a non-negative integer number.' 
            })
        }

        if (rating > 5) {
            return res.status(400).send({ error: `Product cannot be rated with ${rating} stars.` })
        }

        const oldRating = product.rating.currentRating || 0
        const oldcount = product.rating.counter || 0
        const count = oldcount + 1
        const newRating = { currentRating : oldRating + numRating, counter : count }
        
        const user = await User.findById(req.user.userId)
        if (!user) {
            throw new Error()
        }

        user.ratedProducts.push(product)

        await product.updateOne({ $set: { rating : newRating }})
        await user.save()
        
        return res.send({
            productId,
            currentRating: Math.round(newRating.currentRating / count), 
            counter: count 
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