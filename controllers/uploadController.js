const UploadFile = require("../models/UploadFile");
const formidable = require("formidable");
const { uploadFile } = require("../services/awsHelper");
const uploadHotelImage = async (req, res) => {
  try {
    var form = new formidable.IncomingForm({
      keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
      try {
        console.log(fields, files, "jaga");
      } catch (err) {}
    });
    //console.log(req);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  uploadHotelImage,
};
