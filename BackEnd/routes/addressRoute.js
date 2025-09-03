import express from "express"
import authUser from "../middleware/authUser.js";
import { addAddresses, getAddress } from "../controller/addressController.js";
const addressRouter = express.Router();

addressRouter.post("/add",authUser,addAddresses)
addressRouter.get("/get",authUser,getAddress)

export default addressRouter;