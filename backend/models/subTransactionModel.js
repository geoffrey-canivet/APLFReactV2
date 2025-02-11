module.exports = (sequelize, DataTypes) => {
    const SubTransaction = sequelize.define('SubTransaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "Identifiant unique de la sous-transaction"
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: "Montant de la sous-transaction"
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commerce: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        document: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        transactionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Référence à la transaction principale"
        },

    }, {
        tableName: 'sub_transactions',
        timestamps: true,
        comment: "Table des sous-transactions"
    });

    SubTransaction.associate = (models) => {
        SubTransaction.belongsTo(models.Transaction, {
            foreignKey: 'transactionId',
            as: 'transaction',
            onDelete: 'CASCADE'
        });
        // Une sous-transaction peut avoir plusieurs tickets
        SubTransaction.hasMany(models.Ticket, {
            foreignKey: 'subTransactionId',
            as: 'tickets',
            onDelete: 'CASCADE'
        });

    };

    return SubTransaction;
};