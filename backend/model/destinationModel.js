const mongoose = require("mongoose")

const DestinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
   
    besttime: {
        type: String,
        required: true
    },
    
  imageurl:{
      type:String,
      required:true  
    },
    tag:{
        type:[String],
        required:true
    },
    
    description: {
        type: String,
        required: true
    }
})

const destinations=mongoose.model("destinations", DestinationSchema)
module.exports=destinations




