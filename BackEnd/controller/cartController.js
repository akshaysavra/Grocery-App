import User from "../models/userModel.js";


// for updating cart items
 const updateCart = async (req,res)=>{
    try {
        const {cartItems} = req.body;
        const userId = req.userId;   
        console.log("from cartbackend",cartItems)
        console.log("cart comntroller : ",cartItems,userId)
        await User.findByIdAndUpdate(userId,{cartItems})
        res.json({sucess : true , message : "cart Updated"})
    } catch (error) {
        console.log(error.message)
        res.json({sucess : false , message : error.message})

        
    }
}

export default updateCart;