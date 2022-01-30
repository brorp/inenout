const {Category, SubCategory} = require('../../models')
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination");
export class CMSCategoryController {
    static async getCategoriesList (req, res, next){
        try {
            const {page, size, search} = req.query;
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const { limit, offset } = getPagination(page, size);
            const {search} = req.query;
            let params
            if(search){
                params = {
                    'name': {[Op.iLike]: '%' + search + '%'}
                }
            } else params = {}

            const response = await Category.findAndCountAll({
                where: params,
                limit,
                offset
            })
            res.status(200).json(getPagingData(response, page, limit))
        } catch (err) {
            next(err)
        }
    }

    static async getCategoriesById (req, res, next){
        try {
            const {id} = req.params
            const response = await Category.findByPk({
                where: {id},
                include: {model: SubCategory}
            })
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async addCategories (req, res, next){
        try {
            const {name, subCategoryName} = req.body
            const {categoryId} = req.params
            let payload = [{
                name: subCategoryName,
                categoryId
            }]
            const newCategory = await Category.create({name})
            const newSubCategory = await SubCategory.create(payload)
            res.status(201).json({
                msg: `Kategori berhasil ditambah`
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
            const response = await SubCategory.findAll({where: {categoryId: req.params.id}})
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
