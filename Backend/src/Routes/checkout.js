import express from "express";

import { authMiddleware } from "../Middlewares/AuthMiddleware.js";
import { createCheckout, finalized, updateCheckout } from "../Controllers/Checkout.js";

const   router = express.Router();
router.post("/checkout", authMiddleware,createCheckout);
router.put('/checkout/:id/pay',updateCheckout)
router.post('/checkout/:id/finalize',finalized)

export default router;
