const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User=require('./Models/userSchema');
const cors=require("cors");
const bodyParser=require('body-parser')
dotenv.config();

const app=express();
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

 const secret_key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEphbiAxOCAyMDIxIDE2OjM2OjU3IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBU';
 
app.use(cors(corsOptions))
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/UsersData");

app.post('/api/register',async (req,res)=>{
    try{
        const exisitingUser=await User.findOne({ email: req.body.email });
        if(exisitingUser){
            return res.status(400).json({
                message:'Email already exists'
            })
        }

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        // Create a new user
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
        });
        
        user.save().then(()=>{
            console.log("New User Added");
        }).catch((err)=>{
            if(err)throw err;
        })

        res.json({ message: 'Registration successful' });
    }

    catch(err){
        console.error('Failed to register user', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post('/api/login',async(req,res)=>{
    try{
        const user=await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(400).json({
                message:"User Not Found"
            })
        }

        const validatePassword=await bcrypt.compare(req.body.password,user.password);
        if (!validatePassword) {
            return res.status(400).json({ message: 'Incorrect Password' });
          }

        const token=jwt.sign({_id: user._id}, secret_key);
        res.json({token});
    }
    catch (error) {
        console.error('Failed to login user', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

const authenticateToke=(req,res,next)=>{
    const token=req.headers['authorization'].split(" ")[1];
    //token returned value Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE0NDg5Mzk4YWJlMjA2YjVmZWU0YzgiLCJpYXQiOjE2ODg1NzQ5NDl9.DNh2p04_B4sSbJLfKZaE0TO4Ro7_5pFxJqexK2MlDa0 
    
    console.log(token);

    if(!token){
        return res.status(401).json({ error:"No Token provided" });
    }

    jwt.verify(token,secret_key,(err,user)=>{
        if(err){
            return res.status(403).json( { error: "Invalid token" } );
        }

        console.log(user);
        req.user=user;
        next();
    })
}


app.get('/api/protected',authenticateToke,(req,res)=>{
    res.json( { message: "You are authenticated:", user:req.user } );
})

app.listen(4578,()=>{
    console.log("Server running at 4578");
})


