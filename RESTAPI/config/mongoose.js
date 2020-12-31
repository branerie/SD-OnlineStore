const mongoose = require('mongoose')
mongoose.set('runValidators', true)

module.exports = async function () {
    try {
        const connectionString = process.env.ENVIRONMENT === process.env.ENVIRONMENT_DEV
                                    ? process.env.DB_CONN_DEV
                                    : process.env.DB_CONN_PROD
        const { connection: db } = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        // const indexes = await db.collections.products.indexes()
        // await db.collections.products.dropIndex('brand_text_description_text_categories_text')

        // await db.collections.products.createIndex({
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