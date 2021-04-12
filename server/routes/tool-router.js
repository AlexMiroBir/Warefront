const Router = require('express')
const router = new Router()
const ToolController = require('../controllers/tool-controller')
const checkRole = require ('../middleware/check-role-middleware')
const authMiddleware = require('../middleware/auth-middleware')



router.post('/createOrUpdateTool',authMiddleware, checkRole('ADMIN'), ToolController.createOrUpdateTool)
router.get('/tools',authMiddleware, ToolController.getAllTools)
router.get('/:id',authMiddleware, ToolController.getOne)
router.put('/update',authMiddleware, checkRole('ADMIN'),)
router.put('/delete',authMiddleware, checkRole('ADMIN'),ToolController.deleteTool)

module.exports=router