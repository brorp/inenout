const {Admin} = require('../../models')

class CMSAuthController{
    static async loginAdmin (req, res, next) {
        try {
            const {email, password} = req.body
            let response = await Admin.findOne({
                where: [{email},{status: 'Active'}]
            })
            if(response && comparePassword(password, response.password)){
                const access_token = signToken({
                    id: response.id,
                    email: response.email
                })
                res.status(200).json({
                    access_token: access_token
                })
            }
            else{
                throw('invalidlogin')
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CMSAuthController