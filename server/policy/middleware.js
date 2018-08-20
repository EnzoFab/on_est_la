/* IMPORTS */
require('dotenv').config();
const helper = require('../helpers/index');
const helperJ = require('../helpers/jwt_helper');
const bcrypt = require('bcrypt');
const errorType = require('../policy/errorType');


/* SET UP DB LINK */
const orm = require('../models');
orm.setup(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    logging: false,
    native: false,
});

/* VARIABLE USED */
const User = orm.model('public.user');
const FrequentUser = orm.model('public.frequentUser');
const FrequentDate = orm.model('public.frequentDate');
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
                res.status(201).send(false)
            } else {
                User
                    .findById(decoded.userId)
                    .then((user) => {
                        if (user) {
                            req.body.decoded = user
                            next()
                        } else {
                            res.status(201).send(false)
                        }

                    })
                    .catch((e) =>{
                        res.status(201).send(false)
                    })
            }
        })
    },

    isLogged (error, decode) {
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
    },
    
    findFrenquentedPlacesFromUser (req, res, next) {
        FrequentUser
            .findAll({
                where: {
                    userId: req.body.userId,
                    frequentDateStart: req.body.frequentDateStart
                }
            })
            .then((frequents) => {
                let places = []
                let frequentations = []
                for (let f of frequents) {
                    places.push(f.dataValues.placeId)
                    frequentations.push(f.dataValues)
                }
                req.body.frequentedPlaces = places
                req.body.frequentations = frequentations
                next()
            })
            .catch((error) => next(error))
    },

    generateDate (req, res, next) {
        FrequentDate
            .findAll({
                where: {
                    frequentDateStart: req.body.frequentDateStart
                }
            })
            .then((date) => {
                // We create the date only if she don't exist yet
                if (date.length === 0) {
                    FrequentDate
                        .create({
                            frequentDateStart: req.body.frequentDateStart
                        })
                        .then((newDate) => {
                            req.body.frequentDateStart = newDate.dataValues.frequentDateStart
                            next()
                        })
                        .catch((error) => next(error))
                } else {
                    req.body.frequentDateStart = date[0].dataValues.frequentDateStart
                    next()
                }
            })
            .catch((error) => next(error))
    }
}
