'use strict';
module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define('type', {
        type_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        type_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type_description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });
    return Type;
};

/*Type.associate= function(models) {
        Type.hasMany(models.requisitions, {
            as: 'Requisitions',
            foreignKey: 'id_personne',
            onDelete: 'CASCADE'
        });
        Personnes.hasMany(models.comptes_rendus, {
            as: 'Comptes_rendus',
            foreignKey: 'id_personne',
            onDelete: 'CASCADE'
        });
        Personnes.belongsTo(models.niveaux_1, {
            as: 'Niveau_1',
            foreignKey: 'id_niveau_1',
            onDelete: 'CASCADE'
        });
        Personnes.belongsTo(models.forces_de_l_ordre, {
            as: 'Forces_de_l_ordre',
            foreignKey: 'id_force_de_l_ordre',
            onDelete: 'CASCADE'
        });
        Personnes.belongsTo(models.roles, {
            as: 'Role',
            foreignKey: 'id_role',
            onDelete: 'CASCADE'
        });
        Personnes.belongsTo(models.etablissements, {
            as: 'Etablissement',
            foreignKey: 'id_etablissement',
            onDelete: 'CASCADE'
        });
    }*/