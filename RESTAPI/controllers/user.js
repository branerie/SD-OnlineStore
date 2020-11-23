const router = require('express').Router()
const { createToken, verifyToken } = require('../utils/jwt')
const { decode } = require('jsonwebtoken')
const User = require('../models/user')
const TokenBlackList = require('../models/tokenBlackList')
const { isMongoError } = require('../utils/utils')

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const tokenForCheck = req.headers.authorization
    try {

        if (tokenForCheck && await verifyToken(tokenForCheck)) {
            return res.status(400).send({ error: 'User is already logged in' })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).send({ error: `User with email ${email} does not exist` })
        }

        const isPasswordValid = await user.matchPassword(password)

        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Invalid password' })
        }

        const token = createToken({ id: user._id, isAdmin: user.isAdmin })
        res.header('Authorization', token)
        res.send({ id: user._id, isAdmin: user.isAdmin })
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send({ error: error.message })
        }

        return res.status(500).send({ error: error.message })
    }
})

router.post('/register', async (req, res) => {
    const { email, firstName, lastName, password } = req.body

    try {
        const createdUser = await User.create({ email, firstName, lastName, password })
        const token = createToken({ id: createdUser._id })
        res.header('Authorization', token)
        res.send({ id: createdUser._id })
    } catch (error) {
        if (isMongoError(error)) {
            if (error.message.includes('E11000')) {
                error.message = `User with email ${email} already exists.`
                return res.status(403).send({
                    error: error.message,
                    uniqueRestriction: 'email'
                })
            }

            return res.status(403).send({ error: error.message })
        }

        return res.status(500).send({ error: error.message })
    }
})

router.post('/logout', async (req, res) => {
    const currentToken = req.headers.authorization || ''

    if (currentToken) {
        try {
            const { exp } = decode(currentToken)
            await TokenBlackList.create({ token: currentToken, expirationDate: exp * 1000 })

            delete req.headers.authorization
            return res.send('Successfully logged out')
        } catch (error) {
            if (isMongoError(error)) {
                return res.status(403).send({ error: error.message })
            }

            return res.status(500).send({ error: error.message })
        }
    } else {
        return res.status(401).send({ error : 'No one is logged in' })
    }
})

router.get('/verify' , async (req, res) => {
    const currentToken = req.headers.authorization

    if (currentToken) {
        try {
            const userInfo = await verifyToken(currentToken)
            return res.send({ userId: userInfo.id, isAdmin: userInfo.isAdmin || false })
        } catch(error) {
            return res.status(403).send({
                userId: null,
                isAdmin: false,
                error: error.message
            })
        }
    }

    return res.send({ userId: null, isAdmin: false })
})

module.exports = router