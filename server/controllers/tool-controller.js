const ApiError = require('../error/api-error')
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
            await createOrUpdateToolDB(Id, Name, Description, res, next)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

    async deleteTool(req, res, next) {
        try {
            const {Id} = req.body

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