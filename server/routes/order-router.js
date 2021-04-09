const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/order-controller')

router.post('/new-order', OrderController.create)
router.get('/orders', OrderController.getAll)
router.get('/:id', OrderController.getOne)
router.put('/update-order')
router.delete('/delete-order')

module.exports=router