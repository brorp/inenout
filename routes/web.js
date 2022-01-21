const express = require("express");
const web_router = express.Router();
const AuthController = require('../controllers/web/auth')
const UserController = require('../controllers/web/user')
const ArticleController = require('../controllers/web/articles')
const CommentController = require('../controllers/web/comment')
const authentication = require('../middlewares/authentication')
const {submitArticleUpload, uploadProfilePic, uploadPDF} = require('../middlewares/multer')
const { singleFileUpload, multipleFileUpload } = require('../middlewares/imageKit')
const resetPasswordMiddleware = require('../middlewares/resetPassword')

web_router.post('/login', AuthController.userLogin)
web_router.post('/register', AuthController.registerUser)
web_router.post('/verification/:id/:token', AuthController.verifyUser)
web_router.post('/forgot-password', AuthController.forgotPassword)
web_router.post('/reset-password/:id/:token', resetPasswordMiddleware, AuthController.resetPassword)

web_router.get('/banners', ArticleController.getBanner)
web_router.get('/featured-articles', ArticleController.getHomepageFeaturedArticle)
web_router.get('/articles', ArticleController.getArticleHome)
web_router.get('/articles/:articleId', ArticleController.getArticleDetail)

web_router.use(authentication)

web_router.post('/comments/:articleId', CommentController.postComment)
web_router.patch('/like/:id', CommentController.likeComment)

web_router.post('/submit', 
    submitArticleUpload, 
    multipleFileUpload,  
    ArticleController.submitArticle)

web_router.get('/profile', UserController.getUserInfo)
web_router.post('/profile', 
    uploadProfilePic, 
    singleFileUpload, 
    UserController.updateProfile)

web_router.post('/change-password', UserController.userChangePassword)
web_router.patch('/subscribe', UserController.createSubscription)

module.exports = web_router