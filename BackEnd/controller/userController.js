import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Ragister user path: /api/user/register
export  const register = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.json({success : false , message: "All field are mandatory"})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){return res.json({success : false , message: "Email is already registered"})}

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password:hashedPassword})
        const token = jwt.sign({id:user._id},process.env.JWT_SECRATE,{expiresIn:'7d'})


        res.cookie('token',token ,{
            httpOnly : true,//prevent js to access cookie
            secure : true,  //use secure cookie in production
            sameSite:"none", // use for csrf protection
            maxAge: 7 * 24 * 60 * 60 * 1000,//cookie exipiratin time
        })

        return  res.json({success : true , user : {email : user.email ,name:user.name}})


    } catch (error) {
        console.log(error.message)
         res.json({success : false , message: error.message})
    }
}

// login user path: /api/user/login
export const login = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.json({success : false , message: "All field are mandatory"})
    }

    const user = await User.findOne({email});
    if(!user){
        return res.json({success : false , message: "invalid email or password"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
       return res.json({success : false , message: "invalid email or password"})
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRATE,{expiresIn:'7d'})


    res.cookie('token',token ,{
            httpOnly : true,//prevent js to access cookie
            secure : true,  //use secure cookie in production
            sameSite:"none", // use for csrf protection
            maxAge: 7 * 24 * 60 * 60 * 1000,//cookie exipiratin time
        })

        return  res.json({success : true , user : {email : user.email ,name:user.name}})
    

}

//isauth for path: /api/user/is-auth
export const isAuth = async (req,res)=>{
    try{
    // console.log("conttroller :" ,req)
    const userId = req.userId;
    const user = await User.findById(userId).select("-password  ")
    return res.json({success : true , user})
    }catch(error){
 console.log(error.message)
         res.json({success : false , message: error.message})
    } 
}

// logout path : /api/user/logout
export const logout = async (req,res)=>{
    try {
        res.clearCookie('token',{
             httpOnly : true,//prevent js to access cookie
            secure : true,  //use secure cookie in production
            sameSite: "none", // use for csrf protection
          
        })
        res.json({success : true , message: "logged Out"})
    } catch (error) {
        console.log(error.message)
         res.json({success : false , message: error.message})
    }
}
