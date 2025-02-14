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
    }, {
            tableName: 'commerce',
            timestamps: true,
            comment: "Table des commerces"
        }

        )




    return Commerce
}