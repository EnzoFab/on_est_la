require('dotenv').config();

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
    create(req, res) {
        return Type
            .create(req.body)
            .then((type) => res.status(201).send(type))
            .catch((error) => res.status(400).send(error));
    },

    findAll(req, res) {
        console.log('no me')
        return sequelize.query('SELECT * FROM type', { model: Type })
            .then((types) => res.status(201).send(types))
            .catch((error) => res.status(400).send(error));
    }
};
