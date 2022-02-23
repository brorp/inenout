const {Banner, Article, Ads} = require('../../models')
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination");

class CMSBannerController {
    static async getBannerList(req, res, next){
        try {
            const {page, size, search} = req.query;
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const { limit, offset } = getPagination(page, size);
            let params;
            if(search){
                params = {
                    'title': {[Op.iLike]: '%' + search + '%'}
                }
            }

            const response = await Banner.findAndCountAll({
                where: params,
                order: [["createdAt", "DESC"]],
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
            const {imgBanner, title, urlBanner, alignment} = req.body
            const response = await Banner.create({title, imgBanner, urlBanner, alignment})
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
            const {imgBanner, title, urlBanner, alignment} = req.body
            const {id} = req.params
            const response = await Banner.update({imgBanner, title, urlBanner, alignment},{where: {id}})
            res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async statusBanner(req, res, next){
        try {
            const {id} = req.params
            const params = {
                "status": req.body.status
            }
            await Banner.update(params,{where: {id}})
            res.status(201).json({msg: 'Status Banner berhasil diubah'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CMSBannerController