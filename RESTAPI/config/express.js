const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const routes = require('./routes')

module.exports = (app) => {
    app.use(cors({
      exposedHeaders: 'Authorization'
    }))

    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))
    
    app.use(cookieParser(process.env.COOKIE_SECRET))

    app.use('/', routes)
}
