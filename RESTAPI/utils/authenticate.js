const { verifyToken } = require('./jwt')

const ADMIN_RESTRICT_ERROR = { error: 'You must be logged in as an administrator.' }

async function restrictToAdmin(req, res, next) {
    try {
        const token = req.headers.authorization
        const userData = await verifyToken(token)

        if (userData.isAdmin) {
            next()
        } else {
            res.status(403).send(ADMIN_RESTRICT_ERROR)
        }
    } catch {
        return res.status(403).send(ADMIN_RESTRICT_ERROR)
    }
}

module.exports = {
    restrictToAdmin
}