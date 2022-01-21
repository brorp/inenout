const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY

const signToken = (data) => {
    return jwt.sign(data, key, {expiresIn: '24h'})
}

const verifyToken = (token) => {
    return jwt.verify(token, key)
}

const signPasswordLink = (data, password) => {
    return jwt.sign(data, (key + password), {expiresIn: '5m'})
}

const verifyLink = (token, password) => {
    return jwt.verify(token, (key + password))
}

const decodeJwt = (token) => {
    return jwt.decode(token)
}

module.exports = {signToken, verifyToken, signPasswordLink, verifyLink, decodeJwt}