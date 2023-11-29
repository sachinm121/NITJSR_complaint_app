const express = require("express");
const cors = require("cors");
const app = express();

//load env
require("dotenv").config();
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(cors());


//Database connect
require("./config/connectDB").connect();

//router import and mount
const signupLoginRoute = require("./routes/signupLogin")
app.use("/api/v1", signupLoginRoute)

const complaintRoute = require("./routes/complaintRoute")
app.use("/api/v1", complaintRoute)

const userDetail = require("./routes/userDetails")
app.use("/api/v1", userDetail)

app.listen(PORT, (err) => {
    if(err) throw err
    else{
        console.log(`Server is listing on port ${PORT}`)
    }
})

//default route
app.get("/", (req,res) =>{
    res.send(`<h1>This is home page</h1>`)
})