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
const Isfriend = orm.model('public.isFriend');
const Sequelize = orm.Sequelize();
const sequelize = orm.sequelize();

module.exports = {
    create(req, res) {
        return Isfriend
            .create(req.body)
            .then((isfriend) => res.status(201).send(isfriend))
            .catch((error) => res.status(400).send(error));
    },

    findAllInvitations(req, res) {
        return sequelize
            .query('SELECT * FROM public.user WHERE user_id IN (' +
                'SELECT I.user_id_have_friend FROM public.is_friend I WHERE I.user_id = :userId AND I.isfriend_state = :isfriendState' +
                ')',
                { replacements: { userId: req.params.userId, isfriendState: 'waiting' }, type: sequelize.QueryTypes.SELECT }
            )
            .then((users) =>
                helper.userHelper.parseRawQuery(users)
            )
            .then((users) =>
                res.status(201).send(users)
            )
            .catch((error) => res.status(400).send(error));
    },

    findOneInvitation (req, res) {
        console.log(req.body)
        return Isfriend
            .findAll({
                where: {
                    userId: req.body.userId,
                    userIdHaveFriend: req.body.userIdHaveFriend
                }
            })
            .then((isfriend) => res.status(201).send(isfriend))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Isfriend
            .update({
                isfriendState: req.body.isfriendState
            }, {
                where: {
                    userId: req.body.userId,
                    userIdHaveFriend: req.body.userIdHaveFriend
                }
            })
            .then((isfriend) => res.status(201).send(true))
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
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