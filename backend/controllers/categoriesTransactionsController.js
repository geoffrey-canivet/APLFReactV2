const { Category, Transaction } = require('../models');

const categoriesTransactionsController = {

    getAll: async (req, res) => {
        try {
            const userId = req.userId;

            // Récupérer toutes les catégories avec leurs transactions
            const categories = await Category.findAll({
                include: [
                    {
                        model: Transaction,
                        as: 'transactions',
                        where: { userId },
                        required: false, // Inclure les catégories sans transactions
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
            res.status(500).json({ message: "Erreur serveur.", error });
        }
    },
    getFixe: async (req, res) => {
        try {
            const userId = req.userId;

            // Récupérer uniquement les catégories avec les ID spécifiques
            const categories = await Category.findAll({
                where: {
                    id: [1, 2, 3, 4], // Limite aux ID 1, 2, 3 et 4
                },
                include: [
                    {
                        model: Transaction,
                        as: 'transactions',
                        where: { userId }, // Filtrer les transactions par utilisateur connecté
                        required: false, // Inclure les catégories même si elles n'ont pas de transactions
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
            res.status(500).json({ message: "Erreur serveur.", error });
        }
    },
    getOccasionnelle: async (req, res) => {
        try {
            const userId = req.userId;

            // Récupérer uniquement les catégories avec les ID spécifiques
            const categories = await Category.findAll({
                where: {
                    id: [5,6,7,8],
                },
                include: [
                    {
                        model: Transaction,
                        as: 'transactions',
                        where: { userId }, // Filtrer les transactions par utilisateur connecté
                        required: false, // Inclure les catégories même si elles n'ont pas de transactions
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
            res.status(500).json({ message: "Erreur serveur.", error });
        }
    },
    getRevenu: async (req, res) => {
        try {
            const userId = req.userId;

            // Récupérer uniquement les catégories avec les ID spécifiques
            const categories = await Category.findAll({
                where: {
                    id: [9,10,11,12],
                },
                include: [
                    {
                        model: Transaction,
                        as: 'transactions',
                        where: { userId }, // Filtrer les transactions par utilisateur connecté
                        required: false, // Inclure les catégories même si elles n'ont pas de transactions
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
            res.status(500).json({ message: "Erreur serveur.", error });
        }
    },

}

module.exports = categoriesTransactionsController;