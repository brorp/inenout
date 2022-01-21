const {verifyLink, decodeJwt} = require('../helpers/jwt')
const {User} = require('../models/index')
const resetPasswordMiddleware = async (req, res, next) => {
    try {
      const { id, token } = req.params
      const { password } = decodeJwt(token);

      const payload = verifyLink(token, password);
      if (!payload){
        throw {name: "invalidtoken"}
      }
      const response = await User.findOne({ where: { id, email: payload.email } })
      if(!response){
        throw {name: "mailnotfound"}
      }
      next()
    } catch (err) {
      next(err)
    }
}

module.exports = resetPasswordMiddleware
