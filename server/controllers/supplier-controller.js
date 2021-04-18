const ApiError = require('../error/api-error')
const {Supplier} = require('../DB/models/models')
const chalk = require('chalk')


class SupplierController {
    async getAllSuppliers(req, res, next) {
        const suppliers = await Supplier.findAll()
        if (!suppliers) {
            return next(ApiError.badRequest('No suppliers'))
        }
        return res.json(suppliers)

    }

    async createOrUpdateSupplier(req, res, next) {
        const {Id, Name, Description, Phone, Contact_Name} = req.body
        if (!Name || !Description || !Phone || !Contact_Name) {
            return next(ApiError.badRequest('Wrong data'))
        }
        if (Id === -1) {
            await Supplier.create({Name, Description, Phone, Contact_Name})
                .then(response => {
                    return res.json(response)
                })

        } else {

            const supplier = await Supplier.findOne({where: {Id}})
            if (supplier) {
                await supplier.update({Name, Description, Phone, Contact_Name})
                return res.status(202).json({message: "Supplier data has been changed"})
            }
        }
    }

    async deleteSupplier(req, res, next) {
        const {Id} = req.body
        const supplier = await Supplier.findOne({where: {Id}})
        if (Id) {
            await supplier.destroy()
            return res.status(202).json('Supplier has been removed')
        }
        return next(ApiError.badRequest('Supplier not found'))
    }

    async getOne(req, res) {

    }

}

module.exports = new SupplierController()