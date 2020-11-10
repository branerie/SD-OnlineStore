const router = require('express').Router()
const { restrictToAdmin } = require('../utils/authenticate')
const Product = require('../models/product')
const { isMongoError } = require('../utils/utils')

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
    const id = req.params.id
    
    try {
        const productProps = Object.entries(req.body)
            .filter(kvp => Product.schema.obj.hasOwnProperty(kvp[0]))

        const updateProductObject = productProps.reduce((acc, kvp) => {
            acc[kvp[0]] = kvp[1]
            return acc
        }, {})


        await Product.findOneAndUpdate({ _id: id }, { $set: updateProductObject })

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

router.patch('/:id/categories', restrictToAdmin, async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).send({ error: `Product with id ${productId} does not exist.` })
        }

        for (let operation of req.body.operations) {
            const { action, value } = operation

            if (!value || !action) {
                return res.status(400).send({ error: 'Operation must contain "value" and "action" fields.' })
            }

            let mongooseOperation = null
            if (action === 'add') {
                if (product.categories.includes(value)) {
                    return res.status(400).send({ error: `Product with id ${productId} already has category ${value}.` })
                }

                mongooseOperation = '$push'
            } else if (action === 'delete') {
                if (!product.categories.includes(value)) {
                    return res.status(400).send({ error: `Product with id ${productId} does not have category ${value}.` })
                }

                mongooseOperation = '$pull'
            } else {
                return res.status(400).send({ error: 'Invalid action applied to product categories. Valid actions are "add" and "delete".' })
            }

            await product.updateOne({
                [mongooseOperation]: { categories: value }
            })

            await product.save()
        }

        return res.send({ productId: productId, message: 'Success!' })
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send({ error: error.message })
        }

        return res.status(500).send({ error: error.message })
    }
})

router.patch('/:id/sizes', async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).send({ error: `Product with id ${productId} does not exist.` })
        }

        for (let operation of req.body.operations) {
            const { action, value } = operation

            if (!value || !action) {
                return res.status(400).send({ error: 'Operation must contain "value" and "action" fields.' })
            }

            if (typeof (value) !== 'object' || !value.hasOwnProperty('sizeName')) {
                return res.status(400).send({ error: 'Invalid size format. Expecting a value object with property "sizeName".' })
            }

            if (action === 'delete') {
                await product.update({
                    $pull: {
                        sizes: {
                            sizeName: value.sizeName
                        }
                    }
                })
            }

            if (!value.hasOwnProperty('count')) {
                return res.status(400).send({ error: 'Invalid size format. Missing property "value.count".' })
            }

            const numCount = Number(value.count)
            if (isNaN(numCount) || !Number.isInteger(numCount) || numCount < 0) {
                return res.status(400).send({ error: 'Product size count must be a non-negative integer number.' })
            }

            const productSize = await product.sizes.find(s => s.sizeName === value.sizeName)

            if (action === 'add') {
                if (productSize) {
                    return res.status(400).send({
                        error: `Product with id ${productId} already contains size with name ${value.sizeName}`
                    })
                }

                await product.updateOne({
                    $push: {
                        sizes: {
                            sizeName: value.sizeName,
                            count: value.count
                        }
                    }
                })
            } else if (action === 'edit') {
                if (!productSize) {
                    return res.status(400).send({
                        error: `Product with id ${productId} does not contain size with name ${value.sizeName}.`
                    })
                }

                productSize.count = value.count
                await product.save()
            } else {
                return res.status(400).send({ error: 'Invalid action applied to product sizes. Valid actions are "add", "edit" and "delete".' })
            }
        }

        return res.send({ productId: productId, message: 'Success!' })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

module.exports = router