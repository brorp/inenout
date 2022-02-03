const {User, Article, ArticleSection, SubCategory} = require('../../models')
const {transporter, articlePublish} = require('../../helpers/nodemailer')
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination");
class CMSArticleController {
    static async getArticleList(req, res, next){
        try {
            let { page, size, search, filter } = req.query;
            const { limit, offset } = getPagination(page, size);
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            let params;
            if (search) {
                params = {
                [Op.and]: [
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
    
            const response = await Article.findAndCountAll({
                where: params,
                include: {model: User, attributes: ['fullName', 'email']},
                order: [["publishedAt", "DESC"]],
                limit,
                offset,
            })
            res.status(200).json(
                getPagingData(response, page, limit)
            )
        } catch(err){
            next(err)
        }
    }
    
    static async getArticleInfoDetail(req, res, next){
        try {
            const {id} = req.params
            const response = await Article.findByPk(id, {
                include: [
                    {model: ArticleSection},
                    {model: User, attributes:['fullName', 'profilePic']}
                ]
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getArticleByUser(req, res, next){
        try {
            let { page, size } = req.query;
            const { limit, offset } = getPagination(page, size);
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const {userId} = req.params
            const response = await Article.findAndCountAll({
                where: {userId},
                include: {model: SubCategory},
                offset,
                limit
            })
            res.status(200).json(response, page, limit)
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
            }, { transaction: t })
            let userId = user.id ? user.id : isCreated.id
            let emailUser = user.email ? user.email : isCreated.email
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
            }, { transaction: t })
            
            const {articleId} = newArticle.id
            const {sectionTitle, sectionText, sectionImg} = req.body
            let payload = []
            req.body.map(el => {
                payload.push(el)
            })
            const newSection = await ArticleSection.bulkCreate({
                sectionTitle, 
                sectionText, 
                sectionImg, 
                articleId
            }, { transaction: t })
            const {url} = req.body
            const previewLink = `https:/${url}/articles/${newArticle.id}`
            const subscribeLink = `https:/${url}`
            t.afterCommit(async () => {
            transporter.sendMail(articlePublish(userEmail, previewLink, subscribeLink), (error) => {
                if(error){
                    throw {
                        name: 'errorsendmail',
                    }; 
                } else {
                        console.log(`email sent to ${userEmail}`)
                        res.status(201).json({user: user, newArticle: newArticle, newSection: newSection});
                    }   
                })
            })
            await t.commit();
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

    static async editArticle(req, res, next){
        try {
            
        } catch (err) {
            
        }
    }

    static async statusArticle(req, res, next){
        try {
            const {id} = req.params
            const {status} = req.body
            await Article.update({status},{where: {id}})
            res.status(200).json({msg: 'Status Artikel berhasil diubah'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CMSArticleController