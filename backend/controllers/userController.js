const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const cloudinary = require('../config/cloudinary');

const userController = {
    // INSCRIPTION
    create: async (req, res) => {
        try {
            const { password, firstName, ...userData } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                ...userData,
                firstName,
                password: hashedPassword,
            });

            res.status(201).json({
                id: user.id,
                email: user.email,
                name: user.name,
                firstName: user.firstName,
                message: "Utilisateur créé avec succès",
            });

        } catch (err) {
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
                error: "Erreur serveur lors de l'inscription",
            });
        }
    },

    // LOGIN
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Vérifie si l'utilisateur existe
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ error: "Utilisateur ou mot de passe invalide" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: "Utilisateur ou mot de passe invalide" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.status(200).json({ message: "Connexion réussie", token, userData: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            });

        } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

    // RECUPER INFOS USER
    getUserInfo: async (req, res) => {
        try {
            const id = req.userId;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            }

            console.log("user ->", user)

            res.status(200).json({
                id: user.id,
                name: user.name,
                firstName: user.firstName,
                updatedAt: user.updatedAt,
                email: user.email,
                avatar_url: user.avatar_url

            });
        } catch (err) {
            res.status(500).json({ error: "Erreur serveur lors de la récupération des informations utilisateur" });
        }
    },

    // MODIFIER USER
    updateUser: async (req, res) => {
        try {
            const { name, firstName, email } = req.body;
            const userId = req.userId;

            if (!name || !firstName || !email) {
                return res.status(400).json({ error: "Tous les champs sont requis)" });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            }

            user.name = name;
            user.firstName = firstName;
            user.email = email;
            await user.save();

            res.status(200).json({
                message: "Informations utilisateur mises à jour avec succès",
                user: {
                    id: user.id,
                    name: user.name,
                    firstName: user.firstName,
                    email: user.email
                }
            });

        } catch (error) {
            res.status(500).json({ error: "Erreur serveur lors de la mise à jour de l'utilisateur", details: error.message });
        }
    },

    // PHOTO PROFILE
    uploadAvatar: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "Aucun fichier envoyé." });
            }

            const streamUpload = (fileBuffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream((error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    });
                    stream.end(fileBuffer);
                });
            };

            const result = await streamUpload(req.file.buffer);

            await User.update(
                { avatar_url: result.secure_url },
                { where: { id: req.userId } }
            );

            return res.status(200).json({ message: "Avatar mis à jour avec succès.", avatar_url: result.secure_url });
        } catch (error) {
            return res.status(500).json({ message: "Erreur lors de l'upload de l'avatar.", error: error.message });
        }
    }
};

module.exports = userController;
