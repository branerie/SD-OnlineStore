const { verifyToken } = require('./jwt')

const ADMIN_RESTRICT_ERROR = { error: 'You must be logged in as an administrator.' }
const INVALID_TOKEN_ERROR = { error: 'Your authorization token is invalid.' }

async function restrictToAdmin(req, res, next) {
    const userData = req.user 

    if (userData && userData.isAdmin) {
        return next()
    }

    res.status(403).send(ADMIN_RESTRICT_ERROR)
}

async function attachCurrentUser(req, res, next) {
    try {
        const token = req.headers.authorization
        if (!token) {
            return next()
        }

        const userData = await verifyToken(token)

        req.user = userData
        return next()
    } catch (error) {
        return res.status(403).send(INVALID_TOKEN_ERROR)
    }
}

module.exports = {
    restrictToAdmin,
    attachCurrentUser
}