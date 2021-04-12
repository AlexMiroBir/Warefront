const Router = require('express')
const router = new Router()
const ItemController = require('../controllers/item-controller')
const checkRole = require ('../middleware/check-role-middleware')
const authMiddleware = require('../middleware/auth-middleware')




router.post('/new-item',authMiddleware, checkRole('ADMIN'),ItemController.createOrUpdateItem)
router.get('/items',authMiddleware,ItemController.getAll)
router.get('/:id',authMiddleware,ItemController.getOne)
router.put('/update-item',authMiddleware,checkRole('ADMIN'))
router.delete('/delete-item',authMiddleware, checkRole('ADMIN'))

module.exports=router