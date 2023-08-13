const UploadFile = require("../models/UploadFile");
const formidable = require("formidable");
const { uploadFile } = require("../services/awsHelper");
const imageCompression = require("../services/imageCompress");
const fs = require("fs");
const bucket = process.env.AWS_BUCKETNAME;

const uploadHotelImage = async (req, res) => {
  try {
    var form = new formidable.IncomingForm({
      keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
      try {
        const { id } = req.userInfo;
        console.log(id, "id");
        //console.log(files[""][0], "jaga", fields);
        const originalFileName = files[""][0]["originalFilename"];
        //console.log(originalFileName);
        var img = await imageCompression.imageCompression(files[""][0]);
        //console.log(img);
        var upload = await uploadFile(
          `${bucket}/hotel`,
          img.filePath,
          originalFileName
        );

        if (upload?.src) {
          var file = new UploadFile({
            userId: id,
            fileName: upload.fileName,
            fileSrc: upload.src,
            fileType: "hotel",
            size: img.size,
          });
          var uploaded = await file.save();
          if (uploaded) {
            res.json({ src: uploaded.fileSrc });
          } else {
            return res.status(404).json({ message: "Error while saving" });
          }
          fs.unlinkSync(img.filePath);
        } else {
          return res.status(404).json({ message: "Error while saving" });
        }
      } catch (err) {
        console.log(err, "err");
        return res.status(500).json({ message: "Something went wrong 1" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  uploadHotelImage,
};
