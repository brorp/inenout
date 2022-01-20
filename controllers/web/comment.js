import {Comment, CommentLike} from '../../models'
export class CommentController {
    static async postComment(req, res, next){
        try {
            const {commentText} = req.body
            const userId = req.user.id
            const {articleId} = req.params
            const response = await Comment.create({commentText, userId, articleId})
            res.status(201).json({
                msg: 'Komen berhasil dibuat',
                response
            })
        } catch (err) {
            next(err)
        }
    }

    static async likeComment(req, res, next){
        try {
            const {commentId} = req.params
            const userId = req.user.id
            await CommentLike.create({commentId, userId})
            res.status(201).json({msg: 'Komen berhasil disukai'})
        } catch (err) {
            next(err)
        }
    }
}