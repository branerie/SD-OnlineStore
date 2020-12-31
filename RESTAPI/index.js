const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const routes = require('./config/routes')
const path = require('path')

const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const buildPath = path.join(__dirname, '..', 'build')
app.use(express.static(buildPath))

app.use(cors({
    exposedHeaders: 'Authorization'
}))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/', routes)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

const configMongoose = require('./config/mongoose')
configMongoose()

const port = process.env.PORT || 8080
app.listen(port, console.log(`Listening on port ${port}!`))