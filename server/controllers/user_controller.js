/* IMPORTS */
require('dotenv').config();
const helper = require('../helpers');
const policy = require('../policy');
var cloudinary = require('cloudinary');
const tokenGenerator = new (require('uuid-token-generator'))(256); // Default is a 128-bit token encoded in base58

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

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
    create (req, res) {
        req.body.userAccountState = 'created';
        let seed = tokenGenerator.generate();
        req.body.userToken = seed
        return User
            .create(req.body)
            .then((user) => {
                let generateLink = `${process.env.SERVER_URL}:${process.env.CLIENT_PORT}/auth/account-validation/${seed}`;
                helper.mailSender.send(req.body.userMail, 'Compte crée',
                    `<h3 style="color: blue">Ton compte est crée narvallo.</h3><br><br>Clique sur ce lien pour activer ton f*cking compte et pouvoir te connecter online.
                     <br><br>
                        <h4><a href="${generateLink}">Valider mon compte comme B2O</a></h4>`,
                    [], function (error, response) {
                        if (error) {
                            res.status(400).send(error)
                        } else {
                            res.status(201).send(user)
                        }
                    });

            })
            .catch((error) => res.status(400).send(error));
    },

    update (req, res) {
        return User
            .update(req.body, {
                where: {
                    userId: req.body.userId
                }
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },

    findAll(req, res) {
        return User
            .findAll()
            .then((users) => res.status(201).send(users))
            .catch((error) => res.status(400).send(error));
    },

    findAllFriends(req, res) {
        return sequelize
            .query('SELECT * FROM public.user WHERE user_id IN (' +
                    'SELECT I.user_id FROM public.is_friend I WHERE I.user_id_have_friend = :userId AND I.isfriend_state = :isfriendState' +
                    ')',
                { replacements: { userId: req.params.userId, isfriendState: 'friend' }, type: sequelize.QueryTypes.SELECT }
            )
            .then((users) =>
                helper.userHelper.parseRawQuery(users)
            )
            .then((users) =>
                res.status(201).send(users)
            )
            .catch((error) => res.status(400).send(error));
    },

    findOne(req, res) {
        return User
            .findById(req.params.userId)
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },

    findFromSearchBar(req, res) {
        const Op = Sequelize.Op;
        let data = req.body.search.split(' ');
        let s1 = data[0];
        let s2 = "";
        let condition;
        if (data.length>1){
            s2 = data[1];
            // If we have two data, we look if the name and the firstName includes these data
            condition = {
                [Op.or]: [
                    {
                        [Op.and]: [
                            {
                                userName: {
                                    [Op.iLike]: s1
                                }
                            },
                            {
                                userFirstname: {
                                    [Op.iLike]: s2+'%'
                                }
                            }
                        ]
                    },
                    {
                        [Op.and]: [
                            {
                                userName: {
                                    [Op.iLike]: s1+'%'
                                }
                            },
                            {
                                userFirstname: {
                                    [Op.iLike]: s2
                                }
                            }
                        ]
                    },
                    {
                        [Op.and]: [
                            {
                                userName: {
                                    [Op.iLike]: s2
                                }
                            },
                            {
                                userFirstname: {
                                    [Op.iLike]: s1+'%'
                                }
                            }
                        ]
                    },
                    {
                        [Op.and]: [
                            {
                                userName: {
                                    [Op.iLike]: s2+'%'
                                }
                            },
                            {
                                userFirstname: {
                                    [Op.iLike]: s1
                                }
                            }
                        ]
                    }
                ]
            };
        } else {
            // If we have only one data, we check which between name, firstName and pseudo includes it
            condition = {
                [Op.or]: [
                    {
                        userName: {
                            [Op.iLike]: s1+'%'
                        }
                    },
                    {
                        userFirstname: {
                            [Op.iLike]: s1+'%'
                        }
                    },
                    {
                        userPseudo: {
                            [Op.iLike]: s1+'%'
                        }
                    }
                ]
            };
        }
        return User
            .findAll({
                limit: 5,
                where: condition
            })
            .then((users) => res.status(201).send({data: users}))
            .catch((error) => res.status(400).send(error));
    },

    findOneFromPseudo(req, res) {
        return User
            .findAll({
                where: {
                    userPseudo: req.params.userPseudo
                }
            })
                .then((user) => res.status(201).send(user))
                .catch((error) => res.status(400).send(error))
    },

    storeProfilePicture (req, res) {
        cloudinary.v2.uploader.upload(req.body.userPicture.dataUrl,
            {
                public_id: "profile_pictures/" + req.body.pictureName,
                transformation: [
                    {width: 100, crop: "scale"},
                    {quality: "auto"}
                ]
            },
            (error, result) => {
            return User
                .update(
                    { userPicture: result.url },
                    { where: { userId: req.body.userId }}
                )
                .then((user) => {
                    console.log(result)
                    res.status(201).send(true)
                })
                .catch((error) => res.status(400).send(error));
        });
    }
};