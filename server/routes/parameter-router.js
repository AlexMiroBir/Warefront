const Router = require('express')
const router = new Router()
const ParameterController = require('../controllers/parameter-controller')
const checkRole = require ('../middleware/check-role-middleware')

router.post('/new-parameter', checkRole('ADMIN'),ParameterController.create)
router.get('/parameters',ParameterController.getAll)
router.get('/:id',ParameterController.getOne)
router.put('/update-parameter', checkRole('ADMIN'))
router.delete('/delete-parameter', checkRole('ADMIN'))

module.exports=router