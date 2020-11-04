const router = require('express').Router()
const Product = require('../models/product')
const { restrictToAdmin } = require('../utils/authenticate')
const { isMongoError } = require('../utils/utils')

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
    } catch(error) {
        if (isMongoError(error)) { 
            return res.status(403).send(error.message)
        }

        if (error.name === 'CastError') {
            return res.status(403).send(`Product with id ${id} does not exist.`)
        }

        return res.status(500).send(error.message)
    }
})

router.put('/:id', restrictToAdmin, async (req , res) => {
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