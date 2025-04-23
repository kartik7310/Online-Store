import express from "express";

import { authMiddleware, isAdmin } from "../Middlewares/AuthMiddleware.js";
import { getOrder,deleteOrder,updateStatus } from "../Controllers/Admin/Order.js";
const router = express.Router();
router.get("/get-order", authMiddleware,isAdmin, getOrder);
router.put("/update-status/:id", authMiddleware,isAdmin, updateStatus);
router.delete("/delete-order/:id", authMiddleware,isAdmin, deleteOrder);


export default router;
