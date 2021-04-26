const chalk = require("chalk");
const fs = require('fs')
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
    newItemToDB,
    addImageToDB,
    getItemImagesFromDB,
    getAvatarsFromDB,
    setAvatarDB,
    deleteImageFromDB
} = require("../DB/SQL/items-sequelize-scripts")


class ItemController {

    async getAll(req, res, next) {
        try {
            const AllItems = await getAllItemsFromDB()
            return res.json(AllItems)
        } catch (err) {
            return next(ApiError.internal(err.message))
        }
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

                await newItemToDB(Id, row, parametersTable, suppliersTable)


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

    async addImage(req, res, next) {


        try {
            const {File} = req.files
            const {Id, General} = req.body
            console.log(Id)
            const Filename = uuid.v4() + '.png'
            await File.mv(path.resolve(__dirname, '..', 'static', Filename))

            const Filepath = path.resolve(__dirname, '..', 'static')
            await addImageToDB(Id, Filename, Filepath, General)

            return res.json('ok')
        } catch (err) {
            next(ApiError.internal(err.message))
        }

    }

    async getAvatars(req, res, next) {

        try {
            const Avatars = await getAvatarsFromDB()
            return res.json(Avatars)
        } catch (err) {
            return next(ApiError.internal(err.message))
        }
    }

    async getItemImages(req, res, next) {
        try {
            const {Id} = req.params
            const Images = await getItemImagesFromDB(Id)
            return res.json(Images)
        } catch (err) {
            return next(ApiError.internal(err.message))
        }
    }

    async setAvatar(req, res, next) {
        const {Id, PictId} = req.body
        try {
            await setAvatarDB(Id, PictId)
            return res.json('avatar was changed')
        } catch (err) {
            return next(ApiError.internal(err.message))
        }

    }

    async deleteImage(req, res, next) {

        try {
            const {Id} = req.body
            await deleteImageFromDB(Id)


            return res.json('image was removed')
        } catch (err) {
            return next(ApiError.internal(err.message))
        }

    }


}

module.exports = new ItemController()