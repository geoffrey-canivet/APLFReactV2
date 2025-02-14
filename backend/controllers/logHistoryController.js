const { LogHistory } = require('../models');

const logHistoryController = {
    // AJOUTER LOG
    addLogHistory: async (req, res) => {
        try {
            const { name, date, type, time } = req.body;
            const userId = req.userId;

            if (!userId || !name || !date || !time || !type) {
                return res.status(400).send({ message: "Tous les champs doivent être remplis" });
            }

            await LogHistory.create({ userId, name, date, type, time });
            return res.status(201).json({ message: "Log ajouté avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Une erreur est survenue lors de la création du log", error });
        }
    },

    // RÉCUPÉRER TOUS LES LOGS
    getAllLogHistory: async (req, res) => {
        try {
            const logs = await LogHistory.findAll();
            return res.status(200).json(logs);
        } catch (error) {
            res.status(500).json({ message: "Une erreur est survenue lors de la récupération des logs", error });
        }
    },

    // CHERCHER UN LOG PAR TYPE
    findLogHistoryByType: async (req, res) => {
        try {
            const { type } = req.params;
            if (!type) {
                return res.status(400).json({ message: "Le type est requis" });
            }

            const logs = await LogHistory.findAll({ where: { type } });
            if (logs.length === 0) {
                return res.status(404).json({ message: "Aucun log trouvé pour ce type" });
            }

            return res.status(200).json(logs);
        } catch (error) {
            res.status(500).json({ message: "Une erreur est survenue lors de la recherche des logs par type", error });
        }
    }
};

module.exports = logHistoryController;
