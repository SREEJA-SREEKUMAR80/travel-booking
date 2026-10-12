const mongoose = require("mongoose")

const packageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    highlights: {
        type: [String],
        required: true
    },

    
     imageurl:{
      type:String,
      required:true  
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
    


})

const packages=mongoose.model("packages", packageSchema)
module.exports=packages