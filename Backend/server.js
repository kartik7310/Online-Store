import express from "express";
import cookieParser from 'cookie-parser';
import { connectDB } from "./src/db/db.js";
import dotenv from "dotenv";
import User from "./src/Routes/UserRoute.js";
import Product from "./src/Routes/ProductRoute.js"
import CartRoute from "./src/Routes/CartRoute.js"
import Checkout from './src/Routes/checkout.js'
import Order from './src/Routes/Order.js'
import fileUploadRoute from "./src/Routes/UploadRoute.js"
import subscribeEmail from "./src/Routes/subcribe.js"
import AdminRoute from "./src/Routes/AdminRoute.js"
import AdminProduct from "./src/Routes/AdminProduct.js"
import AdminOrder from "./src/Routes/AdminOrder.js"
import cors from 'cors';
dotenv.config();
const app = express();


// cors options here
const frontend_url =process.env.FRONTEND_URL
const corsOptions = {
  origin: [frontend_url], // 👈 Add your frontend URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true, // allow cookies/token headers
};

app.use(cors(corsOptions))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();
//routes
app.get("/home", (req, res) => {
  res.json("hello from server");
  console.log("hello from server");
});

app.use("/api/v1", User);
app.use("/api/v1",Product)
app.use("/api/v1",CartRoute)
app.use("/api/v1",Checkout)
app.use("/api/v1",Order)
app.use("/api/v1",fileUploadRoute)
app.use("/api/v1",subscribeEmail)

//admin routes 

app.use("/api/v1/admin",AdminRoute)
app.use("/api/v1/admin",AdminProduct)
app.use("/api/v1/admin",AdminOrder)

// // Error Handler
// app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${[port]}`));
