// const aws = requrie('aws-sdk') ;
// import multer from 'multer';
// import multerS3 from 'multer-s3';

// if (process.env.NODE_ENV != 'production') {
//     require('dotenv').config();
// }

// aws.config.update({
//     secretAccessKey: process.env.S3_SECRETKEY,
//     accessKeyId: process.env.S3_ACCESSKEY,
//     region: process.env.S3_REGION
// });

// const s3 = new aws.S3({
//     Bucket: process.env.S3_BUCKETNAME,
//     signatureVersion: 'v4'
// });

// module.exports = s3;