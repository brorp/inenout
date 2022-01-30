const {Ads} = require('../../models')
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination");
class CMSAdsController {
    static async getAdsList(req, res, next){
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

            const response = await Ads.findAndCountAll({
                where: params,
                limit,
                offset
            })
            res.status(200).json(getPagingData(response, page, limit))
        } catch (err) {
            next(err)
        }
    }

    static async createAds(req, res, next){
        try {
            const {title, url, imgAds} = req.body
            const response = await Banner.create({title, url, imgAds})
            res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getAdsById(req, res, next){
        try {
            const {id} = req.params
            const response = await Ads.findByPk(id)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async editAds(req, res, next){
        try {
            const {title, url, imgAds} = req.body
            const {id} = req.params
            const response = await Ads.update({title, url, imgAds},{where: {id}})
            res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async statusAds(req, res, next){
        try {
            const {id} = req.params
            const {status} = req.query
            await Ads.update({status},{where: {id}})
            res.status(200).json({msg: 'Ads berhasil di aktivasi'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CMSAdsController