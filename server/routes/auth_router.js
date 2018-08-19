const express = require('express');
const router = express.Router();

const middleware = require('../policy').middleware;
const userController = require('../controllers').user;
const authController = require('../controllers').auth;

router.post('/sign_up', middleware.verificationAuth, middleware.hashPassword, userController.create);
router.post('/log_in', middleware.verificationLogin, middleware.comparePassword, authController.logIn);
router.post('/is_logged', middleware.decodeToken);
router.post('/find_logged', authController.findLogged);

module.exports = router;