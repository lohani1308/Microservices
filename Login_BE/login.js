module.exports=async(req,res)=>{
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
}