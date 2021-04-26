const {Tool} = require('../DB/models/models')
const ApiError = require('../error/api-error')
const chalk = require('chalk')
const {
    getAllToolsFromDB,
    createOrUpdateToolDB,
    deleteToolFromDB,
    getOneToolFromDB
} = require('../DB/SQL/tools-sequelize-scripts'
)


class ToolController {

    async getAllTools(req, res, next) {

        try {

            const tools = await getAllToolsFromDB()
            return res.json(tools)

        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }


    async createOrUpdateTool(req, res, next) {
        try {
            const {Id, Name, Description} = req.body
            // console.log(chalk.red(Id, Name, Description))
            // if (!Name || !Id || !Description) {
            //     return next(ApiError.badRequest('Wrong data'))
            // }
            // if (Id === -1) {
            //     await Tool.create({Name, Description})
            //     return res.json('New user has been created!')
            // } else {
            //
            //     const tool = await Tool.findOne({where: {Id}})
            //     if (tool) {
            //         await tool.update({Name, Description})
            //         return res.status(202).json({message: "Tool data has been changed"})
            //     }
            // }
            await createOrUpdateToolDB(Id, Name, Description, res, next)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

    async deleteTool(req, res, next) {
        try {
            const {Id} = req.body
            // const tool = await Tool.findOne({where: {Id}})
            // if (Id) {
            //     await tool.destroy()
            //     return res.status(202).json('Tool has been removed')
            // }
            // return next(ApiError.badRequest('Tool not found'))
            await deleteToolFromDB(Id, res, next)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }


    async getOne(req, res, next) {
        try {
            const {Id} = req.params
            const item = await getOneToolFromDB(Id)
            return res.json(item)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

}

module.exports = new ToolController()