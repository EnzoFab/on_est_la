const express = require('express');
const router = express.Router();

const isfriendController = require('../controllers').isFriend;

router.post('/create', isfriendController.create);
router.post('/delete', isfriendController.delete);

module.exports = router;