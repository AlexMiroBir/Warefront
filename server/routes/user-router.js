const Router = require('express')
const router = new Router()
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middleware/auth-middleware')
const checkRole = require ('../middleware/check-role-middleware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.put('/update-user', checkRole('ADMIN'),)
router.delete('/delete-user', checkRole('ADMIN'),)

module.exports = router