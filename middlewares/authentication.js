const{verifyToken} = require('../helpers/jwt')
const{User, Admin} = require('../models/index')

let authenticationUser = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        const payload = verifyToken(access_token)
        const response = await User.findOne({
            where: {email: payload.email}
        })
        if(!req.headers.access_token || !response){
            throw ('invalidtoken')
        }
        req.user = {
            id: response.id,
            email: response.email,
            fullName: response.fullName
        }
        next()
    } 
    catch (err) {
        console.log(err)
        next(err)
    }
}

let authenticationAdmin = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        const payload = verifyToken(access_token)
        const response = await Admin.findOne({
            where: {email: payload.email}
        })
        if(!req.headers.access_token || !response){
            throw ('invalidtoken')
        }
        req.user = {
            id: response.id,
            email: response.email,
            role: response.role
        }
        next()
    } 
    catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = {authenticationUser, authenticationAdmin}