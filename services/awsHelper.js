const fs = require("fs");
const AWS = require("aws-sdk");
const { performance } = require("perf_hooks");
const bucket = process.env.AWS_BUCKETNAME;
const cdnBucket = process.env.CDN_LINK;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = async (bucketName, file, fileName) => {
  try {
    //console.log(s3, "hmm");
    var data = fs.readFileSync(file);
    var name = performance.now() + "_" + fileName;
    const params = {
      Bucket: bucketName,
      Key: name,
      Body: data,
    };
    //console.log(params, "jaga");
    var s3upload = await s3.putObject(params).promise();
    //console.log(s3upload, "jaga 123");
    let folder = bucketName.split(`${bucket}`)[1];
    return { fileName: name, src: `${cdnBucket}${folder}/${name}` };
  } catch (err) {
    console.log(err);
    //return "";
  }
};

module.exports = {
  uploadFile,
};
