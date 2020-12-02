const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const routes = require('./config/routes')

const dotenv = require('dotenv')
dotenv.config()

app.use(cors({
    exposedHeaders: 'Authorization'
}))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/', routes)

const configMongoose = require('./config/mongoose')
configMongoose()


app.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}!`))