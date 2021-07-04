const {Sequelize} = require('sequelize')


// module.exports = new Sequelize(
// process.env.DB_NAME,// BD name
// process.env.DB_USER,// BD user
// process.env.DB_PASSWORD,// BD user password
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port:process.env.DB_PORT
//     }
// )

module.exports = new Sequelize(
process.env.DB_NAME,// BD name
process.env.DB_USER,// BD user
process.env.DB_PASSWORD,// BD user password
    {
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port:process.env.DB_PORT
    }
)