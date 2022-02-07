const {Article, User, Comment, Banner, CommentLike, FeaturedArticle, SubmittedArticle, Ads, ArticleSection} = require('../../models/index')
const { Op } = require("sequelize");
const {getRedis} = require ('../../config/redis');
class ArticleController {
    static async getBanner(req, res, next){
        try {
            let chace = await getRedis().get("banner");
            if (chace && !req.query) {
                res.status(200).json(JSON.parse(chace));
            } else {
                const response = await Banner.findAll({ where: {status: 'Active'}},{limit: 3})
                await getRedis().set("banner", JSON.stringify(response));
                res.status(200).json(response)
            }

        } catch (error) {
            next(error)
        }
    }

    static async getHomepageFeaturedArticle(req, res, next){
        try {
            let chace = await getRedis().get("featuredarticles");
            if (chace && !req.query) {
                res.status(200).json(JSON.parse(chace));
            } else {
                const tag = req.query.tag
                let params
                if(tag){
                    params = {
                        where: {status: 'Active', isHomepage: null},
                        include: [
                            {model: Article, attributes: ['id', 'tag'], where: {tag: tag}, 
                            include: {model: User, attributes: ['fullName', 'profilePic']}},
                        ]
                    }
                } else {
                    params = {
                        where: {status: 'Active', isHomepage: true},
                        include: [{model: Article, attributes: ['id', 'tag'],
                        include: {model: User, attributes: ['fullName', 'profilePic']}}]
                    }
                }
    
                const response = await FeaturedArticle.findAll(params)
                await getRedis().set("featuredarticles", JSON.stringify(response));
                res.status(200).json(response)
            }
        } catch (error) {
            next(error)
        }
    }

    static async getArticleHome(req, res, next){
        try {
            let chace = await getRedis().get("articles");
            if (chace && !req.query) {
                res.status(200).json(JSON.parse(chace));
            } else {
            const tag = req.query.tag
            const search = req.query.search
            let params
            if(search){
                params = {
                    'title': { [Op.iLike]: '%' + search + '%' }, 
                    'status': 'Active'
                }
            }
            if(tag){
                params = [{'tag': tag},{'status': 'Active'}]
            }
            const response = await Article.findAll({
                include: [
                    {model: User,
                    attributes:['fullName', 'profilePic']}
                ],
                where: params,
                order: [
                    ['publishedAt', 'DESC']
                ],
            })
            await getRedis().set("articles", JSON.stringify(response));
            res.status(200).json(response)
            }
        } catch (err) {
            next(err)
        }
    }

    static async getArticleDetail(req, res, next){
        try {
            const {articleId} = req.params
            const articles = await Article.findByPk(articleId,{
                include: [
                    {model: User,
                    attributes:['fullName', 'profilePic']},
                    {model: ArticleSection}
                ]
            })
            const comments = await Comment.findAll({
                where: {articleId},
                include: [
                    {model: CommentLike, attributes:['userId']},
                    {model: User, attributes:['fullName', 'profilePic']}
                ]
            })
            res.status(200).json({
                articles: articles,
                comments: comments,
            })
        } catch (err) {
            next(err)
        }
    }

    static async getMoreLikeThis(req, res, next){
        try {
            const response = await Article.findAll({ 
            where: {
                id: {
                  [Op.not]: req.params.articleId
                }
              }, 
            order: [['publishedAt', 'DESC']],
            limit: 3,
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async submitArticle(req, res, next){
        try {
            const {title, attachment, img} = req.body
            console.log(req.body)
            const userId = req.user.id
            const response = await SubmittedArticle.create({title, attachment, img, userId})
            res.status(201).json({message: 'Artikel berhasil diunggah dan akan di review oleh kami, mohon cek email untuk status artikel', response})
        } catch (err) {
            next(err)
        }
    }

    static async getAdsHome(req, res, next){
        try {
            const response = await Ads.findAll({where: {status: 'Active'}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ArticleController