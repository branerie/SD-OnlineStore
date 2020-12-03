const mongoose = require('mongoose')
mongoose.set('runValidators', true)

module.exports = async function () {
    try {
        const { connection: db } = await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        // db.collections.products.createIndex({
        //     brand: 'text',
        //     description: 'text',
        //     categories: 'text'
        // })

        console.log('Database is setup and running')
    } catch (err) {
        console.error(err)
        throw err
    }
} 