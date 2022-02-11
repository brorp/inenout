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

  const singleFileUpload = (req, res, next) => {
      imagekit.upload({
        file: req.file.buffer.toString('base64'),
        fileName: req.file.originalname,
      }, function(err, result){
        if(err){
          console.log(err)
          next(err)
        } else {
          console.log(result)
          req.body.profilePic = result.url
          req.body.img = result.url
          req.body.imgBanner = result.url
          req.body.imgAds = result.url
          next()
        }
      })
  }

  const multipleFileUpload = async (req, res, next) => {
    try {
      let folderName = req.body.title.replace(/ /g, "_");
        if(req.files.attachment){
          let result = imagekit.upload({
            file: req.files.attachment[0].buffer.toString('base64'),
            fileName: req.files.attachment[0].originalname,
            folder: `/SUBMITTED_ARTICLES/${folderName}`,  
          }).then(result => {
            return result 
          }).catch(error => {
            next(error)
          })
          let resultAttachment = await result
          req.body.attachment = resultAttachment.url
        }

        let resultImageUpload = []
        if(req.files.img){
          // for(let el in req.files.img)req.files.img.forEach(async(el) => {
            for(let el of req.files.img){
              let resultImg = await imagekit.upload({
                file: el.buffer.toString('base64'),
                fileName: el.originalname,
                folder: `/SUBMITTED_ARTICLES/${folderName}`     
              }).then(response => {
                return response.url
              }).catch(error => {
                console.log(error);
              });
              resultImageUpload.push(resultImg)      
            }
            req.body.img = resultImageUpload
        }

        else if(!req.files.img){
          req.body.img = null 
        }

        else if(!req.files.attachment){
          req.body.attachment = null 
        }

        else { 
          req.body.img = null
          req.body.attachment = null 
        }

        await next()
    } catch (err) {
      next(err)
    }   
  };

  const articleUploadAll = async (req, res, next) => {
    try {
      let folderName = req.body.title.replace(/ /g, "_");
        if(req.files.imgThumbnail){
          let result = await imagekit.upload({
            file: req.files.imgThumbnail[0].buffer.toString('base64'),
            fileName: req.files.imgThumbnail[0].originalname,
            folder: `/ARTICLES/${folderName}`,  
          }).then(result => {
            return result 
          }).catch(error => {
            next(error)
          })
          console.log(result)
          let uploadedImage = result
          req.body.imgThumbnail = uploadedImage.url
        }

        if(req.files.img){
          let result = await imagekit.upload({
            file: req.files.img[0].buffer.toString('base64'),
            fileName: req.files.img[0].originalname,
            folder: `/ARTICLES/${folderName}`,  
          }).then(result => {
            return result 
          }).catch(error => {
            next(error)
          })
          console.log(result)
          let uploadedImage = result
          req.body.img = uploadedImage.url
        }

        if(req.files.sectionImg){
          let result = await imagekit.upload({
            file: req.files.sectionImg[0].buffer.toString('base64'),
            fileName: req.files.sectionImg[0].originalname,
            folder: `/ARTICLES/${folderName}`,  
          }).then(result => {
            return result 
          }).catch(error => {
            next(error)
          })
          console.log(result)
          let uploadedImage = await result
          req.body.sectionImg = uploadedImage.url
        }

        else { 
          throw {message: 'filenotfound'}
        }

        await next()
    } catch (err) {
      next(err)
    }   
  };


    
  
  module.exports = { singleFileUpload, multipleFileUpload, articleUploadAll }
