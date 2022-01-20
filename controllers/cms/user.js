import {User, Comment, Article} from '../../models'
const { Op } = require("sequelize");
export class CMSUserController {
    static async getActiveUser(req, res, next){
        try {
            const response = await User.findAll({where: {status: "Active"}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getInactiveUser(req, res, next){
        try {
            const response = await Banner.findAll({where: {status: "Inactive"}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async searchUser(req, res, next){
        try {
            const search = req.query.search
            if(search){
                const response = await User.findAll({
                    where: { 
                            [Op.or]: [
                                { 'fullName': { [Op.iLike]: '%' + search + '%' } },
                                { 'email': { [Op.iLike]: '%' + search + '%' } }
                            ],
                        },
                })
                if(response) {
                    res.status(200).json(response)
                } else {
                    throw {msg: 'notfound'}
                }
            } else null
        } catch (err) {
            next(err)
        }
    }
    
    static async userInfo(req, res, next){
        try {
            const response = await User.findAll ({
                include: [
                    {model: Article},
                    {model: Comment}
                ]
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }
}