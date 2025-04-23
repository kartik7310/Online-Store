import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


export async function streamUpload(fileBuffer) {
  if (!fileBuffer) {
    throw new Error("No file buffer provided for upload.");
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          console.error("Cloudinary upload error:", error);
          reject(error);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}
