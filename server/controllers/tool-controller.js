const {Tool} = require('../DB/models/models')
const ApiError = require('../error/api-error')



class ToolController {
    async getAll(req, res) {
        const tools = await Tool.findAll()
        return res.json(tools)
    }

    async create(req, res) {
        const {name, description, itemId} = req.body

        const tool = await Tool.create({name,description})
        return res.json(tool)
    }
    async getOne(req, res) {

    }

}

module.exports = new ToolController()