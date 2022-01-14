const {Category, SubCategory} = require('../../models')

class CategoryAdminController {
    static async getCategories (req, res, next){
        try {
            const response = await Category.findAll({include: {model: SubCategory}})
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async addCategory (req, res, next){
        try {
            const {name} = req.body
            const response = await Category.create({name})
            res.status(201).json({
                msg: `Kategori ${response} berhasil ditambah`
            })
        } catch (err) {
            next(err)
        }
    }

    static async editCategory (req, res, next){
        try {
            const {name} = req.body
            const response = await Category.update({name})
            res.status(201).json({
                msg: `Kategori ${response} berhasil diedit`
            })
        } catch (err) {
            next(err)
        }
    }

    static async addSubCategory (req, res, next){
        try {
            const {name} = req.body
            const {categoryId} = req.params
            const response = await SubCategory.create({name},{
                where: {categoryId}
            })
            res.status(201).json({
                msg: `Tag ${response} berhasil ditambah`
            })
        } catch (err) {
            next(err)
        }
    }

    static async editSubCategory (req, res, next){
        try {
            const {name} = req.body
            const {categoryId} = req.params
            const response = await SubCategory.update({name},{
                where: {categoryId}
            })
            res.status(201).json({
                msg: `Tag ${response} berhasil diedit`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CategoryAdminController