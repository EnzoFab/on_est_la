const express = require('express');
const router = express.Router();

/* routes */
router.use('/type', require("./type_router"));
router.use('/user', require("./user_router"));
router.get('/', function (req, res) {
    res.send('Hello World!')
})


module.exports = router;