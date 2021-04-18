const chalk = require("chalk");

const uuid = require('uuid')
const ApiError = require('../error/api-error')
const path = require('path')
const {
    getAllItemsFromDB,
    getItemById,
    deleteItemById,
    updateItem,
    updateItemParameters,
    updateItemSuppliers,
    newItem
} = require("../DB/SQL/items-sql-scripts")


class ItemController {

    async getAll(req, res) {
        const AllItems = await getAllItemsFromDB()
        return res.json(AllItems)
    }

    async getOne(req, res, next) {

        try {
            const {Id} = req.params
            if (!Id) {
                return next(ApiError.badRequest("Wrong Id"))
            }
            const item = await getItemById(Id)
            if (!item) {
                return next(ApiError.badRequest("Item not found"))
            }
            return res.json(item)
        } catch (err) {
            return next(ApiError.internal(err.message))
        }
    }

    async deleteItem(req, res, next) {
        try {
            const {Id} = req.body
            if (!Id) {
                return next(ApiError.badRequest("Id not found"))
            }
            await deleteItemById(Id)
                .then(response => {
                    return res.json("Item has been removed")
                })

        } catch (err) {
            return next(ApiError.internal(err.message))
        }
    }


    async createOrUpdateItem(req, res, next) {
        console.log(req.body)
        try {

            const {
                Id, needUpdateItem, needUpdateParameters, needUpdateSuppliers,
                row, parametersTable, suppliersTable,
                parametersIdForDelete, suppliersIdForDelete,
            } = req.body


            if (Id === -1) {

                await newItem(Id, row, parametersTable, suppliersTable)


            } else {

                if (needUpdateItem) {
                    await updateItem(Id, row)
                }
                if (needUpdateParameters) {
                    await updateItemParameters(Id, parametersTable, parametersIdForDelete)
                }
                if (needUpdateSuppliers) {
                    await updateItemSuppliers(Id, suppliersTable, suppliersIdForDelete)
                }

                //
                // const tool = await Tool.findOne({where: {id: toolId}})
                // const toolName = tool.name
                //
                // const {img} = req.files
                // let fileName = uuid.v4() + '.jpg'
                // await img.mv(path.resolve(__dirname, '..', 'static', fileName))
                // const item = await Item.create({name, description, toolId, toolName, img: fileName})
                // if (parameters) {
                //     parameters = JSON.parse(parameters)
                //     parameters.forEach(param =>
                //         parameters.create({})
                //     )
                // }
                //

            }
            return res.json('ok')

        } catch (err) {
            next(ApiError.internal(err))
        }

    }


}

module.exports = new ItemController()