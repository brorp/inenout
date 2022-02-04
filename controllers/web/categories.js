const {Category, SubCategory} = require('../../models/index') 

class CategoryController{
    static async getCategoriesList(req, res, next){
        try {
            const response = await Category.findAll({
                where: {status: "Active"},
                include: {model: SubCategory}
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CategoryController