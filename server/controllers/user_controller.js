require('dotenv').config();

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

/* Parse parameters labels from database to Sequelize models */
function parseRawQuery (data) {
    let answer = [];
    for (let qUser of data){
        let mUser = {
            userId: qUser.user_id,
            userFirstname: qUser.user_firstname,
            userName: qUser.user_name,
            userDateInscription: qUser.user_date_inscription,
            userPass: qUser.user_pass,
            userMail: qUser.user_mail,
            userToken: qUser.user_token,
            userPhone: qUser.user_phone,
            userPseudo: qUser.user_pseudo,
            userDescription: qUser.user_description,
            userVisibility: qUser.user_visibility,
            userPicture: qUser.user_picture
        };
        answer.push(mUser)
    };

    console.log(answer)
    return answer
}

module.exports = {
    create(req, res) {
        return User
            .create(req.body)
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
                    'SELECT I.user_id FROM public.is_friend I WHERE I.user_id_have_friend = :userId' +
                    ')',
                { replacements: { userId: req.params.userId }, type: sequelize.QueryTypes.SELECT }
            )
            .then((users) =>
                parseRawQuery(users)
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
    }
};