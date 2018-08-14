const express = require('express');
const router = express.Router();

const userController = require('../controllers').user;

router.post('/create', userController.create);
router.get('/find_all', userController.findAll);

module.exports = router;
