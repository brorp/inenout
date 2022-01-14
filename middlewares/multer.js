const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const uploadImgUrl = upload.single('img')

module.exports = uploadImgUrl