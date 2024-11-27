const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminLogin = new Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        defauult:Date.now()
    }
});

module.exports =  mongoose.model('Admin',adminLogin);
