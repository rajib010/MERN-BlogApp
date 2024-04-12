import mongoose from "mongoose"

const connection = async function(){
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/blogApp`);
        console.log("Db connection was successfull");    
    } catch (error) {
        console.log("error in db connection", error);
    }
}

export default connection;