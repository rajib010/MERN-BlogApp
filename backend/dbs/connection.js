import mongoose from "mongoose"

const dbUrl = process.env.DB_URL
const dbName = process.env.DB_NAME

const connection = async function(){
    try {
        await mongoose.connect(`${dbUrl}/${dbName}`);
        console.log("Db connection was successfull");    
    } catch (error) {
        console.log("error in db connection", error);
    }
}

export default connection;