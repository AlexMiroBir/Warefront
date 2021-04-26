const {
    Inventory,
    Tool,
    Inventory_Status,
    Item_Drawing,
    Inventory_Supplier,
    Item_Parameters
} = require('../models/models')
const chalk = require('chalk')
const {Op} = require("sequelize");
const fs = require('fs')
const path = require('path')


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

    const itemPictures = await Item_Drawing.findAll({
        where: {Inventory_ID: Id}
    })

    itemPictures.forEach(pic => deleteFileFromStaticFolder(pic.Filename))


    await Inventory_Status.destroy({
        where: {Inventory_ID: Id}
    })
    await Item_Parameters.destroy({
        where: {Inventory_ID: Id}
    })
    await Item_Drawing.destroy({
        where: {Inventory_ID: Id}
    })
    await Inventory_Supplier.destroy({
        where: {Inventory_ID: Id}
    })
    await Inventory.destroy({
        where: {Id}
    })

}

async function newItemToDB(Id, row, parametersTable, suppliersTable) {
    const {
        Name, Description, Location,
        QTY_In_Stock, QTY_Min, Tool_Id,
    } = row

    if (Id === -1) {


        const newItem = await Inventory.create(
            {
                Name,
                Inventory_BCode: `BC0000000000`,
                Description,
                Tool_Id
            })
        await newItem.update({Inventory_BCode: `BC0000000000${newItem.Id}`})

        await Inventory_Status.create(
            {

                Inventory_ID: newItem.Id,
                QTY_In_Stock,
                QTY_Min,
                Location
            }
        )
        if (parametersTable) {
            await updateItemParameters(newItem.Id, parametersTable)
        }
        if (suppliersTable) {
            await updateItemSuppliers(newItem.Id, suppliersTable)
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


async function updateItemParameters(Id, parametersTable, parametersIdForDelete = []) {

    if (parametersIdForDelete) {
        await deleteItemParameters(parametersIdForDelete)
    }

    const allParameters = await Item_Parameters.findAll({
        where: {Inventory_ID: Id}
    })

    for await (const param of parametersTable) {

        const Inventory_ID = param.Inventory_ID
        const Type = param.Type
        const Parameter_Name = param.Parameter_Name
        const Parameter_Value = param.Parameter_Value

        if (param.Id === -1) {
            await Item_Parameters.create({Inventory_ID: Id, Type, Parameter_Name, Parameter_Value})
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


async function updateItemSuppliers(Id, suppliersTable, suppliersIdForDelete = []) {

    if (suppliersIdForDelete) {
        await deleteItemSuppliers(suppliersIdForDelete)
    }


    for await (const supp of suppliersTable) {
        const Inventory_ID = supp.Inventory_ID
        const Supplier_ID = supp.Supplier_ID
        const Supplier_SN = supp.Supplier_SN

        if (supp.Id === -1) {

            await Inventory_Supplier.create({
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

async function addImageToDB(Id, Filename, Filepath) {
    let General = '0x00'
    const allItemImages = await Item_Drawing.findAll({
        where: {
            Inventory_ID: Id
        }
    })


    if (allItemImages.length < 1) {
        console.log(`allImages${allItemImages}`)
        General = '0x01'
    }

    await Item_Drawing.create({
        Inventory_ID: Id,
        Filename,
        Filepath,
        General
    })
}

async function getItemImagesFromDB(Id) {
    return await Item_Drawing.findAll({
        where: {
            Inventory_ID: Id
        }
    })
}

async function getAvatarsFromDB() {
    const isGeneral = '0x01'
    return await Item_Drawing.findAll({
        where: {
            General: isGeneral
        }
    })
}

async function setAvatarDB(Id, PictId) {

    const oldAvatar = await Item_Drawing.findOne({
        where: {
            Inventory_ID: Id,
            General: '0x01'
        }
    })
    if (oldAvatar) {
        await oldAvatar.update({
            General: '0x00'
        })
    }
    const newAvatar = await Item_Drawing.findOne({
        where: {
            Inventory_ID: Id,
            Id: PictId
        }
    })

    await newAvatar.update({
        General: '0x01'
    })
}

async function deleteImageFromDB(Id) {

    const image = await Item_Drawing.findOne({
        where: {Id}
    })

    if (image) {

        const imageName = image.Filename

        if (image.General === '0x01') {
            const newAvatar = await Item_Drawing.findOne({
                where: {
                    Inventory_ID: image.Inventory_ID,
                    Id: {[Op.ne]: Id}

                }
            })
            await image.destroy()

            deleteFileFromStaticFolder(imageName)

            if (newAvatar) {
                await setAvatarDB(newAvatar.Inventory_ID, newAvatar.Id)
            }
        }
    }

}

function deleteFileFromStaticFolder(fileName) {

    fs.unlink(path.resolve(__dirname, '../..', 'static', fileName), (error) => {
        console.log(path.resolve(__dirname, '../..', 'static'))
        if (error) {
            return error
        }
    })
}


module.exports = {
    getAllItemsFromDB,
    getItemById,
    deleteItemById,
    updateItem,
    updateItemParameters,
    updateItemSuppliers,
    newItemToDB,
    addImageToDB,
    getAvatarsFromDB,
    getItemImagesFromDB,
    setAvatarDB,
    deleteImageFromDB
}