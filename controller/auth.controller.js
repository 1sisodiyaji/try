const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');
const crypto = require('node:crypto');
const sendOtpEmail = require('../config/sendOtpEmail');
const logger = require('../config/logger');

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    return res.status(400).json({status:false, errors: errors.array() });
  }  
  const { name, email, password, mobilenumber } = req.body; 
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({status:false, message: "Email already exists" });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    const randomTwoDigit = Math.floor(10 + Math.random() * 90);  
    const username = `${name}@${randomTwoDigit}`.toLowerCase();

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        mobilenumber,
        logincount: 0,
        otp,
        otp_expires_at: expiresAt
      }
    });

    if (!newUser) {
      return res.status(500).json({status:false, message: "Server error while creating user",});
    }

    const sendMail = sendOtpEmail(email, otp, expiresAt);
    if (!sendMail) {
      return res.status(500).json({status:false,   message: "Server error while sending OTP"});
    }
    logger.success("User created successfully");
    res.status(201).json({status:true, message: "User created successfully"  });

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ status:false, message: err.message || "Server error" });
  }
};

exports.VerifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(401).json({
      statuscode: 500,
      message: "Please Fill the email and OTP",
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      Evtype: "FAILED",
    });
  }
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        statuscode: 404,
        message: "No user found with the provided email.",
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        Evtype: "FAILED",
      });
    }

    if (user.otp !== otp) {
      return res.status(401).json({
        statuscode: 401,
        message: "Invalid OTP.",
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        Evtype: "FAILED",
      });
    }

    if (new Date(user.otp_expires_at) < new Date()) {
      return res.status(410).json({
        statuscode: 410,
        message: "OTP has expired.",
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        Evtype: "FAILED",
      });
    }

    user.status = 'activated';
    user.otp = null;
    user.otp_expires_at = null;
    await user.save();

    return res.status(200).json({
      statuscode: 200,
      message: "OTP verified successfully. Account activated.",
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      Evtype: "SUCCESS",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statuscode: 500,
      message: "An error occurred while verifying the OTP.",
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      Evtype: "FAILED",
    });
  }

};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      statuscode: 500,
      message: "Please Fill the email and password",
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      Evtype: "FAILED",
    });
  }


  try {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token as a response
    res.json({
      message: "Logged in successfully",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.ResendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      statuscode: 400,
      message: "Please provide an email.",
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      Evtype: "FAILED",
    });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        statuscode: 404,
        message: "No user found with the provided email.",
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        Evtype: "FAILED",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    user.otp = otp;
    user.otp_expires_at = expiresAt;
    await user.save();

    const sendMail = sendOtpEmail(email, otp, expiresAt);
    if (!sendMail) {
      return res.status(500).json({
        statuscode: 500,
        message: "Server error while sending OTP",
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        Evtype: "FAILED",
      });
    }

    return res.status(200).json({
      statuscode: 200,
      message: "OTP has been resent successfully.",
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      Evtype: "SUCCESS",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      statuscode: 500,
      message: "Server error occurred while resending OTP.",
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      Evtype: "FAILED",
    });
  }
};

exports.ResetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    return res.status(401).json({
      statuscode: 401,
      message: "Please Fill the email, password and confirm password",
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      Evtype: "FAILED",
    });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        statuscode: 404,
        message: "No user found with the provided email.",
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        Evtype: "FAILED",
      });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({
        statuscode: 401,
        message: "Password and Confirm Password does not match.",
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        Evtype: "FAILED",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    logger.info("Password reset successfully");
    res.status(200).json({
      statuscode: 200,
      message: "Password reset successfully",
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      Evtype: "SUCCESS",
    });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      statuscode: 500,
      message: "Server error occurred while resetting password.",
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      Evtype: "FAILED",
    });
  }
}