import express from "express";
import emailSubscribe from "../Controllers/subscriber.js";

const   router = express.Router();
router.post("/subscribe",emailSubscribe);



export default router;
