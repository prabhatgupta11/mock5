const express=require("express")
const {connection}=require("./db")
const { userrouter } = require("./routes/user.routes")
const { dashrouter } = require("./routes/dashboard.routes")
var cors = require('cors')
require("dotenv").config()
const app=express()
app.use(express.json())

app.use("/user",userrouter)
app.use("/emp",dashrouter)

app.get("/",(req,res)=>{
    res.send({"msg":"working"})
})

app.listen(process.env.port,async(req,res)=>{
    try{
       await connection;
       console.log("database is connected")
    }catch(err)
    {
        console.log(err.message)
    }
    console.log(`server is running to port ${process.env.port}`)
})