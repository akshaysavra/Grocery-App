import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    name : {type:String , required : true},
    description : {type:Array , required : true,unique:true},
    price : {type:String , required : [true,"please enter price"]},
    offerPrice : {type:String , required : true},
    image : {type:Array , required : true},
    category : {type:String , required : true},
    inStock : {type:Boolean , required : true ,default : true},
     
},{timestamps:true})

const Product = mongoose.model('product',productSchema)
export default Product;