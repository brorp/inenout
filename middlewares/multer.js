const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const submitArticleUpload = upload.fields([
  {name: 'attachment', maxCount: 10}, 
  {name: 'img', maxCount: 10}
])
const uploadProfilePic = upload.single('profilePic')

module.exports = {submitArticleUpload, uploadProfilePic}