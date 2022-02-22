const express = require("express");
const CMSAuthController = require("../controllers/cms/auth");
const CMSBannerController = require("../controllers/cms/banner");
const CMSFeaturedArticleController = require("../controllers/cms/featuredarticle");
const CMSAdsController = require("../controllers/cms/ads");
const CMSArticleController = require('../controllers/cms/articles')
const CMSUserController = require("../controllers/cms/user");
const CMSCategoryController = require("../controllers/cms/categories");
const CMSCommentController = require('../controllers/cms/comment')
const CMSInboxController = require('../controllers/cms/inbox')
const CMSAdminController = require('../controllers/cms/admin')
const {createArticleUpload, uploadBanner, uploadFeaturedArticle, uploadAds} = require('../middlewares/multer')
const {singleFileUpload, multipleFileUpload, articleUploadAll, singleFileUploadEdit} = require('../middlewares/imageKit')
const cms_router = express.Router();
const {authenticationAdmin} = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandler')
cms_router.post('/login', CMSAuthController.loginAdmin)

cms_router.use(authenticationAdmin)

//banners
cms_router.get('/banners', CMSBannerController.getBannerList)
cms_router.post('/banners', uploadBanner, singleFileUpload, CMSBannerController.createBanner)
cms_router.get('/banners/:id', CMSBannerController.getBannerById)
cms_router.post('/banners/:id', uploadBanner, singleFileUploadEdit, CMSBannerController.editBanner)
cms_router.patch('/banners/status/:id', CMSBannerController.statusBanner)

//featured articles
cms_router.get('/featured-articles/homepage', CMSFeaturedArticleController.getFeaturedHomeList)
cms_router.get('/featured-articles/categories', CMSFeaturedArticleController.getFeaturedCategoriesList)
cms_router.post('/featured-articles', uploadFeaturedArticle, singleFileUpload, CMSFeaturedArticleController.createFeatured)
cms_router.get('/featured-articles/:id', CMSFeaturedArticleController.getFeaturedById)
cms_router.post('/featured-articles/:id', uploadFeaturedArticle, singleFileUploadEdit, CMSFeaturedArticleController.editFeatured)
cms_router.patch('/featured-articles/status/:id', CMSFeaturedArticleController.statusFeatured)

// ads
cms_router.get('/ads', CMSAdsController.getAdsList)
cms_router.post('/ads', uploadAds, singleFileUpload, CMSAdsController.createAds)
cms_router.get('/ads/:id', CMSAdsController.getAdsById)
cms_router.post('/ads/:id', uploadAds, singleFileUploadEdit, CMSAdsController.editAds)
cms_router.patch('/ads/status/:id', CMSAdsController.statusAds)

//news
cms_router.get('/articles', CMSArticleController.getArticleList)
cms_router.get('/articles/:id', CMSArticleController.getArticleInfoDetail)
cms_router.get('/articles/comments/:articleId', CMSCommentController.getCommentByArticle)
cms_router.post('/articles', createArticleUpload, articleUploadAll, CMSArticleController.addNewArticle)
cms_router.patch('/articles/status/:id', CMSArticleController.statusArticle)

//users
cms_router.get('/users', CMSUserController.getUserList)
cms_router.get('/users/:id', CMSUserController.getUserInfoDetail)
cms_router.get('/users/articles/:userId', CMSArticleController.getArticleByUser) // for get article in user detail
cms_router.get('/users/comments/:userId', CMSCommentController.getCommentByUser)
cms_router.patch('/users/status/:id', CMSUserController.statusUser)

//admins
cms_router.get('/admins', CMSAdminController.getAdminList)
cms_router.post('/admins', CMSAdminController.createAdmin)
cms_router.patch('/admins/status/:id', CMSAdminController.statusAdmin)

//comments
cms_router.get('/comments', CMSCommentController.getCommentList)
cms_router.patch('/comments/status/:id', CMSCommentController.statusComment)

//categories
cms_router.get('/categories', CMSCategoryController.getCategoriesList)
cms_router.get('/categories/:id', CMSCategoryController.getCategoriesById)
cms_router.post('/categories', CMSCategoryController.addCategories)
cms_router.post('/categories/:id', CMSCategoryController.editCategories)
cms_router.post('/subcategories/:categoryId', CMSCategoryController.createSubCategories)
cms_router.patch('/categories/status/:id', CMSCategoryController.statusCategory)

//inbox 
cms_router.get('/incoming-articles', CMSInboxController.getIncomingArticleList)
cms_router.get('/incoming-articles/:id', CMSInboxController.incomingArticleDetail)
cms_router.patch('/incoming-articles/status/:id', CMSInboxController.updateStatusIncomingArticle)
cms_router.get('/subscribed-users', CMSInboxController.getSubscribedUser)

cms_router.use(errorHandler)

module.exports = cms_router