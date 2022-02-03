const {Category, SubCategory} = require('../../models')
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../helpers/pagination"); 
class CMSCategoryController {
    static async getCategoriesList (req, res, next){
        try {
            const {page, size, search} = req.query;
            if (+page < 1) page = 1;
            if (+size < 1) size = 5;
            const { limit, offset } = getPagination(page, size);
            let params
            if(search){
                params = {
                    'name': {[Op.iLike]: '%' + search + '%'}
                }
            } 

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
            const {name} = req.body
            await Category.create({name})
            res.status(201).json({
                msg: `Kategori berhasil ditambah`
            })
        } catch (err) {
            next(err)
        }
    }

    static async editCategories (req, res, next){
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

    static async createSubCategories(req, res, next){
        try {
            const {categoryId} = req.params
            const {name} = req.body
            let payload = [{
                name,
                categoryId
            }]
            const response = await SubCategory.create(payload)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async editSubCategories(req, res, next){
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

    static async statusCategory(req, res, next){
        try {
            const {id} = req.params
            const {status} = req.body
            await Category.update({status},{where: {id}})
            res.status(200).json({msg: 'Status kategori berhasil diubah'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CMSCategoryController