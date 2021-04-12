const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false},
    Phone: {type: DataTypes.STRING, unique: true, allowNull: true},
    Password: {type: DataTypes.STRING, allowNull: false},
    Status: {type: DataTypes.STRING, defaultValue: "READER", allowNull: false},
},{ freezeTableName: true, schema:'dbo'})

const Inventory_Status = sequelize.define('Inventory_Status', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_ID: {type: DataTypes.INTEGER, allowNull: false},
    QTY_In_Stock: {type: DataTypes.INTEGER, allowNull: false},
    QTY_Min: {type: DataTypes.INTEGER, allowNull: false},
    Location: {type: DataTypes.STRING, allowNull: false},
},{ freezeTableName: true, schema:'dbo'})

const Item_Drawing = sequelize.define('Item_Drawing', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_ID: {type: DataTypes.INTEGER, allowNull: false},
    Filename:{type: DataTypes.STRING, allowNull: false},
    Filepath:{type: DataTypes.STRING, allowNull: false}

},{ freezeTableName: true, schema:'dbo'})

const Item_Parameters = sequelize.define('Item_Parameters', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_ID: {type: DataTypes.INTEGER, allowNull: false},
    Type:{type: DataTypes.STRING, unique: true, allowNull: true},
    Parameter_Name: {type: DataTypes.STRING,allowNull: true},
    Parameter_Value: {type: DataTypes.STRING,allowNull: true},

},{ freezeTableName: true, schema:'dbo'})

const Inventory_Supplier = sequelize.define('Inventory_Supplier', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_ID: {type: DataTypes.INTEGER, allowNull: false},
    Supplier_ID:{type: DataTypes.INTEGER, allowNull: false},
    Supplier_SN:{type: DataTypes.STRING, allowNull: false}
},{ freezeTableName: true, schema:'dbo'})


const Supplier = sequelize.define('Supplier', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING,},
    Description: {type: DataTypes.STRING, allowNull: true},
    Phone: {type: DataTypes.STRING, allowNull: true},
    Contact_Name: {type: DataTypes.STRING, allowNull: false},
},{ freezeTableName: true, schema:'dbo'})




const Tool = sequelize.define('Tool', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    Description: {type: DataTypes.STRING, allowNull: true},
},{ freezeTableName: true, schema:'dbo'})

const Transfer = sequelize.define('Transfer',{
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_ID: {type: DataTypes.INTEGER, allowNull: false},
    QTY:{type: DataTypes.INTEGER, allowNull: false},
    Date:{type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    User_Id: {type: DataTypes.INTEGER, allowNull: false},
    Tool_Id: {type: DataTypes.INTEGER, allowNull: false},
},{ freezeTableName: true, schema:'dbo'})

const Inventory = sequelize.define('Inventory',{

    Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_BCode:  {type: DataTypes.STRING, allowNull: false},
    Name: {type: DataTypes.STRING, allowNull: false},
    Description: {type: DataTypes.STRING, allowNull: true},
    Tool_Id: {type: DataTypes.INTEGER, allowNull: true},

},{ freezeTableName: true, schema:'dbo'})





//
// const Order = sequelize.define('order', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
// })
//
// const ItemSupplier = sequelize.define('item_supplier', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
// })
// const ItemParameter = sequelize.define('item_parameter', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
// })
//
// // const ItemTool = sequelize.define('item_tool', {
// //     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
// // })
//
// // User.hasMany(Order)
// // Order.belongsTo(User)
// //
// // Item.hasMany(Supplier)
// // Supplier.belongsToMany(Item)
// //
// // Item.hasMany(Parameter)
// // Parameter.belongsToMany(Item)
// //
// // Item.hasMany(Tool)
// // Tool.belongsToMany(Item)
//
// User.hasMany(Order)
// Order.belongsTo(User)
//
// Item.belongsToMany(Supplier, {through: ItemSupplier})
// Supplier.belongsToMany(Item, {through: ItemSupplier})
//
// Item.belongsToMany(Parameter, {through: ItemParameter})
// Parameter.belongsToMany(Item, {through: ItemParameter})
//
// Tool.hasMany(Item)
// Item.belongsTo(Tool)

module.exports = {
    User, Inventory_Status, Item_Drawing, Item_Parameters, Inventory_Supplier, Supplier, Tool, Transfer, Inventory
}
