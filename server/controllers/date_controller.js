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
const FrequentDate = orm.model('public.frequentDate');
const Sequelize = orm.Sequelize();
const sequelize = orm.sequelize();

module.exports = {
};