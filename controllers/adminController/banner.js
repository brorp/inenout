
class BannerAdminController {
    static async createBanner(req, res, next){
        try {
            const {bannerText, imgBanner, articleId} = req.body
            const response = await Banner.create({bannerText, imgBanner, articleId})

        } catch (err) {
            
        }
    }
}