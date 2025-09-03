import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    items : [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "aroduct" },
        quantity : {type:Number,required:true}
    }],
    amount:{type:Number,required:true},
    address: { type: mongoose.Schema.Types.ObjectId, ref: "address" },
    
    status:{type:String,required:true ,default:"order Placed"},
    paymentType:{type:String,required:true },
    isPaid:{type:Boolean,required:true,default:true }
},{timestamps:true,strictPopulate:false})

const Order = mongoose.model('order',orderSchema);

export default Order;