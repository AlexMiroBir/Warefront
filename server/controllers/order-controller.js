const ApiError = require('../error/api-error')
const {
    pickUpItemDB,
    getAllOrdersFromDB
} = require("../DB/SQL/orders-sequelize-scripts")

class OrderController {

    async getAll(req, res, next) {
        try {
            const AllOrders = await getAllOrdersFromDB()
            return res.json(AllOrders)
        } catch (err) {
            return next(ApiError.internal(err.message))
        }
    }

    async createOrder(req, res) {

    }

    async pickUpItem(req, res, next) {

        try {
            console.log(req.body)
            let {Id, PickUpQTY, User_Id, Tool_Id} = req.body
            await pickUpItemDB(Id, PickUpQTY, User_Id, Tool_Id, res, next)

        } catch (error) {
            return next(ApiError.internal(error.message))
        }


    }


}

module.exports = new OrderController()