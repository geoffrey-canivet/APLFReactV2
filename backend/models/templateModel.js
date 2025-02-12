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
            comment: "Nom du template (ex: Budget Mensuel, Charges fixes)"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Référence à l'utilisateur propriétaire"
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Référence à la catégorie du template"
        }
    }, {
        tableName: 'templates',
        timestamps: true,
        comment: "Table des templates permettant d'enregistrer des modèles de transactions"
    });

    Template.associate = (models) => {
        Template.belongsTo(models.User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
        Template.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });

        // Relation avec TemplateTransaction
        Template.hasMany(models.TemplateTransaction, {
            foreignKey: 'templateId',
            as: 'transactions',
            onDelete: 'CASCADE'
        });
    };

    return Template;
};
