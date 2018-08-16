const express = require('express');
const router = express.Router();

const isfriendController = require('../controllers').isfriend;

router.post('/create', isfriendController.create);

module.exports = router;