const express = require('express');
const router = express.Router();

/* routes */
router.use('/type', require("./type_router"));
router.use('/user', require("./user_router"));
router.use('/isfriend', require("./isfriend_router"));
router.use('/place', require("./place_router"));
router.use('/auth', require("./auth_router"));
router.use('/frequent_user', require("./frequent_user_router"));

router.get('/', function (req, res) {
    res.send('Hello World!')
})


module.exports = router;