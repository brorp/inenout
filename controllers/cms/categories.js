const {Category, SubCategory} = require('../../models')

export class CMSCategoryController {
    static async getCategories (req, res, next){
        try {
            const response = await Category.findAll()
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getCategoriesById (req, res, next){
        try {
            const {id} = req.params
            const response = await Category.findByPk({where: {id}})
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

    static async getSubCategories(req, res, next){
        try {
            const response = await Category.findAll({where: {categoryId: req.params.id}})
            res.status(200).json(response)
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
