const express = require("express")
const router = express.Router()

const { getStudentDetails } = require("../controllers/GetUserDetails")



router.get("/get/student/details", getStudentDetails)

module.exports = router