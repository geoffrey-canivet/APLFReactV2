const express = require('express');
const cors = require('cors');
const router = require('./router');
const { sequelize } = require('./models');
const models = require('./models');
const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/', router);
app.get('/', (req, res) => {
    res.send('Server running!');
});

// DB
(async () => {
    try {
        await sequelize.sync(); // Pas de { force: true } pour éviter de tout réinitialiser

        console.log("Base de données synchronisée 🟢");

        // Ajout des catégories si elles n'existent pas
        const categories = [
            "charges", "credits", "assurances", "abonnements", "courantes", "loisirs", "occasionnelles",
            "depenses_divers", "revenu_actif", "revenu_passif", "revenu_exeptionnelles", "revenus_divers"
        ];

        for (const name of categories) {
            const [category, created] = await models.Category.findOrCreate({
                where: { name }, // Vérifie si la catégorie existe déjà
                defaults: { name }, // Sinon, insère la catégorie
            });

            if (created) {
                console.log(`Catégorie ajoutée : ${name}`);
            } else {
                console.log(`Catégorie déjà existante : ${name}`);
            }
        }

        // Ajout des périodes si elles n'existent pas
        for (let year = 2020; year <= 2025; year++) {
            for (let month = 1; month <= 12; month++) {
                await models.Period.findOrCreate({
                    where: { month, year }, // Vérifie si la période existe déjà
                    defaults: { month, year }, // Sinon, insère la période
                });
            }
        }

        console.log("Initialisation terminée 🟢");
    } catch (error) {
        console.error("Erreur lors de l'initialisation :", error);
    }
})();


app.listen(PORT, () => {
    console.log(`Serveur ok 🟢 -> http://localhost:${PORT}`);
});
