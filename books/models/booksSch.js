const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
        title:{
            type:String
        
        },
        author:{
            type:String
          
        },
        numberPage:{
            type:Number
        
        },
        publisher:{
            type:String
        
        }
})

module.exports=mongoose.model("Book", bookSchema);