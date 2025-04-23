import express from "express";

import { authMiddleware, isAdmin } from "../Middlewares/AuthMiddleware.js";
import getProduct from "../Controllers/Admin/Product.js";
const router = express.Router();
router.get("/get-product", authMiddleware,isAdmin, getProduct);


export default router;
