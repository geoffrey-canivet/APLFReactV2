
const { Commerce } = require('../models');

const commerceController = {
    // Créer un commerce
    createCommerce: async (req, res) => {
        try {
            const { label, value, color } = req.body;
            if (!label || !value || !color) {
                return res.status(400).json({ message: "Tous les champs (label, value, color) sont requis." });
            }
            const commerce = await Commerce.create({ label, value, color });
            return res.status(201).json({ message: "Commerce créé avec succès.", commerce });
        } catch (error) {
            return res.status(500).json({ message: "Erreur serveur lors de la création du commerce", error: error.message });
        }
    },

    // Récupérer tous les commerces
    getAllCommerces: async (req, res) => {
        try {
            const commerces = await Commerce.findAll();
            return res.status(200).json(commerces);
        } catch (error) {
            return res.status(500).json({ message: "Erreur serveur lors de la récupération des commerces", error: error.message });
        }
    },

    // Supprimer un commerce
    deleteCommerce: async (req, res) => {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ message: "L'ID du commerce est requis." });
            }

            const commerce = await Commerce.findByPk(id);
            if (!commerce) {
                return res.status(404).json({ message: "Commerce non trouvé." });
            }

            await commerce.destroy();
            return res.status(200).json({ message: "Commerce supprimé avec succès." });
        } catch (error) {
            return res.status(500).json({ message: "Erreur serveur lors de la suppression du commerce", error: error.message });
        }
    }

};

module.exports = commerceController;
