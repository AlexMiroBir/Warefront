const Router = require('express')
const router = new Router()
const ItemController = require('../controllers/item-controller')
const checkRole = require ('../middleware/check-status-middleware')
const authMiddleware = require('../middleware/auth-middleware')





router.get('/items',authMiddleware,ItemController.getAll)
router.get('/:Id',authMiddleware,ItemController.getOne)
router.get('/images/avatars',authMiddleware,ItemController.getAvatars)
router.get('/itemImages/:Id',authMiddleware,ItemController.getItemImages)
router.put('/update',authMiddleware,checkRole('ADMIN'),ItemController.createOrUpdateItem)
router.put('/addImage',authMiddleware,checkRole('ADMIN'),ItemController.addImage)
router.put('/delete',authMiddleware,checkRole('ADMIN'),ItemController.deleteItem)
router.put('/images/delete',authMiddleware,checkRole('ADMIN'),ItemController.deleteImage)
router.put('/setAvatar',authMiddleware,checkRole('ADMIN'),ItemController.setAvatar)


module.exports=router