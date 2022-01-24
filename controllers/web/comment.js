
const {Comment, CommentLike} = require('../../models/index') 
class CommentController {
    static async postComment(req, res, next){
        try {
            const {commentText} = req.body
            const userId = req.user.id
            const {articleId} = req.params
            const response = await Comment.create({commentText, userId, articleId})
            res.status(201).json({
                message: 'Komen berhasil dibuat',
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
            const [like, isCreated] = await CommentLike.findOrCreate({ 
                where: {
                    commentId,
                    userId: userId
                },
            })
            if(!isCreated){
                throw {name: `hasbeenliked`}
            }
            else{
                res.status(201).json({message: 'Komen berhasil disukai'})
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CommentController