const {User, Comment, Article} = require('../../models') 
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination");

class CMSUserController {
    static async userActive(req, res, next){
        try {
            let { page, size } = req.query;
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const { limit, offset } = getPagination(page, size);
            const active = await User.findAndCountAll({
                where: {status: "Active"},
                order: [["fullName", "ASC"]],
                attributes: {exclude: ["password"]},
                limit,
                offset,
            })
            res.status(200).json(
                getPagingData(active, page, limit)
            )
        } catch (err) {
            next(err)
        }
    }

    static async userInactive(req, res, next){
        try {
            let { page, size } = req.query;
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const { limit, offset } = getPagination(page, size);
            const inactive = await User.findAndCountAll({
                where: {status: "Inactive"},
                order: [["fullName", "ASC"]],
                attributes: {exclude: ["password"]},
                limit,
                offset,
            })
            res.status(200).json(
                getPagingData(inactive, page, limit)
            )
        } catch (err) {
            next(err)
        }
    }

    static async userQueries(req, res, next){
        try {
            const {search, filter} = req.query;
            if(search || filter){
                let params;
                if (search) {
                  params = {
                    [Op.or]: [
                      { 'fullName': { [Op.iLike]: '%' + search + '%' } },
                      { 'email': { [Op.iLike]: '%' + search + '%' } }
                    ]
                  }
                }
                if(filter){
                    params = {
                        'status': params
                    }
                }
                const response = await User.findAll({
                    where: params,
                    order: [["fullName", "ASC"]],
                    attributes: {exclude: ["password"]}
                })
                res.status(200).json(response)
            }
            else {
                res.status(200).json(null)
            }
        } catch (err) {
            next(err)
        }
    }
    
    static async userInfoDetail(req, res, next){
        try {
            const {id} = req.params
            const response = await User.findByPk(id, {
                attributes: {exclude: ["password"]},
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

module.exports = CMSUserController