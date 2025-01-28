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

    return User
}