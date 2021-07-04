require('dotenv').config()
const express = require('express')
const sequelize = require('./DB/db')
const PORT = process.env.PORT || 3001
const cors = require('cors')
const morganMiddleWare = require('./middleware/morgan-middleware')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/error-handling-middleware')
const path = require('path')


const app = express()

const corsOptions = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}
app.use(cors(corsOptions))

//
// if (process.env.NODE_ENV === 'development') {
//     app.use(morganMiddleWare)
// }
app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))
// app.use(express.static(path.resolve(__dirname, 'static')))
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
