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
const Place = orm.model('public.place');
const FrequentUser = orm.model('public.frequentUser');

const sequelize = orm.sequelize();

module.exports = {
    create(req, res) {
        return Place
            .create(req.body)
            .then((place) => res.status(201).send(place))
            .catch((error) => res.status(400).send(error));
    },

    findAll(req, res) {
        return Place
            .findAll()
            .then((places) =>{
                res.status(201).send(places)
            })
            .catch((error) => res.status(400).send(error));
    },

    findAllPlacesForUser(req, res) {
        return Place
            .findAll()
            .then((places) =>{
                let i = 0
                for (let p of places) {
                    FrequentUser.findAll({
                        where: {
                            placeId: p.placeId,
                            frequentDateStart: req.body.frequentDateStart
                        }
                    })
                        .then((result) => {
                            i++
                            p.dataValues.nbParticipants = result.length
                            if (i === places.length) {
                                console.log(places[0])
                                let sorted = helper.placeHelper.computeMaterialIcon(req, places)
                                res.status(201).send(sorted)
                            }
                        })
                        .catch((error) => res.status(400).send(error));
                }
            })
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
        return Place
            .destroy({
                where: {
                    placeId: req.params.placeId
                }
            })
            .then((res) => res.status(201).send(true))
            .catch((error) => res.status(400).send(error));
    }
};