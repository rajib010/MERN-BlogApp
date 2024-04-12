import dotenv from "dotenv"
import app from "./app.js"
import connection from "./dbs/connection.js";


dotenv.config();

const port = process.env.PORT;

connection()
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`App is running on port ${port}`);
        })
    })
    .catch((e)=>{
        console.log("Mongodb connection error",e);
        process.exit(1)
    })