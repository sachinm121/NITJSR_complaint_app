const mongoose = require("mongoose")

const complaintSchema = new mongoose.Schema({
    complaintType:{
        type:String,
        required:true,
        enum: ["electrician", "civil", "mess"],
    },
    complaint:{
        type:String,
        required:true,
    },
    sid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    status:{
        type:String,
        required:true,
        default:"Pending",
    },
    createAt:{
        type:Date,
        require:true,
        default:Date.now(),
    },
    updateAt:{
        type:Date,
        require:true,
        default:Date.now(),
    },
})

module.exports = mongoose.model("Complaint", complaintSchema)