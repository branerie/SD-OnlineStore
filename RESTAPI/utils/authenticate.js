const { verifyToken } = require('./jwt')

async function restrictToAdmin(req, res, next) {
    try {
        const token = req.headers.authorization
        const userData = await verifyToken(token)

        if (userData.isAdmin) {
            next()
        }
    } catch {
        return res.status(403).send('You must be logged in as an administrator.')
    }
}

module.exports = {
    restrictToAdmin
}