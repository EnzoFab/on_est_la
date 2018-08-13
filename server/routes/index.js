const express = require('express');
const router = express.Router();

/* routes */
router.use('/type', require("./type_router"));

module.exports = router;