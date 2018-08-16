const express = require('express');
const router = express.Router();

const placeController = require('../controllers').place;

router.get('/find_all', placeController.findAll);

router.post('/create', placeController.create);
router.post('/delete/:placeId', placeController.delete);

router.put('/update', placeController.update);

module.exports = router;