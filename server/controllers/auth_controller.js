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
const User = orm.model('public.user');
const sequelize = orm.sequelize();

module.exports = {
    logIn (req, res) {
        req.body.userPass = undefined;
        let token = helperJ.jwtSignMember(req.body);
        res.status(201).send({
            data: req.body,
            token: token
        })
    },

    isLoggeg (req, res) {
        res.status(201).send(true)
    },

    findLogged (req, res) {
        req.body.decoded.userPass = undefined
        res.status(201).send(req.decoded)
    }
};
