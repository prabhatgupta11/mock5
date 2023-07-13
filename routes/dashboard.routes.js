const express=require('express')
const {DashModel}=require("../model/dashboard.model")

const dashrouter=express.Router()

//signup the user

dashrouter.post("/employees",async(req,res)=>{
    try{
        const payload=req.body
        const user=await DashModel.findOne({email:payload.email})
        if(user)
        {
            res.status(401).send({msg:"please use diffrent email ,this is already in use "})
        }

       
         const newuser=new DashModel(payload);
         await newuser.save();
        res.status(200).send({msg:"user added",user:newuser})

    }catch(err)
    {
        console.log(err.message)
    }
})

module.exports={
    dashrouter
}