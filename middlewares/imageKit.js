const ImageKit = require("imagekit");
const {getSalt} = require('../helpers/bcrypt')
require('dotenv').config()
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
const imagekit = new ImageKit({
  "publicKey" : publicKey, 
  "privateKey" : privateKey, 
  "urlEndpoint" : "https://ik.imagekit.io/fjaskqdnu0xp",
  "transformationPosition" : 'path' 
});
// let axiosInstance = axios.create({
//   baseURL: "https://upload.imagekit.io/api/v1/",
//   auth: {
//     username: privateKey,
//   }
// })
const randomName = getSalt((Date.now() + +Math.floor(Math.random() * 9999)).toString());
  const  singleFileUpload = (req, res, next) => {
    if(!req.file){
      throw {name: 'filenotfound'}
    }
      imagekit.upload({
        file: req.file.buffer.toString('base64'),
        fileName: randomName,
        folder: `/BANNERS_ADS_PP`
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
          req.body.sectionImg = result.url
          next()
        }
      })
  }

  const singleFileUploadEdit = (req, res, next) => {
    if(!req.file){
      next()
    } else {
      imagekit.upload({
        file: req.file.buffer.toString('base64'),
        fileName: randomName,
        folder: `/BANNERS_ADS_PP`
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
  }

  const multipleFileUpload = async (req, res, next) => {
    try {
      const c = new Date ()
      const d = c.toString().slice(0, 15)
      const folderName = d.replace(/ /g, "_");
      let resultImageUpload = []

      if(req.files.attachment){
        let result = imagekit.upload({
          file: req.files.attachment[0].buffer.toString('base64'),
          fileName: randomName,
          folder: `/SUBMITTED_ARTICLES/${folderName}`,  
        }).then(result => {
          return result 
        }).catch(error => {
          next(error)
        })
        let resultAttachment = await result
        req.body.attachment = resultAttachment.url
      }

      if(req.files.img){
        // for(let el in req.files.img)req.files.img.forEach(async(el) => {
          for(let el of req.files.img){
            let resultImg = await imagekit.upload({
              file: el.buffer.toString('base64'),
              fileName: randomName,
              folder: `/SUBMITTED_ARTICLES/${folderName}`     
            }).then(response => {
              console.log(response)
              return response.url
            }).catch(error => {
              console.log(error);
            });
            resultImageUpload.push(await resultImg)      
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
      const c = new Date ()
      const d = c.toString().slice(0, 15)
      const folderName = d.replace(/ /g, "_");

      if(req.files.imgThumbnail){
        let result = await imagekit.upload({
          file: req.files.imgThumbnail[0].buffer.toString('base64'),
          fileName: randomName,
          folder: `/ARTICLES/${folderName}`,  
        }).then(result => {
          console.log(result + "<<<<<<<<<<<")
          return result 
        }).catch(error => {
          next(error)
        })
        console.log(result)
        let uploadedImage = result
        req.body.imgThumbnail = uploadedImage.url
      }

      else if(req.files.img){
        let result = await imagekit.upload({
          file: req.files.img[0].buffer.toString('base64'),
          fileName: randomName,
          folder: `/ARTICLES/${folderName}`,  
        }).then(result => {
          console.log(result + "<<<<<<<<<<<")
          return result 
        }).catch(error => {
          next(error)
        })
        console.log(result)
        let uploadedImage = await result
        req.body.img = uploadedImage.url
      }

      else { 
        throw {message: 'filenotfound'}
      }

      await next()
    } catch (err) {
      next(err)
    }   
  };
    
  
  module.exports = { singleFileUpload, multipleFileUpload, articleUploadAll, singleFileUploadEdit }
