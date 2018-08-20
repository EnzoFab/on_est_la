/* IMPORTS */
require('dotenv').config();
const helper = require('../helpers');

/* SET UP DB LINK */
const orm = require('../models');
orm.setup(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    logging: false,
    native: false,
});

/* VARIABLE USED */
const FrequentUser = orm.model('public.frequentUser');
const Sequelize = orm.Sequelize();
const sequelize = orm.sequelize();

module.exports = {
    create(req, res) {
        return FrequentUser
            .create(req.body)
            .then((frequentUser) => res.status(201).send(frequentUser))
            .catch((error) => res.status(400).send(error));
    },
    findAllFromUser(req, res) {
        return FrequentUser
            .findAll({
                where: {
                    userId: req.params.userId
                }
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error))
    },
    sendEventsForCalendar (req, res) {
        res.status(201).send(req.body.sortedEvents)
    },
    delete(req, res) {
        console.log(req.body)
        return FrequentUser
            .destroy({
                where: req.body
            })
            .then((res) => res.status(201).send(true))
            .catch((error) => res.status(400).send(error));
    }
};