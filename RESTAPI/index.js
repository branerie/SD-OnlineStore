const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const routes = require('./config/routes')
const path = require('path')

const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const configMongoose = require('./config/mongoose')
configMongoose()

app.use(cors({
    exposedHeaders: 'Authorization'
}))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/', routes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'build')))

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'build', 'index.html'), (err) => {
            if (err) {
                return res.status(500).send(err)
            }
        })
    })
}

const port = process.env.PORT || 3001
app.listen(port, console.log(`Listening on port ${port}!`))