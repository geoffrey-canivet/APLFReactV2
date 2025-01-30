module.exports = (sequelize, DataTypes) => {
    const Period = sequelize.define('Period', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "Identifiant unique de la période"
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 12
            },
            comment: "Mois de la période (1-12)"
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Année de la période"
        }
    }, {
        tableName: 'periods',
        timestamps: false,
        comment: "Table des périodes fixes"
    });

    Period.associate = (models) => {
        Period.hasMany(models.Transaction, {
            foreignKey: 'periodId',
            as: 'transactions'
        });
    };

    return Period;
};