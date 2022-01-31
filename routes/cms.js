const express = require("express");
const CMSAuthController = require("../controllers/cms/auth");
const CMSBannerController = require("../controllers/cms/banner");
const cms_router = express.Router();
const authentication = require('../middlewares/authentication')

cms_router.post('/login', CMSAuthController.loginAdmin)
cms_router.use(authentication)
cms_router.get('/banners', CMSBannerController.getBannerList)

module.exports = cms_router