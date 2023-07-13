const express=require('express')
const {UserModel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userrouter=express.Router()

//signup the user

userrouter.post("/signup",async(req,res)=>{
    try{
        const payload=req.body
        const user=await UserModel.findOne({email:payload.email})
        if(user)
        {
            res.status(401).send({msg:"Already register Please login"})
        }

         const haspass= await bcrypt.hashSync(payload.password,6)
         const confirmhaspass= await bcrypt.hashSync(payload.confirmpass,6)
         payload.password=haspass
         payload.confirmpass=confirmhaspass

         const newuser=new UserModel(payload);
         await newuser.save();
        res.status(200).send({msg:"user register success",user:newuser})

    }catch(err)
    {
        console.log(err.message)
    }
})

//user login
userrouter.post("/login",async(req,res)=>{
    try{
        const payload=req.body;
        const user=await UserModel.findOne({email:payload.email})
        if(!user){
            res.status(401).send({msg:"Please register"})
        }
         const compass=await bcrypt.compareSync(payload.password,user.password)
         console.log(compass)
         if(compass)
         {
            const token=await jwt.sign({email:user.email,userid:user._id},"masai")
            res.status(200).send({"msg":"login success","token":token})
         }
         else{
            res.status(200).send({"msg":"Wrong password"})
         }

    }catch(err)
    {
        console.log(err.message)
    }
})
module.exports={
    userrouter
}