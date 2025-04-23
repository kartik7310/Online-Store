import express from "express";

import { authMiddleware } from "../Middlewares/AuthMiddleware.js";
import { MyOrder,getOrderById } from "../Controllers/Order.js";

const   router = express.Router();
router.get("/order/my-order", authMiddleware,MyOrder);
router.get("/order/my-order/:orderId",authMiddleware,getOrderById)


export default router;
