import {v2 as cloudinary} from "cloudinary"
import Product from "../models/productModel.js";

// product add path: /api/product/add
export const addProduct = async (req,res)=>{
    try {
        const productData = JSON.parse(req.body.productData);
       
       
    //     console.log(productData.offerPrice)
    // console.log(productData.description)
    // console.log(productData.price)
   

    const images = req.files
    // console.log("Images : ",images)

    const imageUrl = await Promise.all(
        images.map(async (item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            // console.log("result : ",result)
            return result.secure_url;
        })
    )
    // console.log(productData.offerPrice)
    // console.log(productData.description)
    // console.log(productData.price)
    // console.log(productData.name)
    const productd = await Product.create({
        name:productData.name,
        description:productData.description,
        price:productData.price,
        offerPrice:productData.offerPrice,
        image:imageUrl,
        category:productData.category,
        inStock:productData.inStock,

        
    })
   

    res.json({success : true , message : "Product Added"})
    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }
}

// get product path : /api/product/list
export const productList = async (req,res)=>{
    try {
        const products = await Product.find({});
        res.json({success : true , products})
    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }

}
// get single product path : /api/product/id
export const productById = async (req,res)=>{
    try {
        const {id} =req.body;
        const product =await Product.findById(id);
        res.json({success : true , product})
    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }

}

//change product inStock  path : /api/product/stock
export const changeStock = async (req,res)=>{
    try {
    const {id,inStock} = req.body;
    await Product.findByIdAndUpdate(id,{inStock})
    res.json({success : true , message : "stock changed"})
    } catch (error) {
        console.log(error.message)
        res.json({success : false , message : error.message})
    }

}