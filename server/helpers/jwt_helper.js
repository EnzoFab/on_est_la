const jwt = require('jsonwebtoken');
const errorType = require('../policy/errorType');

module.exports = {
    // creer un token pour un utilisateur
    jwtSignMember: function(member) {
        // Durée du token
        const ON_WEEK = 60 * 60 * 24 * 7;
        return jwt.sign(member.dataValues, process.env.JWT_SECRET, {expiresIn: ON_WEEK})
    },
    jwtCheckToken: function (req) {
        return (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') // il a un bearer
            || (req.query && req.query.token) // ou un token
    },
    jwtDecode: function (req, callback) {
        if (this.jwtCheckToken(req)) {
            let token = req.headers.authorization.split(' ')[1]
                || req.headers['x-access-token'] || req.body.token || req.params.token ;
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                console.log('ouais')
                callback(err, decoded)
            })
        } else {
            console.log('non')

            callback(errorType.customError('Token invalide', null, 403))
        }
    }
}