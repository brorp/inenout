const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const uploadFile = upload.array('img', 10)

module.exports = uploadFile