const {User, SubmittedArticle} = require('../../models')
const { Op } = require("sequelize");
class InboxController {
    static async getIncomingArticle(req, res, next){
        try {
            let params
            if(req.query.title){
                params = {'title': { [Op.iLike]: '%' + req.query.title + '%' }}
            }
            if(req.query.status){
                params = {'status': req.query.status}
            } else {
                params = {}
            }
            const response = await SubmittedArticle.findAll({
                where: params,
                include: {model: User},
                order: ['createdAt','DESC']
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async incomingArticleDetail(req, res, next){
        try {
            const {id} = req.params
            const response = await SubmittedArticle.findByPk(id,{
                include: {model: User}
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async updateStatusIncomingArticle(req, res, next){
        try {
            const {id} = req.params
            const params = req.body
            await SubmittedArticle.update({status: params},{
                where: {id}
            })
            res.status(200).json({msg: 'Status artikel berhasil diubah'})
        } catch (err) {
            next(err)
        }
    }

    static async getSubscribedUser(req, res, next){
        try {
            const response = await User.findAll({
                where: {isSubscribed: true}
            },{
                order: ["updatedAt","DESC"]
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = InboxController