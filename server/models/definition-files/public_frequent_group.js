/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'frequent_group.js' file in 'definition-files-custom' directory located in this file's parent directory.
2. Copy the code below and paste it into 'frequent_group.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model/index.js'),
    model   = require('./frequent_group.js'),
    util    = require('../utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("relatedFrequentDateStart").onDelete = 'CASCADE'; 
util.getAttribute("placeId").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "public.frequentGroup",
    options: {
        tableName: "frequent_group",
        schema: "public",
        timestamps: false
    },
    attributes: {
        "placeId": {
            type: Seq.INTEGER,
            field: "place_id",
            primaryKey: true,
            allowNull: false,
            unique: "frequent_group_pk",
            references: "public.place",
            referencesKey: "place_id"
        },
        "groupId": {
            type: Seq.INTEGER,
            field: "group_id",
            primaryKey: true,
            allowNull: false,
            unique: "frequent_group_pk",
            references: "public.group",
            referencesKey: "group_id"
        },
        "frequentDateStart": {
            type: Seq.DATEONLY,
            field: "frequent_date_start",
            primaryKey: true,
            allowNull: false,
            unique: "frequent_group_pk",
            references: "public.frequentDate",
            referencesKey: "frequent_date_start"
        },
        "frequentGroupDateEnd": {
            type: Seq.DATEONLY,
            field: "frequent_group_date_end",
            allowNull: false
        },
        "frequentGroupVisibility": {
            type: Seq.STRING(250),
            field: "frequent_group_visibility",
            allowNull: false
        },
        "frequentGroupFeedback": {
            type: Seq.STRING(250),
            field: "frequent_group_feedback"
        }
    },
    relations: [{
        type: "belongsTo",
        model: "public.frequentDate",
        schema: "public",
        table: "frequent_date",
        source: "generator",
        details: {
            as: "relatedFrequentDateStart",
            foreignKey: "frequent_date_start",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
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
        model: "public.place",
        schema: "public",
        table: "place",
        source: "generator",
        details: {
            as: "place",
            foreignKey: "place_id",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};