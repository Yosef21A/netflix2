const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/authController');
router.post('/signin/:obfPath/:sessionID', registerUser);
module.exports = router;
