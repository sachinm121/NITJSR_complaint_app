const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    secret:{
        type:String,
        required:true,
        default:"@admin"
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"admin"
    }
})

module.exports = mongoose.model("Admin", adminSchema)