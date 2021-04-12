const {Tool} = require('../DB/models/models')
const ApiError = require('../error/api-error')
const chalk = require('chalk')


class ToolController {
    async getAllTools(req, res) {
        const tools = await Tool.findAll()
        return res.json(tools)
    }

    async createOrUpdateTool(req, res, next) {
        const {id, name, description} = req.body
        console.log(chalk.red(id, name, description))
        if (!name || !id || !description) {
            return next(ApiError.badRequest('Wrong data'))
        }
            if (id === -1) {
                const tool = await Tool.create({name, description})
                return res.json('New user has been created!')
            } else {

                const tool = await Tool.findOne({where: {id}})
                if (tool) {
                    await tool.update({name: name, description: description})
                    return res.status(202).json({message: "Tool data has been changed"})
                }
            }
        }

        async deleteTool(req, res,next){
        const {id} = req.body
            const tool = await Tool.findOne({where:{id}})
            if(id){
                await tool.destroy()
                return res.status(202).json('Tool has been removed')
            }
            return next(ApiError.badRequest('Tool not found'))
        }




    async getOne(req, res) {
        const {id} = req.params
        const item = await Tool.findOne({where: {id}})
        return res.json(item)
    }

}

module.exports = new ToolController()