const express = require('express');
const cors = require('cors');
const router = require('./router');
const { sequelize } = require('./models');
const models = require('./models');
const morgan = require("morgan");
const app = express();

const PORT = 3000;

// Utilisation de Morgan en mode 'dev' (affiche des logs colorés)
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

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

        const categories = [
            {name: "charges", icon: "faHouse", color: "#74C0FC"},
            {name: "credits", icon: "faCreditCard", color: "#74C0FC"},
            {name: "assurances", icon: "faUmbrella", color: "#74C0FC"},
            {name: "abonnements", icon: "faTicket", color: "#74C0FC"},

            {name: "courantes", icon: "faAppleWhole", color: "#74C0FC"},
            {name: "Loisirs", icon: "faPlane", color: "#74C0FC"},
            {name: "Occasionnelles", icon: "faGift", color: "#74C0FC"},
            {name: "depenses_divers", icon: "faThumbtack", color: "#74C0FC"},

            {name: "revenu_actif", icon: "faMoneyBill", color: "#48AE6F"},
            {name: "revenu_passif", icon: "faThumbtack", color: "#48AE6F"},
            {name: "revenu_exeptionnelles", icon: "faMoneyBillWave", color: "#48AE6F"},
            {name: "revenus_divers", icon: "faSackDollar", color: "#48AE6F"},
        ];

        // Ajout des catégories
        for (const data of categories) {
            const [category, created] = await models.Category.findOrCreate({
                where: { name: data.name },
                defaults: data, // On passe l'objet complet qui contient name, icon, et color
            });

            if (created) {
                console.log(`Catégorie ajoutée : ${data.name}`);
            } else {
                console.log(`Catégorie déjà existante : ${data.name}`);
            }
        }

        // Ajout des périodes
        for (let year = 2020; year <= 2030; year++) {
            for (let month = 1; month <= 12; month++) {
                await models.Period.findOrCreate({
                    where: { month, year },
                    defaults: { month, year },
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
