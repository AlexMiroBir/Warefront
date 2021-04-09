const Router = require('express')
const router = new Router()
const ToolController = require('../controllers/tool-controller')
const checkRole = require ('../middleware/check-role-middleware')


router.post('/new-tool', checkRole('ADMIN'), ToolController.create)
router.get('/tools', ToolController.getAll)
router.get('/:id', ToolController.getOne)
router.put('/update-tool', checkRole('ADMIN'),)
router.delete('/delete-tool', checkRole('ADMIN'),)

module.exports=router