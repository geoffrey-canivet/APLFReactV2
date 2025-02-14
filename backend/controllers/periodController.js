const { Period } = require("../models");

const periodController = {
    // TROUVER UNE PERIODE PAR MOIS/ANNEE
    findPeriod: async (req, res) => {
        try {
            const { month, year } = req.body;

            if (!month || !year) {
                return res.status(400).json({ message: "Mois et année requis." });
            }

            const period = await Period.findOne({
                where: { month, year }
            });

            if (!period) {
                return res.status(404).json({ message: `Aucune période trouvée pour ${month}/${year}.` });
            }

            res.status(200).json(period);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur lors de la récupération de la période", error });
        }
    }
};

module.exports = periodController;
