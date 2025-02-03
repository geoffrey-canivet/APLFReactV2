const db = require("../models"); // ✅ Importer l'index des modèles correctement

const subTransactionController = {
    addSubTransaction: async (req, res) => {
        try {
            const { transactionId, amount, date } = req.body;

            console.log("📥 Données reçues :", { transactionId, amount, date });

            // ✅ Vérification de la transaction principale
            const transaction = await db.Transaction.findByPk(transactionId);
            console.log("🔍 Transaction trouvée :", transaction);

            if (!transaction) {
                console.error("❌ Transaction principale non trouvée !");
                return res.status(404).json({ error: "Transaction principale non trouvée" });
            }

            // ✅ Création de la sous-transaction
            const newSubTransaction = await db.SubTransaction.create({
                transactionId,
                amount,
                date,
            });

            console.log("✅ Sous-transaction ajoutée avec succès :", newSubTransaction);

            res.status(201).json(newSubTransaction);
        } catch (error) {
            console.error("❌ Erreur lors de l'ajout de la sous-transaction :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

    getSubTransactions: async (req, res) => {
        try {
            const { transactionId } = req.params;

            // ✅ Récupération des sous-transactions avec l'association Transaction
            const subTransactions = await db.SubTransaction.findAll({
                where: { transactionId },
                include: { model: db.Transaction, as: "transaction" }, // 👀 Vérifier si l'association fonctionne
            });

            res.status(200).json(subTransactions || []); // ✅ Retourne un tableau même si vide
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des sous-transactions :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },
};

module.exports = subTransactionController;
