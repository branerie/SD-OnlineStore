const router = require('express').Router()
const { userController , productController, adminController } = require('../controllers')

router.use('/api/user/', userController)
router.use('/api/product/', productController)
router.use('/api/admin/', adminController)


module.exports = router