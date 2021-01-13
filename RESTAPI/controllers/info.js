const router = require('express').Router()
const getValidationConstants = require('../utils/validationContasts')

const userValidationConstants = getValidationConstants('user', 'frontend')
const productValidationConstants = getValidationConstants('product', 'frontend')

router.get('/validation/:model', (req, res) => {
    const { model } = req.params

    if (model === 'user') {
        return res.send(userValidationConstants)
    } else if (model === 'product') {
        return res.send(productValidationConstants)
    }

    return res.status(400).send({ error: `Database does not contain a model named ${model}` })
})

module.exports = router