const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/order-controller')
const authMiddleware = require('../middleware/auth-middleware')


router.post('/new',authMiddleware, OrderController.createOrder)
router.get('/orders',authMiddleware, OrderController.getAll)
// router.get('/:id',authMiddleware, OrderController.getOne)
router.put('/pickup',authMiddleware,OrderController.pickUpItem)
router.delete('/delete-order',authMiddleware,)

module.exports=router