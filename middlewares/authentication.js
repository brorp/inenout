const{verifyToken} = require('../helpers/jwt')
const{User} = require('../models/index')

let authentication = async (req, res, next) => {
    try {
        let {access_token} = req.headers
        let payload = verifyToken(access_token)
        let response = await User.findOne({
            where: {email: payload.email}
        })
        if(!req.headers.access_token || !response){
            throw ('invalidtoken')
        }
        req.user = {
            id: response.id,
            email: response.email,
            username: response.username
        }
        next()
    } 
    catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = authentication