import mongoose from "mongoose";
import colors from "colors";

const DBConnection = async () =>{
    try{
        const connection= await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongoDB ${connection.connection.host}`.bgBlue.white)
    }catch(error){
        console.log(`Error in MongoDB ${error}`.bgRed.white)
    }
}

export default DBConnection