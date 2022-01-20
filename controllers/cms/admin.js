const {Admin} = require('../../models')

export class CMSAdminController {
    static async getActiveAdmin(req, res, next){
        try {
            const response = await Admin.findAll({where: {status: "Active"}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getInactiveAdmin(req, res, next){
        try {
            const response = await Admin.findAll({where: {status: "Inactive"}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async createAdmin(req, res, next){
        try {
            const {username, email, password, fullName} = req.body
            const {role} = 'Admin'
            if(req.body.password !== req.body.password2){
                throw {name: 'passwordnotmatch'}
            }
            const response = await Admin.create({username, email, password, fullName, role})
            res.status(201).json({msg: `Admin ${response.email} berhasil didaftarkan`})
        } catch (err) {
            next(err)
        }
    }
}
