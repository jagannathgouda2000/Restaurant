const fs = require("fs");
const AWS = require("aws-sdk");
const { performance } = require("perf_hooks");
const bucket = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.s3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const uploadFile = async (bucketName, file, fileName) => {
  try {
    var data = fs.readFileSync(file);
    var name = performance.now() + "_" + fileName;
    const params = {
      Bucket: bucketName,
      key: name,
      Body: data,
    };
    var s3upload = await s3.upload(params).promise();
    let folder = bucketName.split(`${bucket}`)[1];
    return { fileName: name, src: `${AWS_LINK}${name}` };
  } catch (err) {
    return "";
  }
};

module.exports = {
  uploadFile,
};
