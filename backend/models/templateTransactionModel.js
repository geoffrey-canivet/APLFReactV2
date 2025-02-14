module.exports = (sequelize, DataTypes) => {
    const TemplateTransaction = sequelize.define('TemplateTransaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "Identifiant unique de la transaction template"
        },
        templateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Référence au template associé"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Nom de la transaction dans le template"
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            comment: "Montant de la transaction template"
        }
    }, {
        tableName: 'template_transactions',
        timestamps: true,
        comment: "Table des transactions liées aux templates"
    });

    TemplateTransaction.associate = (models) => {
        TemplateTransaction.belongsTo(models.Template, {
            foreignKey: 'templateId',
            as: 'template',
            onDelete: 'CASCADE'
        });
    };

    return TemplateTransaction;
};
