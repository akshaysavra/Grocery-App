import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";


// function for placing order in cod method
export const placeOrderCOD = async (req,res)=>{
   try {
     const {items,address} = req.body;
     const userId = req.userId;
    if(!address || items.length  === 0){
        return res.json({success: false ,message : "invalid Data"})
    }
    //calculating amut from items
    let amount = await items.reduce(async (acc,item)=>{
        // console.log("item from oc",item)
        let product = await Product.findById(item.product)
        return (await acc) + product.offerPrice * item.quantity;

    },0)
    //adding tax charge 2%
    amount += Math.floor(amount * 0.02)

    await Order.create({
        userId,
        items,
        amount,
        address,
        paymentType : "COD"

    })

    res.json({
        sucess :true,
        message : "order Placed sucessfully"
    })
   } catch (error) {
      console.log("place order backend",error.message)
        res.json({sucess:false,message : error.message})
   }

}

// ge user orders path : /api/order/user
export const getUserOrder = async (req,res)=>{
   try {
     const userId = req.userId;
    const orders = await Order.find({
        userId,
        $or : [{paymenType : "COD"},{isPaid:true}]
    }).populate({ path: "items.product", model: "product" }).sort({createdAt : -1})
    // console.log("Orders from order getcontroller ",orders)
    res.json({
        sucess :true,
        orders
    })
   } catch (error) {
         console.log(error.message)
        res.json({sucess:false,message : error.message})
   }
}

//get all order path : /api/order/seller;
export const getAllOrder = async (req,res)=>{
   try {
    
    const orders = await Order.find({
       
        $or : [{paymenType : "COD"},{isPaid:true}]
    }).populate({ path: "items.product", model: "product" }).sort({createdAt : -1})
    console.log("Orders from order getcontroller sller ",orders)
    res.json({
        sucess :true,
        orders
    })
   } catch (error) {
         console.log(error.message)
        res.json({sucess:false,message : error.message})
   }
}
