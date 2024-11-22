const mongoose = require('mongoose');


const connectDB = async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection successful");
    }catch(error){
        console.log("Error"+ error);
    }
}

module.exports = connectDB;

