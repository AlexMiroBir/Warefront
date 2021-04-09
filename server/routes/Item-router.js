const Router = require('express')
const router = new Router()
const ItemController = require('../controllers/item-controller')
const checkRole = require ('../middleware/check-role-middleware')




router.post('/new-item', checkRole('ADMIN'),ItemController.create)
router.get('/items',ItemController.getAll)
router.get('/:id',ItemController.getOne)
router.put('/update-item',checkRole('ADMIN'))
router.delete('/delete-item', checkRole('ADMIN'))

module.exports=router