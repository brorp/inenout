const {Comment, CommentLike, User, Article} = require('../../models')
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination");
class CMSCommentController {
    static async getCommentList(req, res, next){
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
            } 

            const response = await Comment.findAndCountAll({
                where: params,
                limit,
                offset
            })
            res.status(200).json(getPagingData(response, page, limit))
        } catch (err) {
            next(err)
        }
    }

    static async getCommentByArticle(req, res, next){
        try {
            const {articleId} = req.params
            const response = await Comment.findAll({
                where: {articleId},
                include: {model: CommentLike}
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getCommentByUser(req, res, next){
        try {
            const {userId} = req.params
            const response = await Comment.findAll({
                where: {userId},
                include: {model: CommentLike}
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async statusComment(req, res, next){
        try {
            const {id} = req.params
            const {status} = req.query
            await Comment.update({status},{where: {id}})
            res.status(200).json({msg: 'Status komen berhasil diubah'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CMSCommentController