const express = require('express');
const router = express.Router();

const userController = require('../controllers').user;

router.get('/find_all', userController.findAll);
router.get('/find_all_friends/:userId', userController.findAllFriends)
router.get('/find_one/:userId', userController.findOne);
router.get('/find_one_from_pseudo/:userPseudo', userController.findOneFromPseudo);

router.post('/create', userController.create);
router.post('/update', userController.update);
router.post('/update_picture', userController.storeProfilePicture);
router.post('/find_all_from_search_bar', userController.findFromSearchBar);

module.exports = router;
