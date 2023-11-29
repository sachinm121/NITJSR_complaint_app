const Admin = require("../models/admin")
const bcrypt = require("bcrypt")

require("dotenv").config()

// signup
exports.signupAdmin = async (req, res) =>{
    try {
        //fetch data from req.body
        const {name, email, password, role} = req.body;

        // find if the admin exist
        const existingAdmin = await Admin.findOne({email})

        if(existingAdmin){
            return res.status(400).json({
                success:false,
                message:"user already exist"
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
        const admin = await Admin.create({
            name, email, password: hashedPassword, role,
        })

        return res.status(200).json({
            success:true,
            admin,
            message:"Admin Signed up Successfull"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Admin can not be signed up, Please try again later"
        });
    } 
} 

//login
exports.loginAdmin = async (req, res) => {
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

        //check admin is register
        const admin = await Admin.findOne({email});

        // If admin is not registered
        if(!admin){
            return res.status(401).json({
                status:false,
                message:"Admin is not registred"
            })
        }

        //check password is correct
        if (await bcrypt.compare(password, admin.password)) {
            return res.status(200).json({
                success:true,
                admin,
                message:"Admin logged in successfully",
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