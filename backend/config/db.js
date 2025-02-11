require('dotenv').config(); // Charger les variables d'environnement

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    option: {
        trustServerCertificate: true
    }
};
