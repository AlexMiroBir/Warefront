const Router = require('express')
const router = new Router()
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middleware/auth-middleware')
const checkStatus = require ('../middleware/check-status-middleware')


//router.post('/registration',checkStatus('ADMIN'), userController.registration)
router.post('/login', userController.login)
router.post('/changePassword',authMiddleware, userController.changPassword)
router.post('/addOrUpdateUser',authMiddleware,checkStatus('ADMIN'), userController.addOrUpdateUser)
//router.get('/auth', authMiddleware, userController.check)
router.get('/logout', authMiddleware, userController.logOut)
router.get('/users', authMiddleware, userController.getAllUsers)
router.put('/update-user', checkStatus('ADMIN'),)
router.put('/delete',authMiddleware, checkStatus('ADMIN'),userController.deleteUser)

module.exports = router
