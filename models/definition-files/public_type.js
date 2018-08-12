/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this models:
1. Create 'type.js' file in 'definition-files-custom' directory located in this file's parent directory.
2. Copy the code below and paste it into 'type.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('models\index.js'),
    models   = require('./type.js'),
    util    = require('../utils.js')(models),
    Seq     = orm.Sequelize();

module.exports = models;

// Some utility methods:
util.getRelation("belongTypeFks").onDelete = 'CASCADE'; 
util.getAttribute("typeId").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "public.type",
    options: {
        tableName: "type",
        schema: "public",
        timestamps: false
    },
    attributes: {
        "typeId": {
            type: Seq.INTEGER,
            field: "type_id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "type_pk"
        },
        "typeName": {
            type: Seq.STRING(50),
            field: "type_name",
            allowNull: false
        },
        "typeDescription": {
            type: Seq.STRING(250),
            field: "type_description",
            allowNull: false
        }
    },
    relations: [{
        type: "hasMany",
        model: "public.belong",
        schema: "public",
        table: "belong",
        source: "generator",
        details: {
            as: "belongTypeFks",
            foreignKey: "type_id",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "belongsToMany",
        model: "public.place",
        schema: "public",
        table: "place",
        source: "generator",
        details: {
            as: "belongTypeFkPlaces",
            foreignKey: "type_id",
            otherKey: "place_id",
            through: "belong",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};