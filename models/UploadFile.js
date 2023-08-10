const mongoose = require("mongoose");

const FilesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    fileType: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    fileSrc: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UploadFiles = mongoose.model("UploadFiles", FilesSchema);

module.exports = UploadFiles;
