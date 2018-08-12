var express = require('express');
var router = express.Router();

const typeController = require('../controllers').type;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/type/create', typeController.create);

module.exports = router;
