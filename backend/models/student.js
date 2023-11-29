const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    rollNo:{
        type:String,
        required:true,
    },
    hostel:{
        type:String,
        required:true,
    },
    roomNo:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    secret:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"student"
    }
})

module.exports = mongoose.model("Student", studentSchema)