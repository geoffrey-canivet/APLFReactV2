const { Transaction, Category, User, Period, SubTransaction} = require('../models');

const transactionController = {
    // AJOUTER UNE TRANSACTION
    addTransaction: async (req, res) => {
        try {
            const { categoryId, periodId, name, amount, details } = req.body;
            const userId = req.userId;

            if (!userId || !categoryId || !periodId || !name) {
                return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
            }

            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: "Catégorie introuvable." });
            }

            const transaction = await Transaction.create({
                userId,
                categoryId,
                periodId,
                name,
                amount,
                details: details || null,
            });

            return res.status(201).json({ message: "Transaction ajoutée avec succès.", transaction });
        } catch (error) {
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },

    // SUPPRIMER UNE TRANSACTION
    deleteTransaction: async (req, res) => {
        try {
            const { transactionId } = req.body;
            const userId = req.userId;
            console.log("controller transactionID->", transactionId);

            const transaction = await Transaction.findOne({
                where: { id: transactionId, userId },
            });

            if (!transaction) {
                return res.status(404).json({ message: "Transaction introuvable ou non autorisée." });
            }

            await transaction.destroy();

            return res.status(200).json({ message: "Transaction supprimée avec succès." });
        } catch (error) {
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },

    // SUPPRIMER TOUTES LES TRANSACTION D UNE CATEGORIE
    deleteAllTransactionsByCategory: async (req, res) => {

        try {

            const { categoryId } = req.body;

            if (!categoryId) {
                return res.status(400).json({ message: "L'ID de la catégorie est requis" });
            }

            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: "Catégorie non trouvée" });
            }

            const deletedCount = await Transaction.destroy({
                where: { categoryId }
            });

            if (deletedCount === 0) {
                return res.status(404).json({ message: "Aucune transaction trouvée pour cette catégorie" });
            }

            return res.status(200).json({ message: `Toutes les transactions de la catégorie ${categoryId} ont été supprimées` });

        } catch (error) {
            console.error("Erreur lors de la suppression des transactions :", error);
            return res.status(500).json({ message: "Erreur interne du serveur" });
        }
    },

    // MODIFIER UNE TRANSACTION (NOM + AMOUNT)
    updateTransaction: async (req, res) => {

        try {
            const { transactionId, name, amount } = req.body;

            if (!transactionId || !name || amount === undefined) {
                return res.status(400).json({ message: "L'ID de la transaction, le nom et le montant sont requis" });
            }

            const transaction = await Transaction.findByPk(transactionId);
            if (!transaction) {
                return res.status(404).json({ message: "Transaction non trouvée" });
            }

            await transaction.update({ name, amount });

            return res.status(200).json({ message: "Transaction mise à jour avec succès", transaction });
        } catch (error) {

        }
    },

    // SUPPRIMER TOUTES LES TRANSACTION DE TOUTE LES CATEGORIES
    deleteAllTransactions: async (req, res) => {
        try {
            await SubTransaction.destroy({ where: {} });

            await Transaction.destroy({ where: {} });

            res.status(200).json({ message: "Toutes les transactions et sous-transactions ont été supprimées avec succès." });

        } catch (error) {
            res.status(500).json({ message: "Erreur serveur lors de la suppression des transactions.", error: error.message });
        }
    },
};

module.exports = transactionController;