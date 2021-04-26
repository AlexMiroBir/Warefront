const Router = require('express')
const router = new Router()
const SupplierController = require('../controllers/supplier-controller')
const checkRole = require('../middleware/check-status-middleware')
const authMiddleware = require('../middleware/auth-middleware')



router.post('/createOrUpdateSupplier',authMiddleware, checkRole("ADMIN"), SupplierController.createOrUpdateSupplier)
router.get('/suppliers', authMiddleware, SupplierController.getAllSuppliers)
router.get('/:id', authMiddleware, SupplierController.getOne)
router.put('/update-supplier', authMiddleware, checkRole("ADMIN"),)
router.put('/delete', authMiddleware, checkRole("ADMIN"),SupplierController.deleteSupplier)

module.exports = router