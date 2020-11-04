const router = require('express').Router()
const { userController , productController } = require('../controllers')

router.use('/api/user/', userController)
router.use('/api/product/', productController)

module.exports = router