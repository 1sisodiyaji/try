const express = require("express");
const router = express.Router();
const {signup, VerifyOtp, signin, ResendOtp, ResetPassword, Logout } = require('../controller/auth.controller');
const { userValidate } = require('../validators/userValidator');

router.post('/register',userValidate, signup);
router.post("/verify-otp",VerifyOtp);
router.post("/login",signin);
router.post("/send-otp", ResendOtp);
router.post("/reset-password", ResetPassword);
router.post("/logout", Logout);
module.exports = router;