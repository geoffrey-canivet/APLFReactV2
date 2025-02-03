module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "Identifiant unique de la catégorie"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: "Nom de la catégorie (ex: charges, crédits, etc.)"
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Couleur dans le slider"
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Icon"
        }
    }, {
        tableName: 'categories',
        timestamps: false,
        comment: "Table des catégories fixes"
    });

    Category.associate = (models) => {
        Category.hasMany(models.Transaction, {
            foreignKey: 'categoryId',
            as: 'transactions' // Alias
        });
    };

    return Category;
};