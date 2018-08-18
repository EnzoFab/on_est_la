const user = require('./user_controller');
const type = require('./type_controller');
const isFriend = require('./isfriend_controller');
const place = require('./place_controller');
const auth = require('./auth_controller');

module.exports = {
    user,
    type,
    isFriend,
    place,
    auth
};