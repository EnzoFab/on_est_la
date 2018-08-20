const user = require('./user_controller');
const type = require('./type_controller');
const isFriend = require('./isfriend_controller');
const place = require('./place_controller');
const auth = require('./auth_controller');
const frequentUser = require('./frequent_user_controller');

module.exports = {
    user,
    type,
    isFriend,
    place,
    auth,
    frequentUser
};