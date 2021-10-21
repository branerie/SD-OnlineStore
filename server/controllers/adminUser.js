const router = require('express').Router()
const { restrictToAdmin } = require('../utils/authenticate')
const { verifyToken } = require('../utils/jwt')
const { isMongoError } = require('../utils/general')
const User = require('../models/user')

const USER_NOT_EXIST_ERROR = 'User with id {userId} does not exist.'

router.use('/', restrictToAdmin)

router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).send(USER_NOT_EXIST_ERROR.replace('{userId}', userId))
        }

        return res.send({
            id: userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin || false,
            isOwner: user.isOwner || false
        })
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send({ error: error.message })
        }

        return res.status(500).send({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const userDeletingInfo = await verifyToken(req.headers.authorization)
        const userToDeleteId = req.params.id
        const userToDelete = await User.findById(userToDeleteId)

        if (!userToDelete) {
            return res.status(400).send({ error: USER_NOT_EXIST_ERROR.replace('{userId}', userToDeleteId) })
        }

        if (userToDeleteId === userDeletingInfo.id) {
            return res.status(403).send({ error: 'Cannot delete your own profile through admin panel. If this was the intended action, please go through the regular account deletion procedure (route "/api/user" with DELETE request method).' })
        }

        if (userToDelete.isAdmin && !userDeletingInfo.isOwner) {
            return res.status(403).send({ error: `User with id ${userToDeleteId} is an Administrator. Only users with Owner status can delete Administrator accounts.` })
        }

        await userToDelete.remove()
        return res.send({ removedId: userToDeleteId, message: 'Success!' })
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send({ error: error.message })
        }

        return res.status(500).send({ error: error.message })
    }
})

module.exports = router