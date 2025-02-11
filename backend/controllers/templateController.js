const { Template, User, Category, Period, TemplateTransaction, Transaction } = require('../models');

const templateController = {
    // 🔹 AJOUTER UN TEMPLATE
    addTemplate: async (req, res) => {
        try {
            const { name, categoryId, transactionsData } = req.body;
            const userId = req.userId; // Toujours basé sur l'utilisateur connecté

            // Validation des champs requis
            if (!userId || !categoryId || !name) {
                return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
            }

            // Vérification de la catégorie
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: "Catégorie introuvable." });
            }

            // Création du template
            const template = await Template.create({
                userId,
                categoryId,
                name,
            });

            // Ajout des transactions liées au template si elles existent
            if (transactionsData && transactionsData.length > 0) {
                const transactions = transactionsData.map(transaction => ({
                    templateId: template.id,
                    name: transaction.name,
                    amount: transaction.amount,
                }));
                await TemplateTransaction.bulkCreate(transactions);

            }

            return res.status(201).json({ message: "Template enregistré avec succès.", template });
        } catch (error) {
            console.error("❌ Erreur lors de l'ajout du template :", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },

    // 🔹 SUPPRIMER UN TEMPLATE
    deleteTemplate: async (req, res) => {
        try {
            const { templateId } = req.body;
            const userId = req.userId;

            // Vérifier si le template appartient à l'utilisateur connecté
            const template = await Template.findOne({ where: { id: templateId, userId } });

            if (!template) {
                return res.status(404).json({ message: "Template introuvable ou non autorisé." });
            }

            // Suppression des transactions associées
            await Transaction.destroy({ where: { templateId } });

            // Suppression du template
            await template.destroy();

            return res.status(200).json({ message: "Template supprimé avec succès." });
        } catch (error) {
            console.error("❌ Erreur lors de la suppression du template :", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },

    // 🔹 SUPPRIMER UNE TRANSACTION D'UN TEMPLATE
    deleteTransactionFromTemplate: async (req, res) => {
        try {
            const { transactionId } = req.body;

            if (!transactionId) {
                return res.status(400).json({ message: "L'ID de la transaction est requis." });
            }

            // Vérifier si la transaction existe
            const transaction = await TemplateTransaction.findByPk(transactionId);
            if (!transaction) {
                return res.status(404).json({ message: "Transaction non trouvée." });
            }

            // Suppression de la transaction
            await transaction.destroy();

            return res.status(200).json({ message: "Transaction supprimée avec succès." });
        } catch (error) {
            console.error("❌ Erreur lors de la suppression de la transaction du template :", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },

    // 🔹 MODIFIER UN TEMPLATE
    updateTemplate: async (req, res) => {
        try {
            const { templateId, name, transactionsData } = req.body;

            // Vérifier si toutes les données sont fournies
            if (!templateId || !name) {
                return res.status(400).json({ message: "L'ID du template et le nom sont requis." });
            }

            // Vérifier si le template existe
            const template = await Template.findByPk(templateId);
            if (!template) {
                return res.status(404).json({ message: "Template non trouvé." });
            }

            // Mise à jour du template
            await template.update({ name });

            // Mise à jour des transactions associées
            if (transactionsData && transactionsData.length > 0) {
                // Supprimer les transactions existantes
                await Transaction.destroy({ where: { templateId } });

                // Ajouter les nouvelles transactions
                const transactions = transactionsData.map(transaction => ({
                    templateId,
                    name: transaction.name,
                    amount: transaction.amount,
                }));
                await Transaction.bulkCreate(transactions);
            }

            return res.status(200).json({ message: "Template mis à jour avec succès.", template });
        } catch (error) {
            console.error("❌ Erreur lors de la modification du template :", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },

    // 🔹 AJOUTER UNE TRANSACTION DANS UN TEMPLATE
    addTransactionToTemplate: async (req, res) => {
        try {
            const { categoryId, name, amount } = req.body;
            const userId = req.userId;

            if (!categoryId || !name || amount === undefined) {
                return res.status(400).json({ message: "L'ID de la catégorie, le nom et le montant sont requis." });
            }

            // Vérifier si un template existe pour cette catégorie
            let template = await Template.findOne({ where: { categoryId, userId } });

            // 🔹 S'il n'existe pas, on le crée automatiquement
            if (!template) {
                template = await Template.create({
                    userId,
                    categoryId,
                    name: `Template ${categoryId}`, // Nom par défaut
                });
                console.log(`✅ Nouveau template créé pour la catégorie ${categoryId}`);
            }

            // 🔹 Ajouter la transaction au template trouvé/créé
            const transaction = await TemplateTransaction.create({
                templateId: template.id,
                name,
                amount,
            });

            return res.status(201).json({ message: "Transaction ajoutée au template avec succès.", transaction });

        } catch (error) {
            console.error("❌ Erreur lors de l'ajout de la transaction au template :", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },


    // 🔹 RÉCUPÉRER TOUS LES TEMPLATES D'UN UTILISATEUR
    getUserTemplates: async (req, res) => {
        try {
            const userId = req.userId;
            console.log(`🔍 Récupération des templates pour l'utilisateur ${userId}`);
            const templates = await Template.findAll({
                where: { userId },
                include: [
                    { model: Category, as: 'category', attributes: ['id', 'name'] },
                    { model: TemplateTransaction, as: 'transactions', attributes: ['id', 'name', 'amount'] }
                ]
            });

            console.log("🚀 Templates récupérés :", JSON.stringify(templates, null, 2));
            return res.status(200).json(templates);
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des templates :", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },

    // 🔹 RÉCUPÉRER UN TEMPLATE PAR ID
    getTemplateById: async (req, res) => {
        try {
            const { templateId } = req.params;
            const userId = req.userId;

            const template = await Template.findOne({
                where: { id: templateId, userId },
                include: [
                    { model: Category, as: 'category' },
                    { model: Transaction, as: 'transactions' }
                ]
            });

            if (!template) {
                return res.status(404).json({ message: "Template non trouvé ou non autorisé." });
            }

            return res.status(200).json(template);
        } catch (error) {
            console.error("❌ Erreur lors de la récupération du template :", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },
    // UTILISER UN TEMPLATE
    applyTemplateToCategory: async (req, res) => {
        try {
            const { categoryId } = req.body;
            const userId = req.userId;

            // 🔍 Vérifier s'il existe un template pour cette catégorie
            const template = await Template.findOne({
                where: { categoryId, userId },
                include: [{ model: TemplateTransaction, as: "transactions" }]
            });

            console.log("🔍 Template trouvé :", template);

            if (!template) {
                return res.status(404).json({ message: "Aucun template trouvé pour cette catégorie." });
            }

            if (!template.transactions || template.transactions.length === 0) {
                return res.status(404).json({ message: "Le template ne contient aucune transaction." });
            }

            console.log("📌 Transactions du template :", JSON.stringify(template.transactions, null, 2));

            // 🔹 Récupération de la période actuelle
            const { month, year } = req.body; // 🔥 Ajout de la récupération du mois et de l'année depuis le frontend

            if (!month || !year) {
                return res.status(400).json({ message: "Le mois et l'année sont requis." });
            }

            const period = await Period.findOne({ where: { month, year } });

            if (!period) {
                return res.status(404).json({ message: "Période non trouvée." });
            }

            // 🔹 Supprimer les transactions actuelles de la catégorie
            await Transaction.destroy({ where: { categoryId, userId, periodId: period.id } });

            // 🔹 Ajouter les transactions du template en tant que nouvelles transactions
            const transactionsToInsert = template.transactions.map((transaction) => ({
                categoryId,
                userId,
                periodId: period.id,
                name: transaction.name,
                amount: transaction.amount,
            }));

            const newTransactions = await Transaction.bulkCreate(transactionsToInsert);

            console.log("✅ Transactions insérées :", newTransactions);

            return res.status(201).json({
                message: "Template appliqué avec succès.",
                transactions: newTransactions,
            });

        } catch (error) {
            console.error("❌ Erreur lors de l'application du template :", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    }






};

module.exports = templateController;
