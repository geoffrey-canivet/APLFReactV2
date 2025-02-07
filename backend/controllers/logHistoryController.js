const { LogHistory } = require('../models');

const logHistoryController = {
    // AJOUTER LOG
    addLogHistory: async (req, res) => {
        console.log("test=> " ,req.body);
        try {
            const { name, date, type, time } = req.body;
            const userId = req.userId;

            // Validation
            if (!userId || !name || !date || !time || !type) {
                return res.status(400).send({ message: "Tous les champs doivent être remplis" });
            }
            console.log("logHistoryController: ", userId, name, date, type, time);

            // Création du log
            await LogHistory.create({ userId, name, date, type, time });
            return res.status(201).json({ message: "Log ajouté avec succès" });
        } catch (error) {
            console.error("Erreur lors de la création du log: ", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    },

    // RÉCUPÉRER TOUS LES LOGS
    getAllLogHistory: async (req, res) => {
        try {
            const logs = await LogHistory.findAll();
            return res.status(200).json(logs);
        } catch (error) {
            console.error("Erreur lors de la récupération des logs: ", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
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
            console.error("Erreur lors de la recherche des logs par type: ", error);
            res.status(500).json({ message: "Une erreur est survenue.", error });
        }
    }
};

module.exports = logHistoryController;
