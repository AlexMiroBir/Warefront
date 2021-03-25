//const fs = require("fs");

const NODE_ENV = process.env.NODE_ENV==='development'?'development':'production';


const structure_API_URL_ = {
    API_URL :{
        production: 'http://192.168.1.101',
        development: JSON.stringify('http://127.0.0.1:3000')
    },
    API_URL_SERVER :{
        production: '/server',
        development: 'http://127.0.0.1:3001'
    },
    API_URL_SQLSERVER :{
        production: '/sqlserver',
        development: 'http://127.0.0.1:3005'
    }
};

const config =  {
    NODE_ENV:           NODE_ENV,
    API_URL :           structure_API_URL_.API_URL[NODE_ENV],
    API_URL_SERVER :    structure_API_URL_.API_URL_SERVER[NODE_ENV],
    API_URL_SQLSERVER : structure_API_URL_.API_URL_SQLSERVER[NODE_ENV],
    sqlConfig: {
        server: 'techbaseserver.database.windows.net',
        authentication:{
            type: 'default',
            options: {
                userName: 'sgoldwirt',
                password: 'FillWell27_'
            }
        },
        options: {
            database: 'warehouse',
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true,
            encrypt: true
        }
    },

    // privateKey: fs.readFileSync('/Certs/radak10.ddns.net/privkey1.pem'),
    // certificate: fs.readFileSync('/Certs/radak10.ddns.net/fullchain1.pem'),
    destination: 'E:\\JAVASCRIPT\\warefront\\images',

};

module.exports = config;