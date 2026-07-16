const express = require('express');
const router = express.Router();
const auth = require('../middleware/Auth');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
router.post('/register',authController.register);
router.post('/login',authController.login);
module.exports=router;
