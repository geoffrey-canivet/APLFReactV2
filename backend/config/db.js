require('dotenv').config();

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    option: {
        trustServerCertificate: true // Sécurité - pas pris en compte avec postgres
    }
};
