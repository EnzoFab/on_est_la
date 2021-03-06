/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'participate.js' file in 'definition-files-custom' directory located in this file's parent directory.
2. Copy the code below and paste it into 'participate.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model/index.js'),
    model   = require('./participate.js'),
    util    = require('../utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("group").onDelete = 'CASCADE'; 
util.getAttribute("groupId").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "public.participate",
    options: {
        tableName: "participate",
        schema: "public",
        timestamps: false
    },
    attributes: {
        "groupId": {
            type: Seq.INTEGER,
            field: "group_id",
            primaryKey: true,
            allowNull: false,
            unique: "participate_pk",
            references: "public.group",
            referencesKey: "group_id"
        },
        "userId": {
            type: Seq.INTEGER,
            field: "user_id",
            primaryKey: true,
            allowNull: false,
            unique: "participate_pk",
            references: "public.user",
            referencesKey: "user_id"
        }
    },
    relations: [{
        type: "belongsTo",
        model: "public.group",
        schema: "public",
        table: "group",
        source: "generator",
        details: {
            as: "group",
            foreignKey: "group_id",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "belongsTo",
        model: "public.user",
        schema: "public",
        table: "user",
        source: "generator",
        details: {
            as: "user",
            foreignKey: "user_id",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};