const express = require('express');
const router = express.Router();

const frequentUserController = require('../controllers').frequentUser;
const middleware = require('../policy').middleware;

router.get('/find_all_from_user/:userId', frequentUserController.findAllFromUser);

router.post('/create', middleware.generateDate, frequentUserController.create);
router.post('/delete', frequentUserController.delete);

module.exports = router;