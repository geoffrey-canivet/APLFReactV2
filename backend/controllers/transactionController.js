const { Transaction, Category, User, Period, SubTransaction} = require('../models');

const transactionController = {
    // AJOUTER UNE TRANSACTION
    addTransaction: async (req, res) => {
        try {
            const { categoryId, periodId, name, amount, details } = req.body;
            const userId = req.userId; // Toujours basé sur l'utilisateur connecté

            // Validation simple des entrées
            if (!userId || !categoryId || !periodId || !name) {
                return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
            }

            // Vérification de la catégorie
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: "Catégorie introuvable." });
            }

            // Création de la transaction
            const transaction = await Transaction.create({
                userId,
                categoryId,
                periodId,
                name,
                amount,
                details: details || null, // Peut être vide
            });

            return res.status(201).json({ message: "Transaction ajoutée avec succès.", transaction });
        } catch (error) {
            console.error("Erreur lors de l'ajout de la transaction :", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },

    // SUPPRIMER UNE TRANSACTION
    deleteTransaction: async (req, res) => {
        try {
            const { transactionId } = req.body;
            const userId = req.userId; // Toujours basé sur l'utilisateur connecté
            console.log("controller transactionID->", transactionId);
            // Vérifier si la transaction appartient à l'utilisateur connecté
            const transaction = await Transaction.findOne({
                where: { id: transactionId, userId },
            });

            if (!transaction) {
                return res.status(404).json({ message: "Transaction introuvable ou non autorisée." });
            }

            // Supprimer la transaction
            await transaction.destroy();

            return res.status(200).json({ message: "Transaction supprimée avec succès." });
        } catch (error) {
            console.error("Erreur lors de la suppression de la transaction :", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },

    // SUPPRIMER TOUTES LES TRANSACTION D UNE CATEGORIE
    deleteAllTransactionsByCategory: async (req, res) => {

        try {

            const { categoryId } = req.body; // Récupération de l'ID dans le body

            if (!categoryId) {
                return res.status(400).json({ message: "L'ID de la catégorie est requis" });
            }

            // Vérifier si la catégorie existe
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: "Catégorie non trouvée" });
            }

            // Supprimer toutes les transactions associées
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

            // Vérifier si toutes les données sont fournies
            if (!transactionId || !name || amount === undefined) {
                return res.status(400).json({ message: "L'ID de la transaction, le nom et le montant sont requis" });
            }

            // Vérifier si la transaction existe
            const transaction = await Transaction.findByPk(transactionId);
            if (!transaction) {
                return res.status(404).json({ message: "Transaction non trouvée" });
            }

            // Mise à jour de la transaction
            await transaction.update({ name, amount });

            return res.status(200).json({ message: "Transaction mise à jour avec succès", transaction });
        } catch (error) {

        }
    },

    deleteAllTransactions: async (req, res) => {
        try {
            console.log("🔴 Suppression de toutes les transactions et sous-transactions...");

            // Supprimer toutes les sous-transactions en premier (cascade gérée par Sequelize aussi)
            await SubTransaction.destroy({ where: {} });

            // Supprimer toutes les transactions
            await Transaction.destroy({ where: {} });

            console.log("✅ Toutes les transactions et sous-transactions ont été supprimées.");
            res.status(200).json({ message: "Toutes les transactions et sous-transactions ont été supprimées avec succès." });

        } catch (error) {
            console.error("❌ Erreur lors de la suppression des transactions :", error);
            res.status(500).json({ message: "Erreur serveur lors de la suppression des transactions.", error: error.message });
        }
    },
};

module.exports = transactionController;