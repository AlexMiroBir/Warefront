const Router = require('express')
const router = new Router()
const ItemController = require('../controllers/item-controller')
const checkRole = require ('../middleware/check-status-middleware')
const authMiddleware = require('../middleware/auth-middleware')




//router.post('/new-item',authMiddleware, checkRole('ADMIN'),ItemController.createOrUpdateItem)
router.get('/items',authMiddleware,ItemController.getAll)
router.get('/:Id',authMiddleware,ItemController.getOne)
router.put('/update',authMiddleware,checkRole('ADMIN'),ItemController.createOrUpdateItem)
router.put('/delete',authMiddleware, checkRole('ADMIN'),ItemController.deleteItem)

module.exports=router