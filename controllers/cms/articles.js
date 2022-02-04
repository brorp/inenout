const {sequelize, User, Article, ArticleSection, SubCategory} = require('../../models')
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
            const {email, fullName, title, caption, tag, imgThumbnail, img, sectionTitle, sectionText, sectionImg} = req.body
            const newPassword = (Math.random() + 1).toString(36).substring(2)
            const [user, isCreated] = await User.findOrCreate({ 
                where: {email},
                defaults: {
                    email: email,
                    password: newPassword,
                    fullName: fullName,
                },
                transaction: t
            })
            let userId = user.id ? user.id : isCreated.id
            let emailUser = user.email ? user.email : isCreated.email
            let date = new Date ().toISOString()
            const publishedAt = date.slice(0, 10)
            const status = "Active"
            const newArticle = await Article.create({
                title, 
                caption,
                tag,
                imgThumbnail, 
                img, 
                userId: userId, 
                publishedAt: publishedAt,
                status: status
            }, { transaction: t })
            
            // const {sectionTitle, sectionText, sectionImg} = section
            // let payload = []
            // section.map(el => {
            //     payload.push(el)
            // })
            const newSection = await ArticleSection.create({
                sectionTitle, 
                sectionText, 
                sectionImg, 
                articleId: newArticle.id
            }, { transaction: t })
            const {url} = req.body
            const previewLink = `https:/${url}/articles/${newArticle.id}`
            const subscribeLink = `https:/${url}`
            t.afterCommit(async () => {
                if(isCreated){
                    transporter.sendMail(articlePublish(emailUser, previewLink, subscribeLink), (error) => {
                        if(error){
                            throw {
                                name: 'errorsendmail',
                            }; 
                        } else {
                                console.log(`email sent to ${emailUser}`)
                                res.status(201).json({user: user, newArticle: newArticle, newSection: newSection});
                            }   
                        })
                } else null
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