require('dotenv').config();

/* SET UP DB LINK */
const orm = require('../models');
orm.setup(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    logging: false,
    native: false,
});

/* VARIABLE USED */
const Place = orm.model('public.place');
const sequelize = orm.sequelize();

module.exports = {
    create(req, res) {
        console.log(req.body)
        return Place
            .create(req.body)
            .then((place) => res.status(201).send(place))
            .catch((error) => res.status(400).send(error));
    },

    findAll(req, res) {
        return Place
            .findAll()
            .then((places) => res.status(201).send(places))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Place
            .update(req.body, {
                where: {
                    placeId: req.body.placeId
                }
            })
            .then((place) => res.status(201).send(place))
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        console.log(req.body)
        return Place
            .destroy({
                where: {
                    placeId: req.params.placeId
                }
            })
            .then((place) => res.status(201).send(true))
            .catch((error) => res.status(400).send(error));
    }
};