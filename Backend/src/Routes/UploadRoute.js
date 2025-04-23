import express from "express";

import { authMiddleware } from "../Middlewares/AuthMiddleware.js";
import { upload } from "../Middlewares/multer.js";
import {uploadFile} from "../Controllers/UploadRoute.js";
const   router = express.Router();
router.post('/upload',authMiddleware,upload.single('file'),uploadFile)



export default router;
