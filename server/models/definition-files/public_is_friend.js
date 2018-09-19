/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'is_friend.js' file in 'definition-files-custom' directory located in this file's parent directory.
2. Copy the code below and paste it into 'is_friend.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model/index.js'),
    model   = require('./is_friend.js'),
    util    = require('../utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("relatedUserIdHaveFriend").onDelete = 'CASCADE'; 
util.getAttribute("userId").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "public.isFriend",
    options: {
        tableName: "is_friend",
        schema: "public",
        timestamps: false
    },
    attributes: {
        "userId": {
            type: Seq.INTEGER,
            field: "user_id",
            primaryKey: true,
            allowNull: false,
            unique: "is_friend_pk",
            references: "public.user",
            referencesKey: "user_id"
        },
        "userIdHaveFriend": {
            type: Seq.INTEGER,
            field: "user_id_have_friend",
            primaryKey: true,
            allowNull: false,
            unique: "is_friend_pk",
            references: "public.user",
            referencesKey: "user_id_have_friend"
        },
        "isfriendState": {
            type: Seq.STRING(50),
            field: "isfriend_state",
            allowNull: false
        }
    },
    relations: [{
        type: "belongsTo",
        model: "public.user",
        schema: "public",
        table: "user",
        source: "generator",
        details: {
            as: "relatedUserIdHaveFriend",
            foreignKey: "user_id_have_friend",
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