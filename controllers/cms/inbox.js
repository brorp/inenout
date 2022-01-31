const {User, SubmittedArticle} = require('../../models')
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination");
class CMSInboxController {
    static async getIncomingArticleList(req, res, next){
        try {
            const {page, size, search, filter} = req.query;
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const { limit, offset } = getPagination(page, size);
            let params
            if(search){
                params = {
                    'commentText': {[Op.iLike]: '%' + search + '%'}
                }
            } if(filter){
                params = {
                    'status': filter
                }
            } else params = {}

            const response = await SubmittedArticle.findAndCountAll({
                where: params,
                limit,
                offset
            })
            res.status(200).json(getPagingData(response, page, limit))
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
        const {page, size, search} = req.query;
        if (+page < 1) page = 1;
        if (+size < 1) size = 5;
        const { limit, offset } = getPagination(page, size);
        let params = { isSubscribed: true }
        if(search){
            params = {
                'email': {[Op.iLike]: '%' + search + '%'}
            }, { isSubscribed: true }
        }
        const response = await User.findAndCountAll({
            where: params,
            limit,
            offset
        })
        res.status(200).json(getPagingData(response, page, limit))
    } catch (err) {
        next(err)
    }
}

module.exports = CMSInboxController