const { Template, User, Category, Period, TemplateTransaction, Transaction } = require('../models');

const templateController = {

    // CREER UN TEMPLATE
    addTemplate: async (req, res) => {
        try {
            const { name, categoryId, transactionsData } = req.body;
            const userId = req.userId;

            if (!userId || !categoryId || !name) {
                return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
            }

            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ message: "Catégorie introuvable." });
            }

            const template = await Template.create({
                userId,
                categoryId,
                name,
            });

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
            res.status(500).json({ message: "Une erreur est survenue lors de l'ajout du template", error });
        }
    },

    // SUPPRIMER UN TEMPLATE
    deleteTemplate: async (req, res) => {
        try {
            const { templateId } = req.body;
            const userId = req.userId;

            const template = await Template.findOne({ where: { id: templateId } });

            if (!template) {
                return res.status(404).json({ message: "Template introuvable." });
            }

            if (template.isDefault) {
                return res.status(403).json({ message: "Les templates par défaut ne peuvent pas être supprimés." });
            }

            await TemplateTransaction.destroy({ where: { templateId } });
            await template.destroy();

            return res.status(200).json({ message: "Template supprimé avec succès." });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du template", error });
        }
    },

    // SUPPRIMER UNE TRANSACTION D'UN TEMPLATE
    deleteTransactionFromTemplate: async (req, res) => {
        try {
            const { transactionId } = req.body;

            if (!transactionId) {
                return res.status(400).json({ message: "L'ID de la transaction est requis." });
            }

            const transaction = await TemplateTransaction.findByPk(transactionId);
            if (!transaction) {
                return res.status(404).json({ message: "Transaction non trouvée." });
            }

            await transaction.destroy();

            return res.status(200).json({ message: "Transaction supprimée avec succès." });
        } catch (error) {
            res.status(500).json({ message: "Une erreur est survenue lors de la suppression de la transaction du template", error });
        }
    },

    // MODIFIER UN TEMPLATE
    updateTemplate: async (req, res) => {
        try {
            const { templateId, name, transactionsData } = req.body;

            if (!templateId || !name) {
                return res.status(400).json({ message: "L'ID du template et le nom sont requis." });
            }

            const template = await Template.findByPk(templateId);
            if (!template) {
                return res.status(404).json({ message: "Template non trouvé." });
            }

            await template.update({ name });

            if (transactionsData && transactionsData.length > 0) {
                await Transaction.destroy({ where: { templateId } });

                const transactions = transactionsData.map(transaction => ({
                    templateId,
                    name: transaction.name,
                    amount: transaction.amount,
                }));
                await Transaction.bulkCreate(transactions);
            }

            return res.status(200).json({ message: "Template mis à jour avec succès.", template });
        } catch (error) {
            res.status(500).json({ message: "Une erreur est survenue lors de la modification du template", error });
        }
    },

    // AJOUTER UNE TRANSACTION DANS UN TEMPLATE
    addTransactionToTemplate: async (req, res) => {
        try {
            const { categoryId, name, amount } = req.body;
            const userId = req.userId;

            if (!categoryId || !name || amount === undefined) {
                return res.status(400).json({ message: "L'ID de la catégorie, le nom et le montant sont requis." });
            }

            let template = await Template.findOne({ where: { categoryId, userId } });

            if (!template) {
                template = await Template.create({
                    userId,
                    categoryId,
                    name: `Template ${categoryId}`,
                });
                console.log(`✅ Nouveau template créé pour la catégorie ${categoryId}`);
            }

            const transaction = await TemplateTransaction.create({
                templateId: template.id,
                name,
                amount,
            });

            return res.status(201).json({ message: "Transaction ajoutée au template avec succès.", transaction });

        } catch (error) {
            res.status(500).json({ message: "Une erreur est survenue lors de l'ajout de la transaction au template", error });
        }
    },

    // RÉCUPÉRER TOUS LES TEMPLATES D'UN UTILISATEUR
    getUserTemplates: async (req, res) => {
        try {
            const userId = req.userId;
            const templates = await Template.findAll({
                where: { userId, isDefault: false },
                include: [
                    { model: Category, as: 'category', attributes: ['id', 'name'] },
                    { model: TemplateTransaction, as: 'transactions', attributes: ['id', 'name', 'amount'] }
                ]
            });

            return res.status(200).json(templates);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des templates utilisateur", error });
        }
    },

    // RÉCUPÉRER UN TEMPLATE PAR ID
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
            res.status(500).json({ message: "Une erreur est survenue lors de la récupération du template", error });
        }
    },

    // UTILISER UN TEMPLATE PERSO
    applyTemplateToCategory: async (req, res) => {
        try {
            const { categoryId } = req.body;
            const userId = req.userId;

            const template = await Template.findOne({
                where: { categoryId, userId },
                include: [{ model: TemplateTransaction, as: "transactions" }]
            });


            if (!template) {
                return res.status(404).json({ message: "Aucun template trouvé pour cette catégorie." });
            }


            if (!template.transactions || template.transactions.length === 0) {
                return res.status(404).json({ message: "Le template ne contient aucune transaction." });
            }

            const { month, year } = req.body;
            if (!month || !year) {
                return res.status(400).json({ message: "Le mois et l'année sont requis." });
            }

            const period = await Period.findOne({ where: { month, year } });
            if (!period) {
                return res.status(404).json({ message: "Période non trouvée." });
            }


            await Transaction.destroy({ where: { categoryId, userId, periodId: period.id } });


            const transactionsToInsert = template.transactions.map((transaction) => ({
                categoryId,
                userId,
                periodId: period.id,
                name: transaction.name,
                amount: transaction.amount,
            }));

            const newTransactions = await Transaction.bulkCreate(transactionsToInsert);

            return res.status(201).json({
                message: "Template appliqué avec succès.",
                transactions: newTransactions,
            });

        } catch (error) {
            res.status(500).json({ message: "Une erreur est survenue lors de l'application du template", error });
        }
    },

    // UTILISER TEMPLATE PAR DEFAUT
        applyDefaultTemplateToCategory: async (req, res) => {
            try {
                const { categoryId, month, year } = req.body;
                const userId = req.userId;
                console.log("📡 Requête reçue pour appliquer un template par défaut ->", { categoryId, month, year, userId });

                // Vérification du template par défaut
                const template = await Template.findOne({
                    where: { categoryId, isDefault: true },
                    include: [{ model: TemplateTransaction, as: "transactions" }]
                });

                if (!template) {
                    console.error("Aucun template par défaut trouvé pour cette catégorie:", categoryId);
                    return res.status(404).json({ message: "Aucun template par défaut trouvé pour cette catégorie." });
                }

                if (!template.transactions || template.transactions.length === 0) {
                    console.error("⚠Le template par défaut existe mais ne contient aucune transaction !");
                    return res.status(404).json({ message: "Le template par défaut ne contient aucune transaction." });
                }

                // Vérification de la période
                const period = await Period.findOne({ where: { month, year } });
                if (!period) {
                    console.error("Période non trouvée pour le mois et l'année demandés ->", { month, year });
                    return res.status(404).json({ message: "Période non trouvée." });
                }

                console.log("Période trouvée:", period.id);

                // Suppression des transactions existantes
                await Transaction.destroy({ where: { categoryId, userId, periodId: period.id } });
                console.log("🗑 Transactions existantes supprimées pour la catégorie", categoryId);


                const transactionsToInsert = template.transactions.map(transaction => ({
                    categoryId,
                    userId,
                    periodId: period.id,
                    name: transaction.name,
                    amount: transaction.amount,
                }));

                const newTransactions = await Transaction.bulkCreate(transactionsToInsert);

                console.log("✅ Transactions insérées avec succès :", newTransactions.length);

                return res.status(201).json({
                    message: "Template par défaut appliqué avec succès.",
                    transactions: newTransactions,
                });

            } catch (error) {
                console.error("❌ Erreur lors de l'application du template par défaut :", error);
                res.status(500).json({ message: "Une erreur est survenue lors de l'application du template par défaut", error });
            }
        },


    // RECUPERER LES TEMPLATE PAR DEFAUT
    getDefaultTemplates: async (req, res) => {
        try {
            const templates = await Template.findAll({
                where: { isDefault: true },
                include: [
                    { model: Category, as: 'category', attributes: ['id', 'name'] },
                    { model: TemplateTransaction, as: 'transactions', attributes: ['id', 'name', 'amount'] }
                ]
            });

            return res.status(200).json(templates);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des templates par défaut", error });
        }
    },








};

module.exports = templateController;
