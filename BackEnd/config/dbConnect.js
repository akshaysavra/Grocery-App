import mongoose from "mongoose";


const dbconnect = async ()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("Connected succesfully")
        });
        mongoose.connect(`${process.env.CONNECTION_STRING}`)
    } catch (error) {
        console.error(error)
    }
}

export default dbconnect;