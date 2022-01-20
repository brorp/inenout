const express = require("express");
const web_router = express.Router();
const {AuthController, 
    UserController, 
    ArticleController, 
    CommentController} = require('../controllers')
const authentication = require('../middlewares/authentication')
const uploadFile = require('../middlewares/multer')
const imageKitMiddleware = require('../middlewares/multer')

web_router.post('/login', AuthController.userLogin)
web_router.post('/register', AuthController.registerUser)
web_router.post('/verification/:id/:token', AuthController.verifyUser)
web_router.post('/forgot-password', AuthController.forgotPassword)
web_router.post('/reset-password/:id/:token', AuthController.resetPassword)

web_router.use(authentication)

web_router.get('/banners', ArticleController.getBanner)
web_router.get('/featured-articles', ArticleController.getHomepageFeaturedArticle)
web_router.get('/articles', ArticleController.getArticleHome)

web_router.get('/articles/:articleId', ArticleController.getArticleDetail)
web_router.post('/comments/:articleId', CommentController.postComment)
web_router.patch('/like/:id', CommentController.likeComment)

web_router.post('/submit', uploadFile, imageKitMiddleware, ArticleController.submitArticle)

web_router.get('/profile', UserController.getUserInfo)
web_router.post('/profile', UserController.updateProfile)
web_router.post('/change-password', UserController.userChangePassword)

web_router.patch('/subscribe', UserController.createSubscription)

module.exports = web_router