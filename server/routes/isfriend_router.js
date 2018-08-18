const express = require('express');
const router = express.Router();

const isfriendController = require('../controllers').isFriend;

router.get('/find_all_invitations/:userId', isfriendController.findAllInvitations);

router.post('/create', isfriendController.create);
router.post('/update', isfriendController.update);
router.post('/delete', isfriendController.delete);
router.post('/find_one_invitation', isfriendController.findOneInvitation);

module.exports = router;