const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const model=new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    }
})

module.exports=mongoose.model('User',model);