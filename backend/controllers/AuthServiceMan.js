const SM = require("../models/serviceMan")
const bcrypt = require("bcrypt")

require("dotenv").config()

// signup
exports.signupSM = async (req, res) =>{
    try {
        //fetch data from req.body
        const {name, email, password, phone, role} = req.body;

        // find if the serviceMan exist
        const existingSM = await SM.findOne({email})

        if(existingSM){
            return res.status(400).json({
                success:false,
                message:"ServiceMan already exist"
            })
        }

        //secure password
        let hashedPassword
        try {
            hashedPassword = await bcrypt.hash(password, 10)
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Error in hassing password"
            })
        }

        //Create entry in DB
        const serviceMan = await SM.create({
            name, email, password: hashedPassword, phone, role,
        })

        return res.status(200).json({
            success:true,
            serviceMan,
            message:"Service man Signed up Successfully"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Service man can not be signed up, Please try again later"
        });
    } 
} 

//login
exports.loginSM = async (req, res) => {
    try {
        //fetch data from req.bedy
        const {email, password} = req.body;

        //Validation email and password
        if(!email || ! password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the field carefully",
            })
        }

        //check service man is register
        const serviceman = await SM.findOne({email});
        
        // If serviceMan is not registered
        if(!serviceman){
            return res.status(401).json({
                status:false,
                message:"serviceMan is not registred"
            })
        }

        //check password is correct
        if (await bcrypt.compare(password, serviceman.password)) {
            return res.status(200).json({
                success:true,
                serviceman,
                message:"serviceMan logged in successfully",
            })
        } else {
            //pssword does not matched
            return res.status(403).json({
                success:false,
                message:"Wrong password"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login Failure",
        })
    }
}

exports.forgetSM = async (req, res) => {
    try {
        // fetch data 
        const {email, secret, password,conpassword} = req.body
    
        if(!email || !secret){
            return res.status(400).json({
                success:false,
                message:"Fill all the fields"
            })
        }

        const sm = await SM.findOne({email})

        if(!sm){
            return res.status(401).json({
                success:false,
                message:"Service man does not exist"
            })
        }

        if(sm.secret !== secret){
            return res.status(403).json({
                success:false,
                message:"Secret key is wrong"
            })
        }

        if(password != conpassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm password are wrong"
            })
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10)
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Error in hassing password"
            })
        }

        console.log(hashedPassword)
        const response = await SM.findOneAndUpdate({email:email},{password:hashedPassword})

        
        return res.status(200).json({
            success:true,
            message:"Password has been changed"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Networl issue",
            error:error
        })
    }
}

// {
//     "email":"Sachin@gmail.com",
//     "secret":"1998",
//     "password":"789456",
//     "conpassword":"789456"
// }