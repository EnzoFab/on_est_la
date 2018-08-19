/* IMPORTS */
require('dotenv').config();
const helperJ = require('../helpers/jwt_helper');
const policy = require('../policy');
const userController = require('./user_controller')

/* SET UP DB LINK */
const orm = require('../models');
orm.setup(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    logging: false,
    native: false,
});

/* VARIABLE USED */
const Type = orm.model('public.type');
const sequelize = orm.sequelize();

module.exports = {
    logIn (req, res) {
        req.body.userPass = undefined;
        let token = helperJ.jwtSignMember(req.body);
        res.status(201).send({
            data: req.body,
            token: token
        })
    }
};
