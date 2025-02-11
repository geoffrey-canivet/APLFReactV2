module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            comment: "Identifiant unique du ticket"
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "URL de l'image du ticket"
        },
        pdfUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "URL du fichier PDF généré à partir du ticket"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Référence à l'utilisateur propriétaire"
        },
        subTransactionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Référence à la sous transaction"
        },
    }, {
        tableName: 'tickets',
        timestamps: true,
        comment: "Table des tickets de caisse"
    });

    Ticket.associate = (models) => {
        // Relation avec l'utilisateur
        Ticket.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE'
        });

        // Relation avec la sous-transaction
        Ticket.belongsTo(models.SubTransaction, {
            foreignKey: 'subTransactionId',
            as: 'subTransaction',
            onDelete: 'CASCADE'
        });
    };

    return Ticket;
};
