import Address from "../models/addressModel.js";

//for adding address
export const addAddresses = async (req,res)=>{
    try {
        const {address} = req.body;
        const userId = req.userId
        console.log("address",address)
        const addressData  = await Address.create({...address,userId})
        res.json({sucess:true,addressData})
    } catch (error) {
        console.log(error.message)
        res.json({sucess:false,message : error.message})
    }
}

//for geting address
export const getAddress = async (req,res)=>{
    try {
        const userId = req.userId;
        const addres = await Address.find({userId})
       res.json({sucess:true,addres})
    } catch (error) {
         console.log(error.message)
        res.json({sucess:false,message : error.message})
    }
}


