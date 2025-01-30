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
        }
    }, {
        tableName: 'transactions',
        timestamps: true,
        comment: "Table des transactions principales"
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        Transaction.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
        });
        Transaction.belongsTo(models.Period, {
            foreignKey: 'periodId',
            as: 'period'
        });
        Transaction.hasMany(models.SubTransaction, {
            foreignKey: 'transactionId',
            as: 'subTransactions'
        });
    };

    return Transaction;
};