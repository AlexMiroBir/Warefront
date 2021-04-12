const chalk = require("chalk");

const uuid = require('uuid')
const {Item, Tool, Supplier, Parameter} = require('../DB/models/models')
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

    async createOrUpdateItem(req, res, next) {
        console.log(req.body)
        try {

            let {
                id, name, description,
                inventory_bCode, location,
                qtyInStock, qtyMin, img,
                parameters, suppliers
            } = req.body


            if (id === -1) {
                const newItemId = await Item.max('id') + 1
if(parameters){
    parameters = JSON.parse(parameters)
    parameters.forEach(param=>
        Parameter.create({name:param.name, value:param.value})
    )


}

            } else {

                // const tool = await Tool.findOne({where: {id: toolId}})
                // const toolName = tool.name
                //
                // const {img} = req.files
                // let fileName = uuid.v4() + '.jpg'
                // await img.mv(path.resolve(__dirname, '..', 'static', fileName))
                // const item = await Item.create({name, description, toolId, toolName, img: fileName})
                // if(parameters){
                //    parameters = JSON.parse(parameters)
                //     parameters.forEach(param=>
                //         parameters.create({
                //
                //         })
                //
                //     )
                // }


            }
            return res.json('ok')

        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async getOne(req, res) {

        const {id} = req.params
        const item = await Item.findOne({where: {id}})
        return res.json(item)
    }

}

module.exports = new ItemController()