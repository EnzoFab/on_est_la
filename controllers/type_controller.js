const db = require("../models/");
const Type = db.type;


// Callee is the model definition. This allows you to easily map a query to a predefined model


module.exports = {
    create(req, res) {
        let new_type = {
            type_name: req.body.typeName,
            type_description: req.body.typeDescription
        };
        return Type
            .create(new_type)
            .then((type) => res.status(201).send(type))
            .catch((error) => res.status(400).send(error));
    },

    findAll(req, res) {
        return Type.findAll()
            .then((types) => res.status(201).send(types))
            .catch((error) => res.status(400).send(error));
    }
};
