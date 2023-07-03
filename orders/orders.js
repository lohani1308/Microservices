const express=require('express');
const app=express();
const User=require('./Models/UserInputSchema');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/usersRegistered");

app.get('/orders',async(req,res)=>{
    var arr=[];

    try {
        const response=await User.find();
        console.log(typeof response);
        res.json(response);
    }
    catch(err){
        console.log(err);
    }
});

app.post('/postusers',(req,res)=>{
    console.log("Post Request");

    const newBook=new User({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    } 
    )

    newBook.save().then(()=>{
        console.log("New User Registered");
    }).catch((err)=>{
        if(err)throw err;
    })

    res.send("User Registered ....!");
});

app.listen(4547,()=>{
    console.log("App running for Orders Services....!")
})