const FormData = require('form-data');
const form = new FormData ()
const axios = require("axios");
require('dotenv').config()
const imgKitKey = process.env.IMAGEKIT_PRIVATE_KEY

let axiosInstance = axios.create({
  baseURL: "https://upload.imagekit.io/api/v1/",
  auth: {
    username: imgKitKey,
  }
})

module.exports = axiosInstance
const imageKitMiddleware = async (req, res, next) => {
    try {
        console.log(req.file)
        if(!req.file){
            throw {name:`notFound`}
        }

        if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
          throw { name: 'invalidpicformat' };
        }

        form.append('file', req.file.buffer.toString('base64'))
        form.append('fileName', req.file.originalname)

        const response = await axiosInstance.post("/files/upload", form, {
          headers: {
            ...form.getHeaders()
          }
        })
        req.body.imgUrl = response.data.url
        next()
        } 
    catch (err) {
        next(err);
    }
  };
  
  module.exports = { imageKitMiddleware }