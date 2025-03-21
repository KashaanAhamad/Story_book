//const mongoose = require('mongoose')
import mongoose from "mongoose";

const connectDb= async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
           // useNewUrlParser:true,
            //useUnifiedTopology: true,
            //useFindAndModify:false
        })

        console.log( `MongoDB Connected:${conn.connection.host}`)
    }catch(err) {
        console.error(err)
        process.exit(1)
    }
}

//module.exports = connectDb
export default connectDb;