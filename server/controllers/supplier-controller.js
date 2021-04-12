const ApiError = require('../error/api-error')
const {Supplier} = require('../DB/models/models')


class SupplierController {
    async getAllSuppliers(req, res, next) {
        const suppliers = await Supplier.findAll()
        if (!suppliers) {
            return next(ApiError.badRequest('No suppliers'))
        }
        return res.json(suppliers)

    }

    async createOrUpdateSupplier(req, res, next) {
        const {id, name, description, phone, contact_name} = req.body
        if (!name || !description || !phone || !contact_name) {
            return next(ApiError.badRequest('Wrong data'))
        }
        if (id === -1) {
            const supplier = await Supplier.create({name, description, phone, contact_name})
            return res.json('New supplier has been created!')
        } else {

            const supplier = await Supplier.findOne({where: {id}})
            if (supplier) {
                await supplier.update({name: name, description: description, phone: phone, contact_name})
                return res.status(202).json({message: "Supplier data has been changed"})
            }
        }
    }

    async deleteSupplier(req, res, next) {
        const {id} = req.body
        const supplier = await Supplier.findOne({where: {id}})
        if (id) {
            await supplier.destroy()
            return res.status(202).json('Supplier has been removed')
        }
        return next(ApiError.badRequest('Supplier not found'))
    }

    async getOne(req, res) {

    }

}

module.exports = new SupplierController()