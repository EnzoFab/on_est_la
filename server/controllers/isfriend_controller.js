require('dotenv').config();

/* SET UP DB LINK */
const orm = require('../models');
orm.setup(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    logging: false,
    native: false,
});

/* VARIABLE USED */
const Isfriend = orm.model('public.isFriend');
const Sequelize = orm.Sequelize();
const sequelize = orm.sequelize();

module.exports = {
    create(req, res) {
        console.log(req.body)
        return Isfriend
            .create(req.body)
            .then((isfriend) => res.status(201).send(true))
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        console.log(req.body)
        return Isfriend
            .destroy({
                where: {
                    userId: req.body.userId,
                    userIdHaveFriend: req.body.userIdHaveFriend
                }
            })
            .then((place) => res.status(201).send(true))
            .catch((error) => res.status(400).send(error));
    }
};