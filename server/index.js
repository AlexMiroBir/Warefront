require('dotenv').config()
const express = require('express')
const sequelize = require('./DB/db')
const models = require('./DB/models/models')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/error-handling-middleware')
const path = require('path')

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api',router)

app.use(errorHandler) // always finish middleware




const start = async () =>{
   try{
       await sequelize.authenticate() // connect to DB
       await sequelize.sync() // сверять состояние бд со схемой бд
       app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
   }  catch(e) {
       console.log(e)
   }
}

start()
