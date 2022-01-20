const {Comment, User, Article} = require('../../models')
export class CMSCommentController {
    static async getAllComment(req, res, next){
        try {
            const response = await Comment.findAll({include: {model: {User, Article}}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getCommentByArticle(req, res, next){
        try {
            const {articleId} = req.params
            const response = await Comment.findAll({where: {articleId}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async deleteComment(req, res, next){
        try {
            const {id} = req.params
            await Comment.update({'status': 'Inactive'},{where: {id}})
            res.status(200).json({msg: 'Komen berhasil dihapus.'})
        } catch (err) {
            next(err)
        }
    }
}
