import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config'
import dbconnect from "./config/dbConnect.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";

const port = process.env.PORT || 4000;
const app = express();

await dbconnect()
await connectCloudinary()

//allowedOrigins array
// const allowedOrigins = ['http://localhost:5173']

// MiddleWare Configuration 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // no array here
  credentials: true
}));

app.get("/" ,(req,res)=>{
    res.send("hello from server")
})

app.use("/api/user",userRouter)
app.use("/api/seller",sellerRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use("/api/order",orderRouter)

app.listen(port,()=>{
    console.log(`server is running  at http://localhost/${port}`)
})
