require("dotenv").config()
const express=require('express')


const travelServer=express()
const cors=require("cors")
const Route=require('./routes/Route')
require("./config/db")


travelServer.use(cors())
travelServer.use(express.json())
travelServer.use(Route)



PORT=4000 || process.env.PORT

travelServer.get('/',(req,res)=>{
    res.status(200).send( `<h1>Server Started</h1>` )
})

travelServer.listen(PORT,()=>{
    console.log(`Server running successfully at port ${PORT}`);
    
})

