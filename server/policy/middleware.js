/* IMPORTS */
require('dotenv').config();
const helper = require('../helpers/index');
const helperJ = require('../helpers/jwt_helper');
const bcrypt = require('bcrypt');
const errorType = require('./errorType');


/* SET UP DB LINK */
const orm = require('../models');
orm.setup(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    logging: false,
    native: false,
});

/* VARIABLE USED */
const User = orm.model('public.user');
const Sequelize = orm.Sequelize();
const sequelize = orm.sequelize();

module.exports = {
    verificationAuth(req, res, next) {
        if (helper.userHelper.validMailPassword(req.body)) {
            User
                .findAll({
                    where: {
                        userMail: req.body.userMail
                    }
                })
                .then((user) => {
                    if (user.length === 0) {
                        User
                            .findAll({
                                where: {
                                    userPseudo: req.body.userPseudo
                                }
                            })
                            .then((user) => {
                                if (user.length === 0) {
                                    next()
                                } else {
                                    next(errorType.customError('Pseudo déjà utilisé morray.', null, 403))
                                }
                            })
                    } else {
                        next(errorType.customError('Email déjà utilisé soeurette.', null, 403))
                    }
                })
        } else {
            next(errorType.customError('Email et/ou mot de passe invalides', null, 403))
        }
    },

    verificationLogin(req, res, next) {
        if (helper.userHelper.validMailPassword(req.body)) {
            next();
        } else {
            next(errorType.customError('Email et/ou mot de passe invalides', null, 403))
        }
    },

    hashPassword (req, res, next) {
        bcrypt.hash(req.body.userPass, 10)
            .then((hash) =>  {
                req.body.userPass = hash;
                next()
            });
    },

    comparePassword (req, res, next) {
        let identifiant = req.body.userMail;
        const Op = Sequelize.Op;

        User
            .findAll({
                where: {
                    [Op.or]: [
                        {userMail: identifiant},
                        {userPseudo: identifiant}
                    ]
                }
            })
            .then((user) => {
                if (user.length > 0) {
                    bcrypt.compare(req.body.userPass, user[0].userPass)
                        .then ((answer) => {
                            if (answer) {
                                req.body = user[0]
                                next()
                            } else {
                                next(errorType.customError('Email et/ou mot de passe invalides', null, 403))
                            }
                        })
                } else {
                    next(errorType.customError('Email et/ou mot de passe invalides', null, 403))
                }

            })
    },

    decodeToken (req, res, next) {
        helperJ.jwtDecode(req, function(err, decoded) {
            if (err) {
                res.status(400).send(err);
            } else {
                console.log(decoded.userId)
                User
                    .findById(decoded.userId)
                    .then((user) => {
                        if (user) {
                            user.userPass = undefined
                            res.status(201).send(user)
                        } else {
                            res.status(400).send(errorType.customError('Token invalide', null, 403))
                        }

                    })
                    .catch((e) => res.status(400).send(errorType.customError('Token invalide', null, 403)))
            }
        })
    },

    isLogged (error, decode) {
        console.log('isLogged')
        if (error) {
            next(errorType.FORBIDDEN)
        } else {
            User
                .findById(decode.userId)
                .then((user) => {
                    next(user)
                })
                .catch((error) => next(errorType.customError('Token invalide', null, 403)));
        }
    }
}
