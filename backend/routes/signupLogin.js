const express = require("express")
const router = express.Router()

const {signupStudent , loginStudent} = require("../controllers/AuthStudent")
const {signupAdmin, loginAdmin} = require("../controllers/AuthAdmin")
const {signupSM, loginSM, forgetSM} = require("../controllers/AuthServiceMan")

router.post("/student/signup", signupStudent)
router.post("/student/login", loginStudent)
router.post("/admin/signup", signupAdmin)
router.post("/admin/login", loginAdmin)
router.post("/serviceman/signup", signupSM)
router.post("/serviceman/login", loginSM)
router.post("/serviceman/forget", forgetSM)


module.exports = router

// {
//     "name":"sachin mahor",
//     "rollNo":"59",
//     "hostel":"J",
//     "roomNo":"C514",
//     "phone":"8798654512",
//     "email":"sachin@gmail.com",
//     "password":"123456"
// }