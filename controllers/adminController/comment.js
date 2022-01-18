const {Comment, User, Article} = require('../../models')
class CommentController {
    static async getAllComment(req, res, next){
        try {
            const response = await Comment.findAll({include: {model: {User, Article}}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async deleteComment(req, res, next){
        try {
            const {id} = req.params
            const response = await Comment.destroy({where: {id}})
            res.status(200).json({msg: 'Komen berhasil dihapus.'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CommentController