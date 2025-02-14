module.exports = (sequelize, DataTypes) => {
    const LogHistory = sequelize.define('LogHistory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "Identifiant unique de la catégorie"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "description du log"
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Couleur dans le slider"
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Couleur dans le slider"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        }
    },
        {
            tableName: 'log_history',
            timestamps: true,
            comment: "Table des log"
        })

    LogHistory.associate = (models) => {
        LogHistory.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user"
        });
    };

    return LogHistory;
}