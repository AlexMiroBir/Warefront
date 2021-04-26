const Router = require('express')
const router = new Router()
const userRouter = require('./user-router')
const itemRouter = require('./item-router')
const supplierRouter = require('./supplier-router')
const parameterRouter = require('./parameter-router')
const orderRouter = require('./order-router')
const toolRouter = require('./tool-router')

router.use('/user',userRouter)
router.use('/item',itemRouter)
router.use('/tool',toolRouter)
router.use('/supplier', supplierRouter)
router.use('/parameter', parameterRouter)
router.use('/order', orderRouter)

module.exports=router