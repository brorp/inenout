const FormData = require('form-data');
const form = new FormData ()
const ImageKit = require("imagekit");
const axios = require("axios");
require('dotenv').config()
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
const imagekit = new ImageKit({
  "publicKey" : publicKey, 
  "privateKey" : privateKey, 
  "urlEndpoint" : "https://ik.imagekit.io/fjaskqdnu0xp",
  "transformationPosition" : 'path' 
});
let axiosInstance = axios.create({
  baseURL: "https://upload.imagekit.io/api/v1/",
  auth: {
    username: privateKey,
  }
})

const singleFileUpload = async (req, res, next) => {
    try {
        if(!req.file){
            throw {name:`notfound`}
        }
        if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
            throw { name: 'invalidformatfile' };
        }

        form.append('file', req.file.buffer.toString('base64'))
        form.append('fileName', req.file.originalname)
        
        const response = await axiosInstance.post("/files/upload", form, {
          headers: {
            ...form.getHeaders()
          },
        })
        req.body.profilePic = response.data.url
        req.body.img = response.data.url
        req.body.imgBanner = response.data.url
        req.body.imgAds = response.data.url
        next()
        } 
    catch (err) {
        next(err);
    }
  };

  const multipleFileUpload = async (req, res, next) => {
    try {
        let folderName = req.body.title.replace(" ", "_");
        // form.append('file', req.files.attachment[0].buffer.toString('base64'))
        // form.append('fileName', req.files.attachment[0].originalname)
        console.log(req.body)
        // if(req.body.attachment){
          imagekit.upload({
            file: req.files.attachment[0].buffer.toString('base64'),
            fileName: req.files.attachment[0].originalname,
            folder: `/${folderName}`  
          }, function(error, result) {
              if(error){
                console.log(error)
              } else {
                console.log(result)
                req.body.attachment = result.url
              }
            });
        // }


        // if(req.body.img){
          req.files.img.forEach(el => {
            form.append('img', el.buffer.toString('base64'))
            imagekit.upload({
              file: el.buffer.toString('base64'),
              fileName: el.originalname,
              folder: `/${folderName}`     
            }, function(error, result) {
                if(error){
                  console.log(error)
                } else {
                  console.log(result)
                }
              });
          })
          // req.body.img = images
        // }
        next()
        } 
    catch (err) {
        next(err);
    }
  };




    
  
  module.exports = { singleFileUpload, multipleFileUpload }
