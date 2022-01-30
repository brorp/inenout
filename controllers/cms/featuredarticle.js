const {FeaturedArticle, Article} = require('../../models')
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination");
export class CMSFeaturedArticleController {
    static async getFeaturedList(req, res, next){
        try {
            const {page, size, search} = req.query;
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const { limit, offset } = getPagination(page, size);
            let params
            if(search){
                params = {
                    where: {'title': {[Op.iLike]: '%' + search + '%'}}
                }
            } else params = {}

            const response = await FeaturedArticle.findAndCountAll({
                where: params,
                limit,
                offset
            })
            res.status(200).json(getPagingData(response, page, limit))
        } catch (err) {
            next(err)
        }
    }

    static async createFeatured(req, res, next){
        try {
            const {title, caption, img} = req.body
            const article = await Article.findOne({where: {title: {[Op.iLike]: '%' + title + '%'}}})
            if(!article){
                throw {name: 'articlenotfound'}
            }
            const response = await FeaturedArticle.create({title: article.title, caption, img, articleId: article.id})
            res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getFeaturedById(req, res, next){
        try {
            const {id} = req.params
            const response = await FeaturedArticle.findByPk(id)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async editFeatured(req, res, next){
        try {
            const {title, caption, img} = req.body
            const {id} = req.params
            const article = await Article.findOne({where: {[Op.iLike]: '%' + title + '%'}})
            if(!article){
                throw {name: 'articlenotfound'}
            }
            const response = await FeaturedArticle.update({title: article.title, caption, img, articleId: article.id},{where: {id}})
            res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async statusFeatured(req, res, next){
        try {
            const {id} = req.params
            const {status} = req.query
            await FeaturedArticle.update({status},{where: {id}})
            res.status(200).json({msg: 'Featured Article berhasil di aktivasi'})
        } catch (err) {
            next(err)
        }
    }

    static async setFeaturedHomepage(req, res, next){
        try {
            const {id} = req.params
            await FeaturedArticle.update({isHomepage: true, status: 'Active'},{where: {id}})
            res.status(200).json({msg: 'Featured Article berhasil di aktivasi'})
        } catch (err) {
            next(err)
        }
    }
}
