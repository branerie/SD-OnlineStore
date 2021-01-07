function isMongoError(error) {
    return error.name === 'ValidationError' || error.name === 'MongoError'
}

module.exports = {
    isMongoError
}