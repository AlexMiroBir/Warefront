const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false},
    Status: {type: DataTypes.STRING, defaultValue: "READER", allowNull: false},
    Phone: {type: DataTypes.STRING, allowNull: true},
    Password: {type: DataTypes.STRING, allowNull: false},

}, {freezeTableName: true, timestamps: false, schema: 'dbo'})

const Inventory_Status = sequelize.define('Inventory_Status', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_ID: {type: DataTypes.INTEGER, allowNull: false},
    QTY_In_Stock: {type: DataTypes.INTEGER, allowNull: false},
    QTY_Min: {type: DataTypes.INTEGER, allowNull: false},
    Location: {type: DataTypes.STRING, allowNull: false},
}, {freezeTableName: true, timestamps: false, schema: 'dbo'})

const Item_Drawing = sequelize.define('Item_Drawing', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_ID: {type: DataTypes.INTEGER, allowNull: false},
    Filename: {type: DataTypes.STRING, allowNull: false},
    Filepath: {type: DataTypes.STRING, allowNull: false},
    General: {type: DataTypes.STRING, allowNull: true}

}, {freezeTableName: true, timestamps: false, schema: 'dbo'})

const Item_Parameters = sequelize.define('Item_Parameters', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_ID: {type: DataTypes.INTEGER, allowNull: false},
    Type: {type: DataTypes.STRING, unique: true, allowNull: true},
    Parameter_Name: {type: DataTypes.STRING, allowNull: true},
    Parameter_Value: {type: DataTypes.STRING, allowNull: true},

}, {freezeTableName: true, timestamps: false, schema: 'dbo'})

const Inventory_Supplier = sequelize.define('Inventory_Supplier', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_ID: {type: DataTypes.INTEGER, allowNull: false},
    Supplier_ID: {type: DataTypes.INTEGER, allowNull: false},
    Supplier_SN: {type: DataTypes.STRING, allowNull: false}
}, {freezeTableName: true, timestamps: false, schema: 'dbo'})


const Supplier = sequelize.define('Supplier', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING,},
    Description: {type: DataTypes.STRING, allowNull: true},
    Phone: {type: DataTypes.STRING, allowNull: true},
    Contact_Name: {type: DataTypes.STRING, allowNull: true},
}, {freezeTableName: true, timestamps: false, schema: 'dbo'})


const Tool = sequelize.define('Tool', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    Description: {type: DataTypes.STRING, allowNull: true},
}, {freezeTableName: true, timestamps: false, schema: 'dbo'})

const Transfer = sequelize.define('Transfer', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_ID: {type: DataTypes.INTEGER, allowNull: false},
    QTY: {type: DataTypes.INTEGER, allowNull: false},
    Date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    User_Id: {type: DataTypes.INTEGER, allowNull: false},
    Tool_Id: {type: DataTypes.INTEGER, allowNull: false},
}, {freezeTableName: true, timestamps: false, schema: 'dbo'})

const Inventory = sequelize.define('Inventory', {

    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    Inventory_BCode: {type: DataTypes.STRING, allowNull: false},
    Name: {type: DataTypes.STRING, allowNull: false},
    Description: {type: DataTypes.STRING, allowNull: true},
    Tool_Id: {type: DataTypes.INTEGER, allowNull: true},

}, {freezeTableName: true, timestamps: false, schema: 'dbo'})


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

Inventory.belongsTo(Tool, {foreignKey: 'Tool_Id'})
Tool.hasMany(Inventory, {foreignKey: 'Tool_Id'})

Inventory_Status.belongsTo(Inventory, {foreignKey: 'Inventory_ID'})
Inventory.hasOne(Inventory_Status, {foreignKey: 'Inventory_ID'})

Inventory_Supplier.belongsTo(Inventory, {foreignKey: 'Inventory_ID'})
Inventory.hasMany(Inventory_Supplier, {foreignKey: 'Inventory_ID'})

Item_Parameters.belongsTo(Inventory, {foreignKey: 'Inventory_ID'})
Inventory.hasMany(Item_Parameters, {foreignKey: 'Inventory_ID'})

Item_Drawing.belongsTo(Inventory, {foreignKey: 'Inventory_ID'})
Inventory.hasMany(Item_Drawing, {foreignKey: 'Inventory_ID'})


module.exports = {
    User, Inventory_Status, Item_Drawing, Item_Parameters, Inventory_Supplier, Supplier, Tool, Transfer, Inventory
}


//FOR POSTGRES
// INSERT INTO dbo."Inventory_Status" VALUES (1,1,12,2,'B1');
// INSERT INTO dbo."Inventory_Status" VALUES (2,2,5,2,'B2');
// INSERT INTO dbo."Inventory_Status" VALUES (3,3,0,0,'A1');
// INSERT INTO dbo."Item_Parameters" VALUES (1,2,'Speed','parameter speed','120');
// INSERT INTO dbo."Tool" VALUES (1,'RC','QC');
// INSERT INTO dbo."Tool" VALUES (2,'Dafl','QC department');
// INSERT INTO dbo."Tool" VALUES (3,'Prober','Debonding');
// INSERT INTO dbo."Tool" VALUES (4,'SVG',' ');
// INSERT INTO dbo."Tool" VALUES (5,'QC PC',' ');
// INSERT INTO dbo."User" VALUES (1,'Operator','LIMITED','053---111-2','enterPass');
// INSERT INTO dbo."User" VALUES (2,'Tester','LIMITED','--0101-1-1','enterPass');
// INSERT INTO dbo."User" VALUES (3,'Administrator','ADMIN','12345678','enterPass');
// INSERT INTO dbo."Inventory" VALUES (1,'BCODE_Sp','Spectrol Regulator 500R','Spectrol Regulator 500R',5);
// INSERT INTO dbo."Inventory" VALUES (2,'BCode_Fan','FAN 220-240V','FAN 220-240V',2);
// INSERT INTO dbo."Inventory" VALUES (3,'BCodeCamera','Camera','Web camera for Desktop',2);
// INSERT INTO dbo."Supplier" VALUES (1,'Suppl 1','desc changed',NULL,NULL);
