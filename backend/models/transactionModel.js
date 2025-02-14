module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "Identifiant unique de la transaction"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Nom de la transaction (ex: Électricité, Restaurant)"
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            comment: "Montant total de la transaction"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Référence à l'utilisateur propriétaire"
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Référence à la catégorie"
        },
        periodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Référence à la période (si applicable)"
        },
    }, {
        tableName: 'transactions',
        timestamps: true,
        comment: "Table des transactions principales"
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE'
        });
        // Relation avec la catégorie
        Transaction.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
        });
        // Relation avec la période
        Transaction.belongsTo(models.Period, {
            foreignKey: 'periodId',
            as: 'period'
        });
        // Relation avec les sous-transactions
        Transaction.hasMany(models.SubTransaction, {
            foreignKey: 'transactionId',
            as: 'subTransactions',
            onDelete: 'CASCADE'
        });
    };

    return Transaction;
};