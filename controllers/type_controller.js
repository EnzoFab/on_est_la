var orm = require('../models');
orm.setup('onestla', 'postgres', 'postgres', {
    host: '127.0.0.1',
    logging: false,
    native: false,
});
var Type = orm.model('public.type');

//const Type = require('../models').model('public_type');

module.exports = {
    create(req, res) {
        let new_type = {
            type_name: req.body.typeName,
            type_description: req.body.typeDescription
        };
        console.log(new_type);
        return Type
            .create(new_type)
            .then((type) => res.status(201).send(type))
            .catch((error) => res.status(400).send(error));
    },
};
