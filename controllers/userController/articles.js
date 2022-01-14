const {Article, User, Comment, Category, SubCategory, Banner, CommentLike} = require('../../models')

class ArticleController {
    static async getBanner(req, res, next){
        try {
            const response = await Banner.findAll({
                limit: 3
            })
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async getArticle(req, res, next){
        try {
            const params = req.query.tag
            const response = await Article.findAll({
                include: [
                    {model: User},{model: SubCategory}
                ],
                where: [{'tag': params},{'status': 'Active'}],
                order: [
                    ['publishedAt', 'DESC']
                ]
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getArticleDetail(req, res, next){
        try {
            const {articleId} = req.params
            const response = await Article.findByPk(articleId,{
                include: [
                    {model: User},{model: Comment},{model: CommentLike}
                ]
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    // static async getComment(req, res, next){
    //     try {
    //         const {articleId} = req.params
    //         const comments = await Comment.findAll({
    //             where: [{articleId}],
    //             include: [{model: CommentLike, as: 'Likes'}],
    //         })
    //         // const [commentLikes] = await CommentLike.findAll({
    //         //     where: {commentId: comments.id}
    //         // })
    //         res.status(200).json({
    //             comments
    //         })
    //     } catch (err) {
    //         next(err)
    //     }
    // }

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
            res.status(201).json({msg: 'Komen berhasil di like'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ArticleController