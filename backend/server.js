const express = require('express');
const cors = require('cors');
const router = require('./router');
const { sequelize } = require('./models');
const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/', router);

// Routes
app.get('/', (req, res) => {
    res.send('Server running!');
});

// DB
sequelize.sync({ force: false })
    .then(() => {
        console.log("Base de données synchronisée 🟢");
    })
    .catch(err => {
        console.error("Erreur de synchronisation de la base de données 🔴 :", err);
    });

app.listen(PORT, () => {
    console.log(`Serveur ok 🟢 -> http://localhost:${PORT}`);
});
