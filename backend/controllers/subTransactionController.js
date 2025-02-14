const db = require("../models");
const cloudinary = require('../config/cloudinary');
const subTransactionController = {

    // AJOUTER SOUS TRANSACTION
    addSubTransaction: async (req, res) => {
        try {
            const { transactionId, amount, date, commerce, comment } = req.body;

            const transaction = await db.Transaction.findByPk(transactionId);
            if (!transaction) {
                return res.status(404).json({ error: "Transaction principale non trouvée" });
            }

            let photoUrl = null;
            if (req.file) {
                const streamUpload = (fileBuffer) => {
                    return new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream(
                            { folder: "subTransactions" },
                            (error, result) => {
                                if (result) {
                                    resolve(result);
                                } else {
                                    reject(error);
                                }
                            }
                        );
                        stream.end(fileBuffer);
                    });
                };
                const result = await streamUpload(req.file.buffer);
                photoUrl = result.secure_url;
            }

            const newSubTransaction = await db.SubTransaction.create({
                transactionId,
                amount,
                date,
                commerce,
                comments: comment,
                photo: photoUrl,
            });

            res.status(201).json(newSubTransaction);
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

    // MODIFIER SOUS TRANSACTION
    updateSubTransaction: async (req, res) => {
        try {
            const { subTransactionId, amount, date, commerce, comment } = req.body;

            if (!subTransactionId) {
                return res.status(400).json({ error: "L'id de la sous-transaction est requis." });
            }

            const subTransaction = await db.SubTransaction.findByPk(subTransactionId);

            if (!subTransaction) {
                return res.status(404).json({ error: "Sous-transaction non trouvée." });
            }

            await subTransaction.update({
                amount: amount !== undefined ? amount : subTransaction.amount,
                date: date || subTransaction.date,
                commerce: commerce || subTransaction.commerce,
                comments: comment !== undefined ? comment : subTransaction.comments,
            });

            res.status(200).json({ message: "Sous-transaction mise à jour avec succès.", subTransaction });

        } catch (error) {
            res.status(500).json({ error: "Erreur serveur lors de la mise à jour de la sous-transaction" });
        }
    },

    // SUPPRIMER SOUS TRANSACTION
    deleteSubTransaction: async (req, res) => {
        try {
            const { subTransactionId } = req.body;

            if (!subTransactionId) {
                return res.status(400).json({ error: "L'id de la sous-transaction est requis." });
            }

            const subTransaction = await db.SubTransaction.findByPk(subTransactionId);

            if (!subTransaction) {
                return res.status(404).json({ error: "Sous-transaction non trouvée." });
            }

            await subTransaction.destroy();

            res.status(200).json({ message: "Sous-transaction supprimée avec succès." });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur lors de la suppression de la sous-transaction" });
        }
    },

    // RECUPERER TOUTE LES TRANSACTIONS
    getSubTransactions: async (req, res) => {
        try {
            const { transactionId } = req.params;

            const subTransactions = await db.SubTransaction.findAll({
                where: { transactionId },
                include: { model: db.Transaction, as: "transaction" },
            });

            res.status(200).json(subTransactions || []);
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur lors de la récupération des sous-transactions" });
        }
    },

    // RECUPERER UNE TRANSACTION PAR ID
    getSubTransactionById: async (req, res) => {
        try {
            const { subTransactionId } = req.body;

            if (!subTransactionId) {
                return res.status(400).json({ error: "L'id de la sous-transaction est requis." });
            }

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
            res.status(500).json({ error: "Erreur serveur lors de la récupération de la sous-transaction par id" });
        }
    },

};

module.exports = subTransactionController;
