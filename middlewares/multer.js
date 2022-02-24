const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const submitArticleUpload = upload.fields([
  {name: 'attachment', maxCount: 1}, 
  {name: 'img', maxCount: 10},
])

const createArticleUpload = upload.fields([
  {name: 'imgThumbnail', maxCount: 1},
  {name: 'img', maxCount: 1}, 
  {name: 'sectionImg', maxCount: 1}
])

const uploadProfilePic = upload.single('profilePic')
const uploadBanner = upload.single('imgBanner')
const uploadFeaturedArticle = upload.single('img')
const uploadAds = upload.single('imgAds')
const uploadArticleSection = upload.single('sectionImg')

module.exports = {submitArticleUpload, uploadProfilePic, createArticleUpload, uploadBanner, uploadFeaturedArticle, uploadAds, uploadArticleSection}