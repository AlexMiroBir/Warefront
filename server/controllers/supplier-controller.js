const ApiError = require('../error/api-error')

const {
    getAllSuppliersFromBD,
    createOrUpdateSupplierDB,
    deleteSupplierFromDB
} = require("../DB/SQL/suppliers-sequelize-scripts")


class SupplierController {

    async getAllSuppliers(req, res, next) {
        try {
            const suppliers = await getAllSuppliersFromBD()
            if (!suppliers) {
                return next(ApiError.badRequest('No suppliers'))
            }
            return res.json(suppliers)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }

    }

    async createOrUpdateSupplier(req, res, next) {
        try {
            const {Id, Name, Description, Phone, Contact_Name} = req.body

            await createOrUpdateSupplierDB(Id, Name, Description, Phone, Contact_Name, res, next)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

    async deleteSupplier(req, res, next) {
        try {
            const {Id} = req.body
            // const supplier = await Supplier.findOne({where: {Id}})
            // if (Id) {
            //     await supplier.destroy()
            //     return res.status(202).json('Supplier has been removed')
            // }
            // return next(ApiError.badRequest('Supplier not found'))
            await deleteSupplierFromDB(Id, res, next)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

    async getOne(req, res) {

    }

}

module.exports = new SupplierController()