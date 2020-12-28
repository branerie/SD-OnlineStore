const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const tokenBlackList = require('../models/tokenBlackList')
const { OAuth2Client } = require('google-auth-library')

const BLACKLISTED_TOKEN_ERROR = 'Authorization token is blacklisted'
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const createToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1w' });
}

const prepareBase64UrlInput = (input) => {
    // Replace non-url compatible chars with base64 standard chars
    input = input
            .replace(/-/g, '+')
            .replace(/_/g, '/')

    // Pad out with standard base64 required padding characters
    const pad = input.length % 4
    if (pad) {
        if (pad === 1) {
            throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding')
        }

        input += new Array(5 - pad).join('=')
    }

    return input
} 

const verifyToken = async (token) => {
    const isInBlackList = await tokenBlackList.findOne({ token })
    if (isInBlackList) {
        throw new Error(BLACKLISTED_TOKEN_ERROR)
    }

    const userInfo = await jwt.verify(token, process.env.JWT_SECRET)
    return userInfo
}

const verifyGoogleToken = async (tokenId) => {
    const isInBlackList = await tokenBlackList.findOne({ token: tokenId })
    if (isInBlackList) {
        throw new Error(BLACKLISTED_TOKEN_ERROR)
    }

    try {
        const { payload: { email_verified, email, given_name, family_name } } = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        if (!email_verified) {
            return null
        }

        return { email, firstName: given_name, lastName: family_name }
    } catch (error) {
        return null
    }
}

const verifyFacebookToken = async (token, userId) => {
    const [ encodedSig, payload ] = token.split('.')

    // decode the data
    const sig = prepareBase64UrlInput(encodedSig)
    const userData = JSON.parse((Buffer.from(payload, 'base64')).toString())

    // confirm the signature
    const expectedSig = crypto.createHmac('sha256', process.env.FACEBOOK_APP_SECRET)
                              .update(payload)
                              .digest('base64')

    if (sig !== expectedSig) {
        return false
    }

    return userData.user_id === userId
}

module.exports = {
    createToken,
    verifyToken,
    verifyGoogleToken,
    verifyFacebookToken
}
