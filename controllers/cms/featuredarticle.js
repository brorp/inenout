const {FeaturedArticle} = require('../../models')

class FeaturedArticleController {
    static async getActiveFeaturedArticle(req, res, next){
        try {
            const response = await FeaturedArticle.findAll({where: {status: "Active"}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getInactiveFeaturedArticle(req, res, next){
        try {
            const response = await FeaturedArticle.findAll({where: {status: "Inactive"}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }
    static async createFeaturedArticle(req, res, next){
        try {
            const {title, caption, img, articleId} = req.body
            const response = await FeaturedArticle.create({title, caption, img, articleId})
            res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async activateFeaturedArticle(req, res, next){
        try {
            const {id} = req.params
            await FeaturedArticle.update({status: "Active"},{where: {id}})
            res.status(200).json({msg: 'Banner berhasil di aktivasi'})
        } catch (err) {
            next(err)
        }
    }

    static async setFeaturedArticleHomepage(req, res, next){
        try {
            const {id} = req.params
            await FeaturedArticle.update({isHomepage: true, status: 'Active'},{where: {id}})
            res.status(200).json({msg: 'Banner berhasil di aktivasi'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = FeaturedArticleController