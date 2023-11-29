const mongoose = require("mongoose")

const serviceManSchema = new mongoose.Schema ({
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
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    secret:{
        type:String,
        required:true,
        default: "@serviceman"
    },
    role:{
        type:String,
        required:true,
        enum: ["mess", "civil", "electrician"],
    }
})

module.exports = mongoose.model("ServiceMan", serviceManSchema)

// {
//     "name": "ramu", 
//     "email": "ramu@gmail.com", 
//     "password": "123456", 
//     "phone": "8877968545", 
//     "secret": "2000", 
//     "role": "electrician"
// }