const {User, Article, ArticleSection} = require('../../models')
class ArticleAdminController {
    static async addNewArticle(req, res, next){
        const t = await sequelize.transaction();
        try {
            const {email, fullName} = req.body
            const newPassword = (Math.random() + 1).toString(36).substring(2)
            const [user, isCreated] = await User.findOrCreate({ 
                where: {email},
                defaults: {
                    email: email,
                    password: newPassword,
                    fullName: fullName,
                }
            })
            
            const {userId} = user.id || isCreated.id
            const {title, caption, img} = req.body
            let date = new Date ().toISOString()
            const {publishedAt} = date.slice(0, 10)
            const newArticle = await Article.create({title, caption, img, userId, publishedAt})
            
            const {articleId} = newArticle.id
            const {sectionTitle, sectionText, sectionImg} = req.body
            const newSection = await ArticleSection.create({sectionTitle, sectionText, sectionImg, articleId})
            
            await t.commit();
            res.status(201).json({newArticle: newArticle, newSection: newSection});
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
}

module.exports = ArticleAdminController