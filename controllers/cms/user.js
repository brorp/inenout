const {User, Comment, Article} = require('../../models') 
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination");

class CMSUserController {
    static async getUserList(req, res, next){
        try {
            let { page, size, search, filter } = req.query;
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const { limit, offset } = getPagination(page, size);
            let params = {
                [Op.not]: [{'status': "Not Registered"}]
            }
            if (search) {
                params = {
                  [Op.or]: [
                    { 'fullName': { [Op.iLike]: '%' + search + '%' } },
                    { 'email': { [Op.iLike]: '%' + search + '%' } }
                  ],
                  [Op.not]: [{'status': "Not Registered"}]
                }
              }
            if(filter){
                params = {
                    'status': filter,
                    [Op.not]: [{'status': "Not Registered"}]
                }
            }
            const response = await User.findAndCountAll({
                where: params,
                order: [["verifiedAt", "DESC"]],
                attributes: {exclude: ["password"]},
                limit,
                offset,
            })
            res.status(200).json(
                getPagingData(response, page, limit)
            )
        } catch (err) {
            next(err)
        }
    }
    
    static async getUserInfoDetail(req, res, next){
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

    static async statusUser(req, res, next){
        try {
            const {id} = req.params
            const {status} = req.body
            await User.update({status},{where: {id}})
            res.status(200).json({msg: 'Status User berhasil diubah'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CMSUserController