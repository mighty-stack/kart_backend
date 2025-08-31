const express = require("express")
const router = express.Router()
const userModel = require("../Models/user.model")
const { fetchAboutPage, displayIndexPage, displaySignupPage, getDashbordPage, registerUser, signinUser, Dashboard} = require("../controller/user.controller")

router.get("/about",fetchAboutPage)
router.get("/index",displayIndexPage )
router.get("/signup",displaySignupPage )
router.get("/dashboard",getDashbordPage)
router.post("/register", registerUser)
router.post("/signin", signinUser)
router.get("/dashboard", Dashboard)

module.exports = router