import jwt from "jsonwebtoken"

const authUser = async (req,res,next)=>{
    const {token} = req.cookies;
    // console.log("cookies of : ",req.cookies)
     console.log("complete 1", req.body)
    if(!token){
        return res.json({success : false , message: "Not Authorized"})
    }
   

    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRATE)
        // console.log("decoded id : ",decodedToken)
        console.log("complete 2", req.body)
        if(decodedToken.id){
            req.userId = decodedToken.id
        }else{
             return res.json({success : false , message: "Not Authorized"}) 
        }
        next()

    } catch (error) {
         console.log(error.message)
         res.json({success : false , message: error.message})
    }
}

export default authUser;