const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const submitArticleUpload = upload.fields([
  {name: 'attachment', maxCount: 10}, 
  {name: 'img', maxCount: 10}
])

const createArticleUpload = upload.fields([
  {name: 'img', maxCount: 1}, 
  {name: 'sectionImg', maxCount: 1}
])

const uploadProfilePic = upload.single('profilePic')
const uploadBanner = upload.single('imgBanner')
const uploadFeaturedArticle = upload.single('img')
const uploadAds = upload.single('imgAds')

module.exports = {submitArticleUpload, uploadProfilePic, createArticleUpload, uploadBanner, uploadFeaturedArticle, uploadAds}