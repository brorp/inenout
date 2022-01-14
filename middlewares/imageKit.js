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

const imageKitMiddleware = async (req, res, next) => {
    try {
        console.log(req.file)
        if(!req.file){
            throw {name:`notfound`}
        }
        if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg'&& req.file.mimetype !== 'image/pdf') {
            throw { name: 'invalidformatfile' };
        }

        form.append('file', req.file.buffer.toString('base64'))
        form.append('fileName', req.file.originalname)

        const response = await axiosInstance.post("/files/upload", form, {
          headers: {
            ...form.getHeaders()
          }
        })
        if(req.body.img){
            req.body.img = response.data.url
        }
        if(req.body.attachment){
            req.body.attachment = response.data.url
        }
        next()
        } 
    catch (err) {
        next(err);
    }
  };
  
  module.exports = { imageKitMiddleware }