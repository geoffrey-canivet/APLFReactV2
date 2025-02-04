const { Period } = require("../models");

const periodController = {
    // 📌 Trouver une période par mois et année (sans créer)
    findPeriod: async (req, res) => {
        try {
            const { month, year } = req.body;

            // Vérifier que le mois et l'année sont fournis
            if (!month || !year) {
                return res.status(400).json({ message: "Mois et année requis." });
            }

            console.log(`🔍 Recherche de la période pour ${month}/${year}`);

            // 🔍 Trouver la période existante
            const period = await Period.findOne({
                where: { month, year }
            });

            // Si la période n'existe pas, renvoyer un message d'erreur
            if (!period) {
                return res.status(404).json({ message: `Aucune période trouvée pour ${month}/${year}.` });
            }

            console.log(`✅ Période trouvée: ${period.id} - ${month}/${year}`);

            res.status(200).json(period);
        } catch (error) {
            console.error("❌ Erreur lors de la récupération de la période :", error);
            res.status(500).json({ message: "Erreur serveur.", error });
        }
    }
};

module.exports = periodController;
