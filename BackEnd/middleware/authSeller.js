import jwt from "jsonwebtoken"
const authSeller = async (req,res,next)=>{

    const {sellerToken} =req.cookies;
        if(!sellerToken){
            return res.json({sucess : false,message:"seller not authorized"})  
        }

    try {
        const decodedToken = jwt.verify(sellerToken,process.env.JWT_SECRATE)
                // console.log("decoded id : ",decodedToken)
                if(decodedToken.email == process.env.SELLER_EMAIL){
                   next()
                }else{
                     return res.json({success : false , message: "Not Authorized"}) 
                }
                // console.log("complete mw")
               
        
            } catch (error) {
                 console.log(error.message)
                 res.json({success : false , message: error.message})
            }
  
}

export default authSeller;