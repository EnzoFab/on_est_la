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

    findLogged (req, res) {
        helperJ.jwtDecode(req, function(err, decoded) {
            if (err) {
                res.status(400).send(err);
            } else {
                User
                    .findById(decoded.userId)
                    .then((user) => {
                        if (user) {
                            user.userPass = undefined
                            res.status(201).send(user)
                        } else {
                            res.status(400).send(policy.errorType.customError('Token invalide', null, 403))
                        }

                    })
                    .catch((e) => res.status(400).send(policy.errorType.customError('Token invalide', null, 403)))
            }
        })
    }
};
