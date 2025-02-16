module.exports = (sequelize, DataTypes) => {
    const Template = sequelize.define('Template', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "Identifiant unique du template"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Nom du template"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Référence à l'utilisateur"
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Référence à la catégorie du template"
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: "Indique si c'est un template par défaut"
        }
    }, {
        tableName: 'templates',
        timestamps: true,
        comment: "Table des templates permettant d'enregistrer des modèles de transactions"
    });

    Template.associate = (models) => {
        Template.belongsTo(models.User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
        Template.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
        Template.hasMany(models.TemplateTransaction, {
            foreignKey: 'templateId',
            as: 'transactions',
            onDelete: 'CASCADE'
        });
    };

    return Template;
};
