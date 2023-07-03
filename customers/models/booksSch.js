const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
        title:{
            type:String
        
        },
        author:{
            type:String
          
        },
        numberPages:{
            type:Number
        
        },
        publisher:{
            type:String
        
        }
})

module.exports=mongoose.model("Book", bookSchema);