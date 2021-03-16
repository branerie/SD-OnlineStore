const mongoose = require('mongoose')

const archivedProductSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    description : { type: String, required: true }
})

module.exports = mongoose.model('ArchivedProduct', archivedProductSchema)