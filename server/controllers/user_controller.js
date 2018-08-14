require('dotenv').config();

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
    create(req, res) {
        return User
            .create(req.body)
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },

    findAll(req, res) {
        return User
            .findAll()
            .then((users) => res.status(201).send(users))
            .catch((error) => res.status(400).send(error));
    }
};