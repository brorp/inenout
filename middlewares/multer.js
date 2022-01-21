const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const submitArticleUpload = upload.fields([{
    name: 'attachment', maxCount: 1
  }, {
    name: 'img', maxCount: 5
  }])
const uploadProfilePic = upload.single('profilePic')
const uploadPDF = upload.single('attachment')

module.exports = {submitArticleUpload, uploadProfilePic, uploadPDF}