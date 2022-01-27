const {Banner, Article} = require('../../models')
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination");

export class CMSBannerController {
    static async getBannerList(req, res, next){
        try {
            const {page, size, search} = req.query;
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const { limit, offset } = getPagination(page, size);
            let params
            if(search){
                params = {
                    where: {'caption': {[Op.iLike]: '%' + search + '%'}}
                }
            } else params = {}

            const response = await Banner.findAndCountAll({
                where: params,
                limit,
                offset
            })
            res.status(200).json(getPagingData(response, page, limit))
        } catch (err) {
            next(err)
        }
    }

    static async createBanner(req, res, next){
        try {
            const {caption, imgBanner, title} = req.body
            const article = await Article.findOne({where: {title: {[Op.iLike]: '%' + title + '%'}}})
            if(!article){
                throw {name: 'articlenotfound'}
            }
            const response = await Banner.create({caption, imgBanner, articleId: article.id})
            res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getBannerById(req, res, next){
        try {
            const {id} = req.params
            const response = await Banner.findByPk(id)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async editBanner(req, res, next){
        try {
            const {imgBanner, title} = req.body
            const {id} = req.params
            const article = await Article.findOne({where: {[Op.iLike]: '%' + title + '%'}})
            const response = await Banner.update({caption: article.title, imgBanner, articleId: article.id},{where: {id}})
            res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async statusBanner(req, res, next){
        try {
            const {id} = req.params
            const {status} = req.query
            await Banner.update({status},{where: {id}})
            res.status(200).json({msg: 'Banner berhasil di aktivasi'})
        } catch (err) {
            next(err)
        }
    }
}
