const jwt = require('jsonwebtoken');
const tokenBlackList = require('../models/tokenBlackList');

function createToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1w' });
}

async function verifyToken(token) {
    const isInBlackList = await tokenBlackList.findOne({ token })
    if(isInBlackList){
        throw new Error('Authorization token is blacklisted')
    }

    const userInfo = await jwt.verify(token , process.env.JWT_SECRET)
    return userInfo
}

module.exports = {
    createToken,
    verifyToken
}
