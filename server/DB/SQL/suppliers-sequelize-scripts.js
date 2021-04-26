const ApiError = require('../../error/api-error')
const {Supplier} = require('../../DB/models/models')


async function getAllSuppliersFromBD() {

    const suppliers = await Supplier.findAll()
    return suppliers

}


async function createOrUpdateSupplierDB(Id, Name, Description, Phone, Contact_Name, res, next) {
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

async function deleteSupplierFromDB(Id, res,next){
    const supplier = await Supplier.findOne({where: {Id}})
    if (Id) {
        await supplier.destroy()
        return res.status(202).json('Supplier has been removed')
    }
    return next(ApiError.badRequest('Supplier not found'))
}


module.exports = {
    getAllSuppliersFromBD,
    createOrUpdateSupplierDB,
    deleteSupplierFromDB
}