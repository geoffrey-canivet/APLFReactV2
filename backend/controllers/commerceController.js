const { Commerce } = require('../models');
const { Op } = require('sequelize'); // Import de l'opérateur OR

const commerceController = {
    // Créer un commerce lié à l'utilisateur authentifié
    createCommerce: async (req, res) => {
        try {
            const { label, value, color } = req.body;
            const userId = req.userId;

            if (!userId) {
                return res.status(400).json({ message: "Utilisateur non authentifié." });
            }

            if (!label || !value || !color) {
                return res.status(400).json({ message: "Tous les champs (label, value, color) sont requis." });
            }

            const commerce = await Commerce.create({ label, value, color, userId });
            return res.status(201).json({ message: "Commerce créé avec succès.", commerce });
        } catch (error) {
            return res.status(500).json({ message: "Erreur serveur lors de la création du commerce", error: error.message });
        }
    },

    // Récupérer tous les commerces de l'utilisateur authentifié ET les commerces globaux (userId null)
    getAllCommerces: async (req, res) => {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(400).json({ message: "Utilisateur non authentifié." });
            }

            // Modification de la condition pour inclure userId et userId null
            const commerces = await Commerce.findAll({
                where: {
                    [Op.or]: [
                        { userId: userId },
                        { userId: null }
                    ]
                }
            });
            return res.status(200).json(commerces);
        } catch (error) {
            return res.status(500).json({ message: "Erreur serveur lors de la récupération des commerces", error: error.message });
        }
    },

    // Supprimer un commerce appartenant à l'utilisateur authentifié
    deleteCommerce: async (req, res) => {
        try {
            const { id } = req.body;
            const userId = req.userId;

            if (!userId) {
                return res.status(400).json({ message: "Utilisateur non authentifié." });
            }

            if (!id) {
                return res.status(400).json({ message: "L'ID du commerce est requis." });
            }

            const commerce = await Commerce.findOne({ where: { id, userId } });
            if (!commerce) {
                return res.status(404).json({ message: "Commerce introuvable ou non autorisé." });
            }

            await commerce.destroy();
            return res.status(200).json({ message: "Commerce supprimé avec succès." });
        } catch (error) {
            return res.status(500).json({ message: "Erreur serveur lors de la suppression du commerce", error: error.message });
        }
    }
};

module.exports = commerceController;
