const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');
const crypto = require('node:crypto');
const sendOtpEmail = require('../config/sendOtpEmail');
const logger = require('../config/logger');
const jwt = require('jsonwebtoken');


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
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

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
    return res.status(401).json({ status: false, message: "Please Fill the email and OTP" });
  }

  try {
     const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({status: false, message: "No user found with the provided email."});
    }

    if (user.otp !== otp) {
      return res.status(401).json({status: false, message: "Invalid OTP."});
    }

    const now = new Date().toISOString();
    if (new Date(user.otp_expires_at) < new Date(now)) {
      return res.status(410).json({ status: false, message: "OTP has expired." });
    }

    await prisma.user.update({
      where: { email },
      data: {
        status: 'activated',
        otp: null,
        otp_expires_at: null,
      },
    });

    return res.status(200).json({status: true,message: "OTP verified successfully. Account activated."});

  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({status: false,message: "An error occurred while verifying the OTP."});
  }
};

exports.signin = async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({status: false, message: "Please Fill the email and password"});
  }

  try {

    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1m' });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

   logger.success("Login Successfully");
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
    logger.error(err.message);
    return res.status(500).json({status: false,message: "An error occurred while Signing."});
  }
};

exports.ResendOtp = async (req, res) => {

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({status: false , message: "Please provide an email."});
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({status: false,  message: "No user found with the provided email."});
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otp_expires_at: expiresAt,
      },
    });


    const sendMail = sendOtpEmail(email, otp, expiresAt);
    if (!sendMail) {
      return res.status(500).json({status: false, message: "Server error while sending OTP" });
    }

    return res.status(200).json({status: true,  message: "OTP has been resent successfully." });

  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({status:false, message: "Server error occurred while resending OTP."   });
  }
};

exports.ResetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    return res.status(401).json({status:false, message: "Please Fill the email, password and confirm password" });
  }

  try {
 const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({status:false,  message: "No user found with the provided email." });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({status:false,  message: "Password and Confirm Password does not match."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    logger.success("Password reset successfully");

    res.status(200).json({status: true, message: "Password reset successfully"});

  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: false, message: "Server error occurred while resetting password." });
  }
}

exports.Logout = async (req,res) => {
  console.log('Auth Token Cookie before clearing:', req.cookies.auth_token); 
  
  logger.info(`User ${req.user.email || 'unknown'} logged out at ${new Date().toISOString()}`);
  try{
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({status: true, message: "Logged out successfully"});
}catch(error){
  logger.error(error.message);
  return res.status(500).json({ status: false, message: "Server error occurred while logging out." });
}
}