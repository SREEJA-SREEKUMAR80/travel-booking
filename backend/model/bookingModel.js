const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
       
    },
     email: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    person: {
        type: Number,
        required: true
    },
    amount: {
        type:Number,
        required: true
    },
    status: {
        type: String,
        default:"pending"
        
    }
    


})

const bookings=mongoose.model("bookings", bookingSchema)
module.exports=bookings