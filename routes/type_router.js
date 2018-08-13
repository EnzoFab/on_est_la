const express = require('express');
const router = express.Router();

const typeController = require('../controllers').type;

router.post('/create', typeController.create);
router.get('/find_all', typeController.findAll);

module.exports = router;