const aws = require('aws-sdk') ;

if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
require('dotenv').config();
aws.config.update({
    secretAccessKey: process.env.S3_SECRETKEY,
    accessKeyId: process.env.S3_ACCESSKEY,
    region: process.env.S3_REGION
});

const s3 = new aws.S3({
    Bucket: process.env.S3_BUCKETNAME,
    signatureVersion: 'v4'
});

(async () => {
    await s3.putObject({
        Body: "",
        Bucket: process.env.S3_BUCKETNAME,
        Key: "test.png"
    })
    .promise()
})();

// module.exports = s3;