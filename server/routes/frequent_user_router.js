const express = require('express');
const router = express.Router();

const frequentUserController = require('../controllers').frequentUser;
const middleware = require('../policy').middleware;

router.get('/find_all_from_user/:userId', frequentUserController.findAllFromUser);
router.get('/find_all_for_calendar/:userId', middleware.findAllFriends, middleware.findFrequentForCalendar, middleware.sortEventsForCalendar, frequentUserController.sendEventsForCalendar);
router.get('/find_all_frequent_from_user/:userId', middleware.findUserForCalendar, middleware.findFrequentForCalendar, middleware.sortEventsForCalendar, frequentUserController.sendEventsForCalendar);

router.post('/create', middleware.generateDate, frequentUserController.create);
router.post('/delete', frequentUserController.delete);

module.exports = router;