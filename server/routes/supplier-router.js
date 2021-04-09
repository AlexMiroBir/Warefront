const Router = require('express')
const router = new Router()
const SupplierController = require('../controllers/supplier-controller')
const checkRole = require ('../middleware/check-role-middleware')


router.post('/new-supplier',checkRole("ADMIN"),SupplierController.create)
router.get('/suppliers',SupplierController.getAll)
router.get('/:id',SupplierController.getOne)
router.put('/update-supplier', checkRole("ADMIN"))
router.delete('/delete-supplier', checkRole("ADMIN"))

module.exports=router