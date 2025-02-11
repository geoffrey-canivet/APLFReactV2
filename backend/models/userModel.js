module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "Identifiant unique"
        },
        // NOM
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le nom ne peut pas etre vide"
                },
                len: {
                    args: [3, 999],
                    msg: "Le nom doit contenir entre 3 et 50 caracteres"
                },
                is: {
                    args: /^[a-zA-Z\s'-]+$/i,
                    msg: "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes"
                }
            },
            comment: "Nom utilisateur"
        },
            // PRENOM
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Le prenom ne peut pas etre vide"
                    },
                    len: {
                        args: [3, 999],
                        msg: "Le prenom doit contenir entre 3 et 50 caracteres"
                    },
                    is: {
                        args: /^[a-zA-Z\s'-]+$/i,
                        msg: "Le prenom ne peut contenir que des lettres, espaces, tirets et apostrophes"
                    }
                },
                comment: "prénom utilisateur"
            },
        // EMAIL
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Format d'email invalide"
                },
                notEmpty: {
                    msg: "L'email ne peut pas être vide"
                }
            },
            comment: "Adresse email unique"
        },
        avatar_url: {
            type: DataTypes.STRING,
                allowNull: true
            },
        // PASSWORD
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le mot de passe ne peut pas être vide"
                },

            },
            comment: "Mot de passe"
        }
    },
        {
            timestamps: true,
            tableName: 'users',
            comment: "Table des utilisateurs"
        });

    // Définir les associations dans une fonction associate
    User.associate = (models) => {
        User.hasMany(models.Transaction, {
            foreignKey: 'userId',
            as: 'transactions',
        });

        // ✅ Un utilisateur a plusieurs logs
        User.hasMany(models.LogHistory, {
            foreignKey: "userId",
            as: "logs",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        // Un utilisateur peut avoir plusieurs tickets
        User.hasMany(models.Ticket, {
            foreignKey: "userId",
            as: "tickets",
            onDelete: "CASCADE"
        });

    };


    return User
}