const {Banner} = require('../../models')
class BannerAdminController {
    static async getActiveBanner(req, res, next){
        try {
            const response = await Banner.findAll({where: {status: "Active"}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getInactiveBanner(req, res, next){
        try {
            const response = await Banner.findAll({where: {status: "Inactive"}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async createBanner(req, res, next){
        try {
            const {caption, imgBanner, articleId} = req.body
            const response = await Banner.create({caption, imgBanner, articleId})
            res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async activateBanner(req, res, next){
        try {
            const {id} = req.params
            await Banner.update({status: "Active"},{where: {id}})
            res.status(200).json({msg: 'Banner berhasil di aktivasi'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = BannerAdminController