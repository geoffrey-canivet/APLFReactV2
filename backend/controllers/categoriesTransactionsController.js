const { Category, Transaction, SubTransaction, Period } = require('../models');

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

    getFixeByPeriod: async (req, res) => {
        try {
            const userId = req.userId; // ✅ Récupère l'ID de l'utilisateur via le middleware
            const { month, year } = req.body; // ✅ Récupère les paramètres du body

            if (!month || !year) {
                return res.status(400).json({ message: "Mois et année requis." });
            }

            console.log("📡 Requête reçue pour le mois:", month, "et l'année:", year, "de l'utilisateur:", userId);

            // 🔍 Récupère les transactions du mois et de l'année demandés
            const categories = await Category.findAll({
                where: { id: [1, 2, 3, 4] },
                include: [
                    {
                        model: Transaction,
                        as: "transactions",
                        where: { userId },
                        required: false,
                        include: [
                            {
                                model: Period,
                                as: "period",
                                where: { month, year }, // 📌 Filtrer par période
                            },
                        ],
                    },
                ],
            });

            console.log(`✅ Catégories récupérées pour ${month}/${year}:`, categories);
            res.status(200).json(categories);
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des catégories :", error);
            res.status(500).json({ message: "Erreur serveur.", error: error.message });
        }
    },

    getOccasionnelle: async (req, res) => {
        try {
            const userId = req.userId;

            // 🔍 Récupération des catégories avec transactions et sous-transactions
            const categories = await Category.findAll({
                where: {
                    id: [5, 6, 7, 8],
                },
                include: [
                    {
                        model: Transaction,
                        as: "transactions",
                        where: { userId }, // 🔹 Filtrer par utilisateur
                        required: false, // 🔹 Inclure même si pas de transactions
                        include: [
                            {
                                model: SubTransaction, // 🔥 Ajoute les sous-transactions
                                as: "subTransactions",
                                required: false, // 🔹 Inclure même si pas de sous-transactions
                            },
                        ],
                    },
                ],
            });

            console.log("✅ Catégories récupérées avec transactions et sous-transactions :", categories);
            res.status(200).json(categories);
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des catégories :", error);
            res.status(500).json({ message: "Erreur serveur.", error: error.message });
        }
    },

    getOccasionnelleByPeriod: async (req, res) => {
        try {
            const userId = req.userId; // ✅ Récupère l'ID de l'utilisateur via le middleware
            const { month, year } = req.body; // ✅ Récupère les paramètres du body

            if (!month || !year) {
                return res.status(400).json({ message: "Mois et année requis." });
            }

            console.log("📡 Requête reçue pour le mois:", month, "et l'année:", year, "de l'utilisateur:", userId);

            // 🔍 Récupération des catégories occasionnelles avec transactions et sous-transactions filtrées par période
            const categories = await Category.findAll({
                where: { id: [5, 6, 7, 8] }, // 📌 Sélectionne uniquement les catégories occasionnelles
                include: [
                    {
                        model: Transaction,
                        as: "transactions",
                        where: { userId }, // 🔹 Filtre par utilisateur
                        required: false, // 🔹 Inclure même si pas de transactions
                        include: [
                            {
                                model: Period,
                                as: "period",
                                where: { month, year }, // 📌 Filtrer par période (mois et année)
                            },
                            {
                                model: SubTransaction, // 🔥 Ajoute les sous-transactions
                                as: "subTransactions",
                                required: false, // 🔹 Inclure même si pas de sous-transactions
                            },
                        ],
                    },
                ],
            });

            console.log(`✅ Catégories récupérées pour ${month}/${year}:`, categories);
            res.status(200).json(categories);
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des catégories :", error);
            res.status(500).json({ message: "Erreur serveur.", error: error.message });
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

    getRevenuByPeriod: async (req, res) => {
        try {
            const userId = req.userId; // ✅ Récupère l'ID de l'utilisateur via le middleware
            const { month, year } = req.body; // ✅ Récupère les paramètres du body

            if (!month || !year) {
                return res.status(400).json({ message: "Mois et année requis." });
            }

            console.log("📡 Requête reçue pour le mois:", month, "et l'année:", year, "de l'utilisateur:", userId);

            // 🔍 Récupère les transactions du mois et de l'année demandés
            const categories = await Category.findAll({
                where: { id: [9, 10, 11, 12] },
                include: [
                    {
                        model: Transaction,
                        as: "transactions",
                        where: { userId },
                        required: false,
                        include: [
                            {
                                model: Period,
                                as: "period",
                                where: { month, year }, // 📌 Filtrer par période
                            },
                        ],
                    },
                ],
            });

            console.log(`✅ Catégories récupérées pour ${month}/${year}:`, categories);
            res.status(200).json(categories);
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des catégories :", error);
            res.status(500).json({ message: "Erreur serveur.", error: error.message });
        }
    },

}

module.exports = categoriesTransactionsController;