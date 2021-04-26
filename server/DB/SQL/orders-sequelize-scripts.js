const ApiError = require('../../error/api-error')
const {
    Supplier,
    Inventory,
    Inventory_Status,
    Tool,
    User,
    Transfer
} = require('../../DB/models/models')
const sequelize = require('sequelize')

async function pickUpItemDB(Id, PickUpQTY, User_Id, Tool_Id, res, next) {


    const inventoryStatus = await Inventory_Status.findOne({
        where: {Inventory_ID: Id}
    })
    if (inventoryStatus) {
        const qty = inventoryStatus.QTY_In_Stock
        const newQTY = qty - PickUpQTY
        if (newQTY >= 0) {
            await inventoryStatus.update({QTY_In_Stock: newQTY})
            await createNewOrderToDB(Id, PickUpQTY, User_Id, Tool_Id)
            return res.status(202).json({message: `${PickUpQTY} pcs were ordered `})
        }
    }
    return next(ApiError.internal("Internal Server Error"))

}

async function createNewOrderToDB(Id, PickUpQTY, User_Id, Tool_Id) {
    await Transfer.create({Inventory_ID: Id, QTY: PickUpQTY, Date: sequelize.fn('NOW'), User_Id, Tool_Id})
}


async function getAllOrdersFromDB() {
    return await Transfer.findAll()
}

module.exports = {
    getAllOrdersFromDB,
    pickUpItemDB
}