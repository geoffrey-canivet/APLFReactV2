const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "secret_pour_jwt"; // TODO .ENV

const userController = {
    // INSCRIPTION
    create: async (req, res) => {
        try {
            console.log("Données reçues pour inscription :", req.body); // Log des données entrantes

            const { password, ...userData } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                ...userData,
                password: hashedPassword,
            });

            console.log("Utilisateur créé :", user); // Log de l'utilisateur créé
            res.status(201).json({
                id: user.id,
                email: user.email,
                name: user.name,
                message: "Utilisateur créé avec succès",
            });

        } catch (err) {
            console.error("Erreur lors de l'inscription :", err); // Log des erreurs
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    error: "Données invalides",
                    details: err.errors.map(error => ({
                        field: error.path,
                        message: error.message,
                    })),
                });
            }
            res.status(500).json({
                error: "Erreur serveur",
            });
        }
    },
    // LOGIN
    login: async (req, res) => {
        const { email, password } = req.body;
        console.log("Données reçues pour login :", req.body); // Log des données entrantes

        try {
            // Vérifie si l'utilisateur existe
            const user = await User.findOne({ where: { email } });
            console.log("Utilisateur trouvé :", user); // Log de l'utilisateur trouvé ou null

            if (!user) {
                return res.status(401).json({ error: "Utilisateur ou mot de passe invalide" });
            }

            // Vérifie le mot de passe
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log("Mot de passe valide :", passwordMatch); // Log de la comparaison de mot de passe

            if (!passwordMatch) {
                return res.status(401).json({ error: "Utilisateur ou mot de passe invalide" });
            }

            // Génère un token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email }, // Payload
                SECRET_KEY, // Clé secrète
                { expiresIn: "1h" } // Expiration
            );

            console.log("Token généré :", token); // Log du token généré
            res.status(200).json({ message: "Connexion réussie", token, userData: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {
            console.error("Erreur lors de la connexion :", error); // Log des erreurs
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

    // RECUPER USER
    getUserInfo: async (req, res) => {
        try {
            const { id } = req.user; // req.user est défini par authMiddleware
            const user = await User.findByPk(id); // Utilisez votre méthode pour trouver l'utilisateur

            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            }

            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
            });
        } catch (err) {
            console.error("Erreur lors de la récupération des informations utilisateur :", err);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },
};

module.exports = userController;
