const express = require('express');
const router = express.Router();

const typeController = require('../controllers').type;

router.get('/find_all', typeController.findAll);

router.post('/create', typeController.create);
router.post('/update', typeController.update);
router.post('/delete', typeController.delete);

module.exports = router;