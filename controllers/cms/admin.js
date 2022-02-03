const {Admin} = require('../../models')
const { getPagination, getPagingData } = require("../../helpers/pagination");
const { Op } = require("sequelize");


class CMSAdminController {
    static async getAdminList(req, res, next){
        try {
            let { page, size, search, filter } = req.query;
            let params;
            if (+page < 1) page = 1;
            if (+size < 1) size = 8;
            const { limit, offset } = getPagination(page, size);
            if (search) {
              params = {
                [Op.or]: [
                  { 'fullName': { [Op.iLike]: '%' + search + '%' } },
                  { 'email': { [Op.iLike]: '%' + search + '%' } }
                ]
              }
            }
            if(filter){
                params = {
                    'status': params
                }
            }
            const response = await Admin.findAndCountAll({
                where: params,
                order: [["fullName", "ASC"]],
                attributes: {exclude: ["password"]},
                limit,
                offset,
            })
            res.status(200).json(
                getPagingData(response, page, limit)
            )
        } catch (err) {
            next(err)
        }
    }

    static async createAdmin(req, res, next){
        try {
            const {email, password, fullName} = req.body
            const role = 'Admin'
            if(req.body.password !== req.body.password2){
                throw {name: 'passwordnotmatch'}
            }
            const response = await Admin.create({email, password, fullName, role: role})
            res.status(201).json({msg: `Admin ${response.email} berhasil didaftarkan`})
        } catch (err) {
            next(err)
        }
    }

    static async statusAdmin(req, res, next){
        try {
            const {id} = req.params
            const {status} = req.body
            await Admin.update({status},{where: {id}})
            res.status(200).json({msg: 'Status Admin berhasil diubah'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CMSAdminController
