const {User, Article, ArticleSection} = require('../../models')
const {transporter, articlePublish} = require('../../helpers/nodemailer')
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination");
class CMSArticleController {
    static async articleActive(req, res, next){
        try {
            let { page, size } = req.query;
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const { limit, offset } = getPagination(page, size);
            const active = await Article.findAndCountAll({
                where: {status: "Active"},
                include: {model: User, attributes: {exclude: ['password']}},
                order: ["publishedAt", "DESC"],
                limit,
                offset,
            })
            res.status(200).json(
                getPagingData(active, page, limit)
            )
        } catch (err) {
            next(err)
        }
    }

    static async articleInactive(req, res, next){
        try {
            let { page, size } = req.query;
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const { limit, offset } = getPagination(page, size);
            const inactive = await Article.findAndCountAll({
                where: {status: "Inactive"},
                include: {model: User, attributes: {exclude: ['password']}},
                order: ["publishedAt", "DESC"],
                limit,
                offset,
            })
            res.status(200).json(
                getPagingData(inactive, page, limit)
            )
        } catch (err) {
            next(err)
        }
    }

    static async articleQueries(req, res, next){
        try {
            const {search, filter} = req.query;
            if(search || filter){
                let params;
                if (search) {
                  params = {
                    [Op.or]: [
                      { 'title': { [Op.iLike]: '%' + search + '%' } },
                      { 'content': { [Op.iLike]: '%' + search + '%' } }
                    ]
                  }
                }
                if(filter){
                    params = {
                        'status': filter
                    }
                }
                const response = await User.findAll({
                    where: params,
                    include: {model: User, attributes: {exclude: ['password']}},
                    order: ["publishedAt", "DESC"]
                })
                res.status(200).json(response)
            }
            else {
                res.status(200).json(null)
            }
        } catch (err) {
            next(err)
        }
    }
    
    static async articleInfoDetail(req, res, next){
        try {
            const {id} = req.params
            const response = await Article.findByPk(id, {
                include: [
                    {model: ArticleSection},
                    {model: User, attributes: {exclude: ['password']}},
                ]
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async addNewArticle(req, res, next){
        const t = await sequelize.transaction();
        try {
            const {email, fullName, title, caption, img} = req.body
            const newPassword = (Math.random() + 1).toString(36).substring(2)
            const [user, isCreated] = await User.findOrCreate({ 
                where: {email},
                defaults: {
                    email: email,
                    password: newPassword,
                    fullName: fullName,
                }
            })
            const userId = user.id || isCreated.id
            let date = new Date ().toISOString()
            const {publishedAt} = date.slice(0, 10)
            const {status} = "Inactive"
            const newArticle = await Article.create({
                title, 
                caption, 
                img, 
                userId: userId, 
                publishedAt,
                status
            })
            
            const {articleId} = newArticle.id
            const {sectionTitle, sectionText, sectionImg} = req.body
            let payload = []
            req.body.map(el => {
                payload.push(el)
            })
            const newSection = await ArticleSection.bulkCreate({sectionTitle, sectionText, sectionImg, articleId})
            
            await t.commit();
            res.status(201).json({user: user, newArticle: newArticle, newSection: newSection});
        } catch (err) {
            await t.rollback();
            next(err);
        }
    }

    static async articlePreview(req, res, next){
        try {
            const {articleId} = req.params
            const response = await Article.findByPk(articleId, 
                {include: [{model: User},{model: ArticleSection}]
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async publishArticle(req, res, next){
        try {
            const {articleId} = req.params
            const article = await Article.findOne({where: {articleId}, include: {model: User}})
            await Article.update({status: 'Active'},
                {where: {articleId}
            })
            transporter.sendMail(articlePublish(article.User.email), (error) => {
                if(error){
                    throw {
                        name: 'errorsendmail',
                    }; 
                } else {
                    console.log(`email sent to ${article.User.email}`)
                    res.status(201).json('Artikel berhasil diunggah')
                }   
            })
        } catch (err) {
            next(err)
        }
    }

    static async editArticle()
}

module.exports = CMSArticleController