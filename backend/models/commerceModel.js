module.exports = (sequelize, DataTypes) => {
    const Commerce = sequelize.define('Commerce', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "Identifiant unique du commerce"
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: "Nom du commerce"
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: "Nom du commerce"
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Couleur du commerce"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Identifiant de l'utilisateur associé",
            references: {
                model: 'users', // Nom de la table utilisateur
                key: 'id'
            }
        },
    }, {
            tableName: 'commerce',
            timestamps: true,
            comment: "Table des commerces"
    })

    // Association : chaque commerce appartient à un utilisateur
    Commerce.associate = (models) => {
        Commerce.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };




    return Commerce
}