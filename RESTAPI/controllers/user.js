const router = require('express').Router()
const {
    createToken,
    verifyToken,
    verifyGoogleToken,
    verifyFacebookToken
} = require('../utils/jwt')
const { decode } = require('jsonwebtoken')
const User = require('../models/user')
const TokenBlackList = require('../models/tokenBlackList')
const { isMongoError, isValidObjectId } = require('../utils/general')
const { sendConfirmationEmail, sendPasswordResetEmail } = require('../utils/user')

const AUTHORIZATION_HEADER_NAME = 'Authorization'
const INVALID_TOKEN_ERROR = 'Invalid JWT token'
const INVALID_ID_ERROR = 'Invalid user Id'

const attachLoginCookie = (user, response) => {
    const token = createToken({ userId: user._id, isAdmin: user.isAdmin || false })
    response.header(AUTHORIZATION_HEADER_NAME, token)
}

const getUserData = (user) => {
    return user
        ? {
            userId: user._id,
            isAdmin: user.isAdmin || false,
            favorites: user.favorites || [],
            cart: user.cart || []
        }
        : {
            userId: null,
            isAdmin: false,
            favorites: [],
            cart: []
        }
}

router.get('/verify', async (req, res) => {
    const currentToken = req.headers.authorization

    if (currentToken) {
        try {
            const userInfo = await verifyToken(currentToken)
            if (!userInfo) {
                return res.status(401).send({ error: INVALID_TOKEN_ERROR })
            }

            const user = await User.findById(userInfo.userId)

            return res.send(getUserData(user))
        } catch (error) {
            return res.status(403).send(getUserData())
        }
    }

    return res.send(getUserData())
})

router.patch('/favorites', async (req, res) => {
    const currentToken = req.headers.authorization
    const productId = req.body.productId

    if (currentToken) {
        try {
            const userInfo = await verifyToken(currentToken)
            if (!userInfo) {
                return res.status(401).send({ error: INVALID_TOKEN_ERROR })
            }

            let user = await User.findById(userInfo.userId)

            if (user.favorites.includes(productId)) {
                await user.updateOne({ $pull: { favorites: productId } })

            } else {
                await user.updateOne({ $push: { favorites: productId } })
            }

            user = await User.findById(userInfo.userId)
            return res.send({ favorites: user.favorites, userId: user._id })

        } catch (error) {
            if (isMongoError(error)) {
                return res.status(403).send({ error: error.message })
            }

            return res.status(500).send({ error: error.message })
        }
    } else {
        //TODO implement without login
    }
})

router.patch('/:userId/cart', async (req, res) => {
    try {
        const { userId } = req.params        
        if (!isValidObjectId(userId)) {
            return res.status(400).send({
                status: 400,
                error: INVALID_ID_ERROR 
            })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).send({
                status: 400,
                error: INVALID_ID_ERROR 
            })
        }

        const { productId, sizeName, quantity } = req.body

        const parsedQuantity = parseInt(quantity)
        if (isNaN(parsedQuantity)) {
            return res.status(400).send({ error: 'Invalid quantity parameter' })
        }

        const itemInCart = user.cart.find(i =>
            i.productId.toString() === productId && i.sizeName === sizeName)

        if (itemInCart) {
            if (parsedQuantity === 0) {
                user.cart.pull(itemInCart)
            } else {
                itemInCart.quantity = parsedQuantity
            }
        } else if (quantity > 0) {
            user.cart.push({ productId, sizeName, quantity })
        }

        await user.save()
        return res.send({ status: 'Success' })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const tokenForCheck = req.headers.authorization
    try {

        if (tokenForCheck && await verifyToken(tokenForCheck)) {
            return res.status(400).send({ error: 'User is already logged in' })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).send({ error: 'Invalid email or password' })
        }

        const isPasswordValid = await user.matchPassword(password)

        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Invalid email or password' })
        }

        const userInfo = getUserData(user)

        attachLoginCookie(user, res)
        res.send(userInfo)
    } catch (error) {
        if (isMongoError(error)) {
            return res.status(403).send({ error: error.message })
        }

        return res.status(500).send({ error: error.message })
    }
})

