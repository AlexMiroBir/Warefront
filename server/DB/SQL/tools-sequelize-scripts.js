const {Tool} = require('../../DB/models/models')
const ApiError = require('../../error/api-error')

async function getAllToolsFromDB() {

    return await Tool.findAll()

}

async function createOrUpdateToolDB(Id, Name, Description, res, next) {

    if (!Name || !Id || !Description) {
        return next(ApiError.badRequest('Wrong data'))
    }
    if (Id === -1) {
        await Tool.create({Name, Description})
        return res.json('New user has been created!')
    } else {

        const tool = await Tool.findOne({where: {Id}})
        if (tool) {
            await tool.update({Name, Description})
            return res.status(202).json({message: "Tool data has been changed"})
        }
    }

}

async function deleteToolFromDB(Id, res, next) {

    const tool = await Tool.findOne({where: {Id}})
    if (Id) {
        await tool.destroy()
        return res.status(202).json('Tool has been removed')
    }
    return next(ApiError.badRequest('Tool not found'))
}

async function getOneToolFromDB(Id) {
    const item = await Tool.findOne({where: {Id}})
    return item

}


module.exports = {
    getAllToolsFromDB,
    createOrUpdateToolDB,
    deleteToolFromDB,
    getOneToolFromDB
}