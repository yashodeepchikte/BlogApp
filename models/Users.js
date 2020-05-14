const mongoose = require("mongoose");


const articleSchema = new mongoose.Schema({
    title:{type:String,
        required:true,
        default: () => ""
    },
    description:{
        type:String,
        required:true,
        default: () => ""
    },
    markdown: {
        type:String,
        required:true,
        default: () => ""
    },
    createdAt:{
        type:Date,
        default : Date.now

    },
    email:{
        type:String,
    }
})

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    articles:[articleSchema] 
});

const User = mongoose.model("user", UserSchema);
module.exports = User