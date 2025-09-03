import updateCart from "../controller/cartController.js";
import  express  from 'express';
import authUser from './../middleware/authUser.js';

const cartRouter = express.Router();

cartRouter.post("/update",authUser,updateCart)

export default cartRouter;