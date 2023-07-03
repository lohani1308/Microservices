const express=require('express');
const mongoose= require('mongoose');
const Model=require('./models/booksSch');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/bookStore");

app.get('/',(req,res)=>{
    res.send("This is our main endpoint");
});

app.post("/customer",(req,res)=>{
    
    const newBook=new Model({
        title:req.body.title,
        author:req.body.author,
        numberPage:req.body.numberPage,
        publisher:req.body.publisher
    }
    )

    newBook.save().then(()=>{
        console.log("New Book Created");
    }).catch((err)=>{
        if(err)throw err;
    })

    res.send("A new book Created");
});

app.listen(4546,()=>{
    console.log("App running for Customers Services....!") 
})