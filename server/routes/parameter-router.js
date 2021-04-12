const Router = require('express')
const router = new Router()
const ParameterController = require('../controllers/parameter-controller')
const checkRole = require('../middleware/check-role-middleware')
const authMiddleware = require('../middleware/auth-middleware')


router.post('/new-parameter', authMiddleware, checkRole('ADMIN'), ParameterController.create)
router.get('/parameters', authMiddleware, ParameterController.getAll)
router.get('/:id', authMiddleware, ParameterController.getOne)
router.put('/update-parameter', authMiddleware, checkRole('ADMIN'))
router.delete('/delete-parameter', authMiddleware, checkRole('ADMIN'))

module.exports = router