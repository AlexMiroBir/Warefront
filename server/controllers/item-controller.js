const chalk = require("chalk");

const uuid = require('uuid')
const {Item, Tool, Supplier:suppliers, Parameter:parameters} = require('../DB/models/models')
const ApiError = require('../error/api-error')
const path = require('path')


class ItemController {
    async getAll(req, res) {
        const {toolId} = req.query
        let items;
        if (!toolId) {
            items = await Item.findAll()
        } else {
            items = await Item.findAll({where: {toolId}})
        }
        return res.json(items)

    }

    async create(req, res, next) {
        try {

            let {name, description, toolId, parameters, suppliers} = req.body
            const tool = await Tool.findOne({where: {id:toolId}})
            const toolName = tool.name

            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({name, description, toolId, toolName, img: fileName})
            // if(parameters){
            //    parameters = JSON.parse(parameters)
            //     parameters.forEach(param=>
            //         parameters.create({
            //
            //         })
            //
            //     )
            // }



            return res.json(item)

        } catch (err) {
            next(ApiError.badRequest(err.message))
        }


    }


    async getOne(req, res) {

        const {id} = req.params
        const item = await Item.findOne({where:{id}})
        return res.json(item)
    }

}

module.exports = new ItemController()