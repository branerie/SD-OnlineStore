const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const configExpress = require('./config/express')

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
} , (err) => {
    if (err) {
        console.error(err)
        throw err
    }
    
    console.log('Database is setup and running')
})


const app = express()
configExpress(app)

app.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}!`))