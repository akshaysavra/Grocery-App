import jwt from "jsonwebtoken"

// sellerlogin  path: /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        if (!email || !password) {
            return res.json({ success: false, message: "All field are mandatory" })
        }
        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
            console.log("env : ",process.env.SELLER_PASSWORD)
            console.log("env : ",process.env.SELLER_EMAIL)
            const sellerToken = jwt.sign({ email }, process.env.JWT_SECRATE, { expiresIn: '7d' })
            res.cookie('sellerToken', sellerToken, {
                httpOnly: true,//prevent js to access cookie
                secure: process.env.NODE_ENV === "production",  //use secure cookie in production
                sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict', // use for csrf protection
                maxAge: 7 * 24 * 60 * 60 * 1000,//cookie exipiratin time
            })
            return res.json({ success: true, message: "logged in " })
        } else {
           return res.json({ success: false, message: "not authorized" })
        }
       
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

//isauth for path: /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
       
        return res.json({ success: true, user : "seller is authorized" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// logout path : /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,//prevent js to access cookie
            secure: process.env.NODE_ENV === "production",  //use secure cookie in production
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict', // use for csrf protection

        })
        res.json({ success: true, message: "logged Out" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}