const express = require('express');
const router = express.Router();

const placeController = require('../controllers').place;
const middleware = require('../policy').middleware;

router.get('/find_all', placeController.findAll);
router.post('/find_all_for_user', middleware.findFrequentedPlacesFromUser, placeController.findAllForUser);


router.post('/create', placeController.create);
router.post('/delete/:placeId', placeController.delete);

router.put('/update', placeController.update);

module.exports = router;