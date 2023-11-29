const Complaint = require("../models/complaints")
const Student = require("../models/student")

exports.createComplaint = async (req, res) => {
    try {
        //fetch data fro req.body
        console.log("This is complaints route!");
        const {complaintType, complaint} = req.body
        const sid = req.params.id
        // console.log(req.body)
        console.log(sid);

        // create complain
        const response = await Complaint.create({complaintType, complaint, sid})
        // const Sdata = await Student.findById(sid);

        return res.status(200).json({
            success:true,
            response,
            message:"Complaint has been done"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error Occuered"
        })
    }
}

exports.getStudentComplaints = async (req, res) => {
    try {
        // fetch data 
        const sid = req.params.id

        const complaints = await Complaint.find({sid})

        if(!complaints){
            return res.status(404).json({
                success:false,
                message:"Complaints not found"
            })
        }

        const students = await Promise.all(
            complaints.map(item => {
                return Student.findById(item.sid);
            })
        )

        complaints.forEach((item, ind) => {
           item.sid = students[ind];
        })

        const student = await Student.findById(sid)
        student.password = undefined

        console.log(student);

        return res.status(200).json({
            success:true,
            complaints,
            student,
            message:"Complaint got successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server error",
        })
    }
}

exports.getAdminComplaints = async(req, res) => {
    try {
        // fetch all complaints 
        const complaints = await Complaint.find({});

        const students = await Promise.all(
            complaints.map(item => {
                return Student.findById(item.sid);
            })
        )

        complaints.forEach((item, ind) => {
            item.sid = students[ind];
         })
        //responce
        return res.status(200).json({
            success:true,
            complaints,
            message:"All complaints fetched"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}

exports.getSmComplaints = async(req, res) => {
    try {
        // fetch service man data 
        const complaintType = req.body.userRole
        console.log(req.query);

        const complaints = await Complaint.find({complaintType:req.query.role})

        if(!complaints){
            return res.status(404).json({
                success:false,
                message:"Complaints not found"
            })
        }
        // const student = await Student.findById(complaints[0].sid);
        
        const students = await Promise.all(
            complaints.map(item => {
                return Student.findById(item.sid);
            })
        )

        complaints.forEach((item, ind) => {
           item.sid = students[ind];
        })

        return res.status(200).json({
            success:true,
            complaints,
            message:"All complants fetched"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}