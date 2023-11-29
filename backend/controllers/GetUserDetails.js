const Student = require('../models/student')

exports.getStudentDetails = async (req, res) => {
    try {
        //fetch data
        const rollNo = req.query.rollNo
        // console.log(res)

        const student = await Student.findOne({rollNo})

        if(!student){
          return res.status(404).json({
                success:false,
                message:"Not found"
            })
        }
        

        res.status(200).json({
            success:true,
            student,
            message: "student data found"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"server error"
        }) 
    }
}