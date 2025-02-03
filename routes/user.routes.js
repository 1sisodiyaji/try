const router = require('express').Router();
const { Register } = require('../controller/auth.controller');

router.post('/register', Register);

module.exports = router;