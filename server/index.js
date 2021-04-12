require('dotenv').config()
const express = require('express')
const sequelize = require('./DB/db')
const models = require('./DB/models/models')
const PORT = process.env.SERVER_PORT
const cors = require('cors')
const morgan = require('morgan')
const morganMiddleWare = require('./middleware/morgan-middleware')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/error-handling-middleware')
const path = require('path')
const chalk = require('chalk')

const app = express()

const corsOptions = {
    origin: 'http://127.0.0.1:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}
app.use(cors(corsOptions))
//app.use(cors())



app.use(morgan(function (tokens, req, res) { //TODO перенести в middleware
    return [
        '\n',
        chalk.bgGrey.hex('#ff4757').bold('Morgan --> '),
        '\n',
        chalk.yellow.bold('METHOD: '+tokens.method(req, res)),
        '\n',
        chalk.yellow.bold('STATUS: '+tokens.status(req, res)),
        '\n',
        chalk.yellow.bold('URL: '+tokens.url(req, res)),
        '\n',
        chalk.yellow.bold('RESPONSE TIME: '+tokens['response-time'](req, res) + ' ms'),
        '\n',
        chalk.yellow.bold('TIME STAMP: ' + tokens.date(req, res)),
        '\n',
        chalk.yellow.bold('REMOTE ADDRESS: '+tokens['remote-addr'](req, res)),
        '\n',
        chalk.yellow.bold('FROM: ' + tokens.referrer(req, res)),
        '\n',
        chalk.yellow.bold('USER AGENT: '+tokens['user-agent'](req, res)),
        '\n',
        chalk.bgGrey.hex('#ff4757').bold('<-- Morgan '),
        '\n',
    ].join(' ');
}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler) // always finish middleware


const start = async () => {
    try {
        await sequelize.authenticate() // connect to DB
        await sequelize.sync() // сверять состояние бд со схемой бд
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
