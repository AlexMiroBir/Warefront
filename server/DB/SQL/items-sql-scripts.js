const {
    Inventory,
    Tool,
    Inventory_Status,
    Item_Drawing,
    Inventory_Supplier,
    Item_Parameters
} = require('../models/models')
const chalk = require('chalk')

async function getAllItemsFromDB() {
    return await Inventory.findAll({
        include: [
            {
                model: Tool,
            },
            {
                model: Inventory_Status,
            },
            {
                model: Inventory_Supplier,
            },
            {
                model: Item_Parameters,
            },
            {
                model: Item_Drawing,
            }
        ]
    })


}


async function getItemById(Id) {
    return await Inventory.findOne({
        where: {Id},
        include: [
            {
                model: Tool,
            },
            {
                model: Inventory_Status,
            },
            {
                model: Inventory_Supplier,
            },
            {
                model: Item_Parameters,
            },
            {
                model: Item_Drawing,
            }
        ]
    })

}


async function deleteItemById(Id) {


    await Inventory.destroy({
        where: {Id}
    })
    await Inventory_Status.destroy({
        where: {Inventory_ID: Id}
    })
    await Item_Parameters.destroy({
        where: {Inventory_ID: Id}
    })
    await Item_Drawing.destroy({
        where: {Inventory_ID: Id}
    })
}

async function newItem(Id, row, parametersTable, suppliersTable) {
    const {
        Name, Description, Location,
        QTY_In_Stock, QTY_Min, Tool_Id,
    } = row

    if (Id === -1) {
        const newItemId = await Inventory.max('Id') + 1

        await Inventory.create(
            {
                Id: newItemId,
                Name,
                Inventory_BCode: `BC0000000000${newItemId}`,
                Description,
                Tool_Id
            })
        await Inventory_Status.create(
            {
                Id: newItemId,
                Inventory_ID: newItemId,
                QTY_In_Stock,
                QTY_Min,
                Location
            }
        )
        if (parametersTable) {
            await updateItemParameters(newItemId, parametersTable)
        }
        if (suppliersTable) {
            await updateItemSuppliers(newItemId, suppliersTable)
        }
    }

}


async function updateItem(Id, row) {
    const {
        Name, Description, Location,
        QTY_In_Stock, QTY_Min, Tool_Id,
    } = row


    const item = await Inventory.findOne({where: {Id}})
    await item.update({Name, Description, Tool_Id})

    const inventory_status = await Inventory_Status.findOne({
        where: {Inventory_ID: Id}
    })
    await inventory_status.update({QTY_In_Stock, QTY_Min, Location})

}


async function updateItemParameters(Id, parametersTable, parametersIdForDelete = []) {  // TODO придумать как не удалять сначала всё с таблицы

    if (parametersIdForDelete) {
        await deleteItemParameters(parametersIdForDelete)
    }
    let newParamId = await Item_Parameters.max('Id') + 1

    const allParameters = await Item_Parameters.findAll({
        where: {Inventory_ID: Id}
    })

    for await (const param of parametersTable) {

        const Inventory_ID = param.Inventory_ID
        const Type = param.Type
        const Parameter_Name = param.Parameter_Name
        const Parameter_Value = param.Parameter_Value

        if (param.Id === -1) {
            newParamId+=1
            await Item_Parameters.create({Id: newParamId, Inventory_ID: Id, Type, Parameter_Name, Parameter_Value})
        } else {
            const candidate = await Item_Parameters.findOne({
                where: {Id: param.Id}
            })
            if (Id) {
                await candidate.update({Type, Parameter_Name, Parameter_Value})
            }
        }
    }

}


async function deleteItemParameters(arrayWithId) {

    for (const Id of arrayWithId) {
        await Item_Parameters.destroy({
            where: {Id}
        })
    }

}


async function updateItemSuppliers(Id, suppliersTable, suppliersIdForDelete) {

    if (suppliersIdForDelete) {
        await deleteItemSuppliers(suppliersIdForDelete)
    }

    let newSuppId = await Inventory_Supplier.max('Id') + 1


    for await (const supp of suppliersTable) {
        const Inventory_ID = supp.Inventory_ID
        const Supplier_ID = supp.Supplier_ID
        const Supplier_SN = supp.Supplier_SN

        if (supp.Id === -1) {
            newSuppId+=1
            await Inventory_Supplier.create({
                Id: newSuppId,
                Inventory_ID: Id,
                Supplier_ID,
                Supplier_SN
            })
        } else {
            const candidate = await Inventory_Supplier.findOne({
                where: {Id: supp.Id}
            })
            if (Id) {
                await candidate.update({Inventory_ID, Supplier_ID, Supplier_SN})
            }
        }


    }

}


async function deleteItemSuppliers(arrayWithId) {

    for (const Id of arrayWithId) {
        await Inventory_Supplier.destroy({
            where: {Id}
        })
    }

}


module.exports = {
    getAllItemsFromDB,
    getItemById,
    deleteItemById,
    updateItem,
    updateItemParameters,
    updateItemSuppliers,
    newItem
}