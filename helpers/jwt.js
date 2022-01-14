const jwt = require('jsonwebtoken')
const key = proccess.env.JWT_KEY

const signToken = (data) => {
    return jwt.sign(data, key, {expiresIn: '24h'})
}

const verifyToken = (token) => {
    return jwt.verify(token, key)
}

const verifyLink = (token, password) => {
    return jwt.verify(token, (privateKey + password))
}

const decodeJwt = (token) => {
    return jwt.decode(token)
}

module.exports = {signToken, verifyToken, verifyLink, decodeJwt}