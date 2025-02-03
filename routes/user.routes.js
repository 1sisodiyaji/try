const express = require("express");
const router = express.Router();
const {signup } = require('../controller/auth.controller');
const { userValidate } = require('../validators/userValidator');

router.post('/register',userValidate, signup);

module.exports = router;