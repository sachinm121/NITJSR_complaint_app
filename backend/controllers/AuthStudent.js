const Student = require("../models/student")
const bcrypt = require("bcrypt")

require("dotenv").config()

// signup
exports.signupStudent = async (req, res) =>{
    try {
        //fetch data from req.body
        const {name, rollNo, hostel, roomNo, phone, email, password, secret} = req.body;

        // find if the student exist
        const existingStudent = await Student.findOne({email})

        if(existingStudent){
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
        const response = await Student.create({
            name, rollNo, hostel, roomNo, phone, email, password: hashedPassword, secret,
        })

        return res.status(200).json({
            success:true,
            message:"Student Signed up Successfull"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Student can not be signed up, Please try again later"
        });
    } 
} 

//login
exports.loginStudent = async (req, res) => {
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

        //check student is register
        const student = await Student.findOne({email});

        // If student is not registered
        if(!student){
            return res.status(401).json({
                status:false,
                message:"Student is not registred"
            })
        }

        //
        if (await bcrypt.compare(password, student.password)) {
            return res.status(200).json({
                student,
                success:true,
                message:"Student logged in successfully",
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