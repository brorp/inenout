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

// const singleFileUpload = async (req, res, next) => {
//     try {
//         if(!req.file){
//             throw {name:`notfound`}
//         }
//         if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
//             throw { name: 'invalidformatfile' };
//         }

//         form.append('file', req.file.buffer.toString('base64'))
//         form.append('fileName', req.file.originalname)
        
//         const response = await axiosInstance.post("/files/upload", form, {
//           headers: {
//             ...form.getHeaders()
//           },
//         })
//         req.body.profilePic = response.data.url
//         req.body.img = response.data.url
//         req.body.imgBanner = response.data.url
//         req.body.imgAds = response.data.url
//         next()
//         } 
//     catch (err) {
//         next(err);
//     }
//   };

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
            folder: `/${folderName}`,  
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
                folder: `/${folderName}`     
              }).then(response => {
                return response.url
              }).catch(error => {
                console.log(error);
              });
              resultImageUpload.push(resultImg)      
            }
            req.body.img = resultImageUpload
        }

        else { throw {name: 'filenotfound'}}

        await next()
    } catch (err) {
      next(err)
    }   
  };




    
  
  module.exports = { singleFileUpload, multipleFileUpload }
