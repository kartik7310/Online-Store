import express from "express";

import { authMiddleware, isAdmin } from "../Middlewares/AuthMiddleware.js";

import {
  AddUser,
  EditUser,
  deleteUser,
  getUser,
} from "../Controllers/Admin/Admin.js";
const router = express.Router();
router.post("/add-user", authMiddleware,isAdmin, AddUser);
router.get("/get-user",authMiddleware,isAdmin, getUser);
router.put("/update-user/:userId",authMiddleware,isAdmin,EditUser );
router.delete("/delete-user/:userId",authMiddleware,isAdmin,deleteUser );

export default router;
