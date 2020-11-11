const router = require('express').Router()
const { 
    userController,
    productController, 
    adminProductController,
    adminUserController
} = require('../controllers')

router.use('/api/user/', userController)
router.use('/api/product/', productController)
router.use('/api/admin/product', adminProductController)
router.use('/api/admin/user', adminUserController)

module.exports = router