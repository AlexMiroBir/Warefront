const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type:DataTypes.STRING, unique:true},
    phone: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "READER"},
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,},
    description: {type: DataTypes.STRING},
    inventory_BCode: {type: DataTypes.STRING,},
    toolName: {type: DataTypes.STRING,},
    qty_in_stock: {type: DataTypes.INTEGER,},
    qty_min: {type: DataTypes.INTEGER,},
    location: {type: DataTypes.STRING,},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Tool = sequelize.define('tool', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,},
    description: {type: DataTypes.STRING},
})
const Supplier = sequelize.define('supplier', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,},
    description: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    contact_name: {type: DataTypes.STRING},
})

const Parameter = sequelize.define('parameter', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    value: {type: DataTypes.STRING,},

})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
})

const ItemSupplier = sequelize.define('item_supplier', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const ItemParameter = sequelize.define('item_parameter', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

// const ItemTool = sequelize.define('item_tool', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
// })

// User.hasMany(Order)
// Order.belongsTo(User)
//
// Item.hasMany(Supplier)
// Supplier.belongsToMany(Item)
//
// Item.hasMany(Parameter)
// Parameter.belongsToMany(Item)
//
// Item.hasMany(Tool)
// Tool.belongsToMany(Item)

User.hasMany(Order)
Order.belongsTo(User)

Item.belongsToMany(Supplier, {through: ItemSupplier})
Supplier.belongsToMany(Item, {through: ItemSupplier})

Item.belongsToMany(Parameter, {through: ItemParameter})
Parameter.belongsToMany(Item, {through: ItemParameter})

Tool.hasMany(Item)
Item.belongsTo(Tool)

module.exports = {
    User, Item, Supplier, Parameter, Tool, Order
}