router.post('/login/google', async (req, res) => {
    try {
        const { token } = req.body

        const userInfo = await verifyGoogleToken(token)
        if (!userInfo) {
            return res.status(401).send({ error: 'Missing or invalid Google authorization token' })
        }

        const { email, firstName, lastName } = userInfo

        let user = await User.findOne({ email })
        if (!user) {
            const userToCreate = { email }
            if (firstName && lastName) {
                userToCreate.firstName = firstName
                userToCreate.lastName = lastName
            }

            user = await User.create(userToCreate)
        }

        const userData = getUserData(user)

        attachLoginCookie(user, res)
        res.send(userData)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

router.post('/login/facebook', async (req, res) => {
    try {
        const { signedRequest, userId, email, name } = req.body
        const isVerified = await verifyFacebookToken(signedRequest, userId)
        if (!isVerified) {
            return res.status(401).send({ error: 'Facebook token could not be verified' })
        }

        let user = await User.findOne({ email })
        if (!user) {
            let [firstName, ...lastName] = name.split(' ')
            lastName = lastName.length > 0 ? lastName.join(' ') : ''

            user = await User.create({ email, firstName, lastName })
        }

        const userData = getUserData(user)

        attachLoginCookie(user, res)
        res.send(userData)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

router.post('/register', async (req, res) => {
    const { email, firstName, lastName, password } = req.body

    try {
        const createdUser = await User.create({ email, firstName, lastName, password })
        const userData = { userId: createdUser._id }

        const confirmationToken = createToken(userData)
        createdUser.confirmationToken = confirmationToken
        await createdUser.save()

        sendConfirmationEmail(firstName, lastName, email, confirmationToken)

        attachLoginCookie(createdUser, res)
        res.send(userData)
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
    try {
        const currentToken = req.headers.authorization || ''
        
        if (!currentToken) {
            return res.status(401).send({ error: 'Not logged in' })
        }

        const { exp } = decode(currentToken)
        await TokenBlackList.create({ token: currentToken, expirationDate: exp * 1000 })

        delete req.headers.authorization
        return res.send({ status: 'Successfully logged out' })
    } catch (error) {
        delete req.headers.authorization

        if (isMongoError(error)) {
            return res.status(403).send({ error: error.message })
        }

        return res.status(500).send({ error: error.message })
    }
})

router.post('/confirm', async (req, res) => {
    const INVALID_TOKEN_ERROR = 'Invalid user confirmation token'

    try {
        const { confirmationToken } = req.body
        if (!confirmationToken) {
            return res.status(400).send({ error: 'Missing user confirmation token' })
        }

        const userInfo = await verifyToken(confirmationToken)
        if (!userInfo) {
            return res.status(401).send({ error: INVALID_TOKEN_ERROR })
        }

        const { userId } = userInfo
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).send({ error: INVALID_TOKEN_ERROR })
        }

        if (!user.confirmationToken) {
            return res.send({ status: 'User has already confirmed his/her email', userId })
        }

        if (user.confirmationToken !== confirmationToken) {
            return res.status(403).send({ error: INVALID_TOKEN_ERROR })
        }

        user.set('confirmationToken', undefined, { strict: false })
        await user.save()

        if (!req.user || req.user.userId !== userid) {
            attachLoginCookie(user, res)
        }

        return res.send({
            status: 'User email has been successfully confirmed',
            userId,
            favorites: user.favorites
        })
    } catch (error) {
        return res.status(401).send({ error: INVALID_TOKEN_ERROR })
    }
})

router.post('/password/reset/send', async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).send({ error: `User with email ${email} does not exist` })
        }

        const resetToken = createToken({ userId: user._id }, '1h')
        sendPasswordResetEmail(user.firstName, user.lastName, email, resetToken)

        return res.send({ status: 'Success', email })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

router.post('/password/reset/confirm', async (req, res) => {
    const INVALID_TOKEN_ERROR = 'Invalid reset password token'

    try {
        const { resetToken, newPassword } = req.body

        const userInfo = await verifyToken(resetToken)
        if (!userInfo) {
            return res.status(401).send({ error: INVALID_TOKEN_ERROR })
        }

        const { userId } = userInfo
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).send({ error: INVALID_TOKEN_ERROR })
        }

        user.set('password', newPassword)
        await user.save()

        attachLoginCookie(user, res)
        
        const userData = { id: user._id, favorites: user.favorites, isAdmin: user.isAdmin }
        return res.send(userData)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

module.exports = router