

import { streamUpload } from "../Utils/stream.js";



async function uploadFile(req, res) {
  try {

    const  file = req.file;
  console.log("file",file);
  
    
    if (!file) {
      return res.status(404).json("file not provide");
    }

    //call the stream upload function
    const result = await streamUpload(file.buffer);
    console.log(result);
    console.log(result.secure_url);

    return res.status(200).json({ success: true, imageUrl: result.secure_url });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
export {uploadFile} ;