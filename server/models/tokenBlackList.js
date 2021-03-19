const mongoose = require('mongoose')

const tokenBlackList = new mongoose.Schema({
    token: String,
    expirationDate: Date
})

module.exports = mongoose.model('TokenBlackList', tokenBlackList)