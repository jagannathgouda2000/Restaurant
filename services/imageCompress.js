const fileSystem = require("fs");
const sharp = require("sharp");

const imageCompression = async (file, buffer) => {
  try {
    const maxWidth = 1000;
    const maxHeight = 1000;

    if (buffer == true) {
      const imageInfo = await sharp(file).metadata();
      //const filePath = './' + fileName;
      let newMaxWidth = maxWidth;
      let newMaxHeight = maxHeight;
      if (imageInfo.height > imageInfo.width) {
        // newMaxHeight = maxHeight;
        newMaxHeight = maxHeight;
        newMaxWidth = Math.floor(
          (maxHeight / imageInfo.height) * imageInfo.width
        );
      } else {
        newMaxWidth = maxWidth;
        newMaxHeight = Math.floor(
          (maxWidth / imageInfo.width) * imageInfo.height
        );
      }
      const imageBuffer = await sharp(file)
        .resize({ width: newMaxWidth, height: newMaxHeight })
        .jpeg({ quality: 100 })
        .png({ quality: 100 })
        .webp({ quality: 50 })
        .toBuffer();

      //fileSystem.writeFileSync(filePath, imageBuffer);
      return { imageBuffer: imageBuffer, size: Buffer.byteLength(imageBuffer) };
    } else {
      const image = file;
      if (image.size > 0) {
        if (
          image.mimetype == "image/png" ||
          image.mimetype == "image/jpeg" ||
          image.mimetype == "image/gif" ||
          image.mimetype == "image/webp" ||
          image.mimetype == "image/svg+xml"
        ) {
          const fileName = image.originalFilename;
          const filePath = "./" + fileName;
          const compressedFilePath = "./uploads/" + fileName;
          var data = fileSystem.readFileSync(image.filepath);
          const imageInfo = await sharp(data).metadata();
          let newMaxWidth = maxWidth;
          let newMaxHeight = maxHeight;
          if (imageInfo.height > imageInfo.width) {
            // newMaxHeight = maxHeight;
            newMaxHeight = maxHeight;
            newMaxWidth = Math.floor(
              (maxHeight / imageInfo.height) * imageInfo.width
            );
          } else {
            newMaxWidth = maxWidth;
            newMaxHeight = Math.floor(
              (maxWidth / imageInfo.width) * imageInfo.height
            );
          }
          const imageBuffer = await sharp(data)
            .resize({ width: newMaxWidth, height: newMaxHeight })
            .jpeg({ quality: 100 })
            .png({ quality: 100 })
            .webp({ quality: 50 })
            .toBuffer();

          fileSystem.writeFileSync(filePath, imageBuffer);
          //  var test=fileSystem.readFileSync(filePath);
          //  console.log(test,"jaga");
          //  var size=Buffer.byteLength(imageBuffer);

          return { filePath: filePath, size: Buffer.byteLength(imageBuffer) };
        } else {
          console.log("not a valid image file type");
        }
      } else {
        console.log("image is not selected");
      }
    }
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { imageCompression };
