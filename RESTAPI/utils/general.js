const ObjectID = require('mongodb').ObjectID

const isMongoError = (error) => {
    return error.name === 'ValidationError' || error.name === 'MongoError'
}

const isValidObjectId = (objectId) => ObjectID.isValid(objectId)

module.exports = {
    isMongoError,
    isValidObjectId
}