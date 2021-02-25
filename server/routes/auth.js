const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protected = require('../middleware/protected');


router.post('/register', authController.register);
router.post('/login', authController.signin);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:resetToken', authController.resetPassword);
router.get('/isAuth', protected, authController.isAuth);
router.get('/logout', protected, authController.logout);


module.exports = router;