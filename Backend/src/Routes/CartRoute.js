import express from "express";

// import { authMiddleware, isAdmin } from "../Middlewares/AuthMiddleware.js";
import { createCart, updateCart,deleteCart, getCart } from "../Controllers/Cart.js";
const router = express.Router();
router.post("/cart", createCart);
router.put("/cart", updateCart);
router.delete("/cart", deleteCart);
router.get("/cart", getCart);

export default router;
