const Router = require('express')
const router = new Router()
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middleware/auth-middleware')
const checkRole = require ('../middleware/check-role-middleware')


//router.post('/registration',checkRole('ADMIN'), userController.registration)
router.post('/login', userController.login)
router.post('/changePassword',authMiddleware, userController.changPassword)
router.post('/addOrUpdateUser',authMiddleware,checkRole('ADMIN'), userController.addOrUpdateUser)
router.get('/auth', authMiddleware, userController.check)
router.get('/logout', authMiddleware, userController.logOut)
router.get('/users', authMiddleware, userController.getAllUsers)
router.put('/update-user', checkRole('ADMIN'),)
router.put('/delete',authMiddleware, checkRole('ADMIN'),userController.deleteUser)

module.exports = router