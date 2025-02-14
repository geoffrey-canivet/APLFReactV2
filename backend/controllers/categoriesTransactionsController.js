const { Category, Transaction, SubTransaction, Period } = require('../models');

const categoriesTransactionsController = {

    // RECUPERER TOUTES LES CATEGORIES + TRANSACTOION
    getAll: async (req, res) => {
        try {
            const userId = req.userId;

            const categories = await Category.findAll({
                include: [
                    {
                        model: Transaction,
                        as: 'transactions',
                        where: { userId },
                        required: false,
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
            res.status(500).json({ message: "Erreur serveur lors de la récupération des catégories", error });
        }
    },

    // RECUPERER TOUT LES TRANSACTIONS FIXES
    getFixe: async (req, res) => {
        try {
            const userId = req.userId;

            const categories = await Category.findAll({
                where: {
                    id: [1, 2, 3, 4],
                },
                include: [
                    {
                        model: Transaction,
                        as: 'transactions',
                        where: { userId },
                        required: false,
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur lors de la récupération des catégories", error });
        }
    },

    // RECUPERER FIXE PAR PERIODE
    getFixeByPeriod: async (req, res) => {
        try {
            const userId = req.userId;
            const { month, year } = req.body;

            if (!month || !year) {
                return res.status(400).json({ message: "Mois et année requis." });
            }

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
                                where: { month, year },
                            },
                        ],
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur lors de la récupération des catégories", error: error.message });
        }
    },

    // RECUPERER TOUTES LES OCCAS
    getOccasionnelle: async (req, res) => {
        try {

            const userId = req.userId;
            const categories = await Category.findAll({
                where: {
                    id: [5, 6, 7, 8],
                },
                include: [
                    {
                        model: Transaction,
                        as: "transactions",
                        where: { userId },
                        required: false,
                        include: [
                            {
                                model: SubTransaction,
                                as: "subTransactions",
                                required: false,
                            },
                        ],
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur lors de la récupération des catégories", error: error.message });
        }
    },

    // RECUPERER OCCAS PAR PERIODE
    getOccasionnelleByPeriod: async (req, res) => {
        try {
            const userId = req.userId;
            const { month, year } = req.body;

            if (!month || !year) {
                return res.status(400).json({ message: "Mois et année requis." });
            }

            const categories = await Category.findAll({
                where: { id: [5, 6, 7, 8] },
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
                                where: { month, year },
                            },
                            {
                                model: SubTransaction,
                                as: "subTransactions",
                                required: false,
                            },
                        ],
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur lors de la récupération des catégories", error: error.message });
        }
    },

    // RECUPERER TOUT LES REVENUS
    getRevenu: async (req, res) => {
        try {
            const userId = req.userId;

            const categories = await Category.findAll({
                where: {
                    id: [9,10,11,12],
                },
                include: [
                    {
                        model: Transaction,
                        as: 'transactions',
                        where: { userId },
                        required: false,
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur lors de la récupération des catégories", error });
        }
    },

    // RECUPERER TOUT LES REVENU PAR PERDIODE
    getRevenuByPeriod: async (req, res) => {
        try {
            const userId = req.userId;
            const { month, year } = req.body;

            if (!month || !year) {
                return res.status(400).json({ message: "Mois et année requis." });
            }

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
                                where: { month, year },
                            },
                        ],
                    },
                ],
            });

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur lors de la récupération des catégories", error: error.message });
        }
    },

    

}

module.exports = categoriesTransactionsController;