const express = require("express")
const router = express.Router();

const {createComplaint, getStudentComplaints, getAdminComplaints, getSmComplaints} = require("../controllers/ComplaintHan")

router.post("/create/complaint/:id", createComplaint)
router.get("/get/student/complaints/:id", getStudentComplaints)
router.get("/get/admin/complaints", getAdminComplaints)
router.post("/get/serviceman/complaints", getSmComplaints)

module.exports = router

// {
//     "sid":"651921bf82f73e0ca66de5c5"
// }

// http://localhost:4000/api/v1/get/complaint