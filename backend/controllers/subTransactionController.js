const db = require("../models"); // ✅ Importer l'index des modèles correctement

const subTransactionController = {
    addSubTransaction: async (req, res) => {
        try {
            const { transactionId, amount, date, commerce, comment } = req.body;

            console.log("📥 Données reçues :", { transactionId, amount, date, commerce, comment });

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
                commerce,
                comments : comment,
            });

            console.log("✅ Sous-transaction ajoutée avec succès :", newSubTransaction);

            res.status(201).json(newSubTransaction);
        } catch (error) {
            console.error("❌ Erreur lors de l'ajout de la sous-transaction :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

    updateSubTransaction: async (req, res) => {
        try {
            // Récupération des données de la requête
            const { subTransactionId, amount, date, commerce, comment } = req.body;

            if (!subTransactionId) {
                return res.status(400).json({ error: "L'id de la sous-transaction est requis." });
            }

            // Vérifier si la sous-transaction existe
            const subTransaction = await db.SubTransaction.findByPk(subTransactionId);

            if (!subTransaction) {
                return res.status(404).json({ error: "Sous-transaction non trouvée." });
            }

            // Mettre à jour la sous-transaction avec les nouvelles valeurs
            await subTransaction.update({
                amount: amount !== undefined ? amount : subTransaction.amount,
                date: date || subTransaction.date,
                commerce: commerce || subTransaction.commerce,
                comments: comment !== undefined ? comment : subTransaction.comments,
            });

            console.log("✅ Sous-transaction mise à jour avec succès :", subTransaction);
            res.status(200).json({ message: "Sous-transaction mise à jour avec succès.", subTransaction });

        } catch (error) {
            console.error("❌ Erreur lors de la mise à jour de la sous-transaction :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },


    deleteSubTransaction: async (req, res) => {
        try {
            // Récupération de l'ID de la sous-transaction dans le body
            const { subTransactionId } = req.body;

            if (!subTransactionId) {
                return res.status(400).json({ error: "L'id de la sous-transaction est requis." });
            }

            // Recherche de la sous-transaction
            const subTransaction = await db.SubTransaction.findByPk(subTransactionId);

            if (!subTransaction) {
                return res.status(404).json({ error: "Sous-transaction non trouvée." });
            }

            // Suppression de la sous-transaction
            await subTransaction.destroy();

            console.log("✅ Sous-transaction supprimée avec succès :", subTransactionId);
            res.status(200).json({ message: "Sous-transaction supprimée avec succès." });
        } catch (error) {
            console.error("❌ Erreur lors de la suppression de la sous-transaction :", error);
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

    getSubTransactionById: async (req, res) => {
        try {
            const { subTransactionId } = req.body;

            // Vérifier que l'ID est fourni
            if (!subTransactionId) {
                return res.status(400).json({ error: "L'id de la sous-transaction est requis." });
            }

            // 🔍 Recherche de la sous-transaction par ID
            const subTransaction = await db.SubTransaction.findOne({
                where: { id: subTransactionId },
                include: {
                    model: db.Transaction,
                    as: "transaction",
                },
            });

            if (!subTransaction) {
                return res.status(404).json({ error: "Sous-transaction non trouvée." });
            }

            res.status(200).json(subTransaction);
        } catch (error) {
            console.error("❌ Erreur lors de la récupération de la sous-transaction :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

};

module.exports = subTransactionController;
