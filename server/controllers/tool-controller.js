const {Tool} = require('../DB/models/models')
const ApiError = require('../error/api-error')
const chalk = require('chalk')


class ToolController {
    async getAllTools(req, res) {
        const tools = await Tool.findAll()
        return res.json(tools)
    }

    async createOrUpdateTool(req, res, next) {
        const {Id, Name, Description} = req.body
        // console.log(chalk.red(Id, Name, Description))
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

        async deleteTool(req, res,next){
        const {Id} = req.body
            const tool = await Tool.findOne({where:{Id}})
            if(Id){
                await tool.destroy()
                return res.status(202).json('Tool has been removed')
            }
            return next(ApiError.badRequest('Tool not found'))
        }




    async getOne(req, res) {
        const {Id} = req.params
        const item = await Tool.findOne({where: {Id}})
        return res.json(item)
    }

}

module.exports = new ToolController()