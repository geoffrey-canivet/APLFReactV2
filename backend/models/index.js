const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize'); // Import Sequelize et DataTypes
const config = require('../config/db.js'); // Import de la configuration de la base de données

// Création d'une instance Sequelize avec la configuration
const sequelizeInstance = new Sequelize(config);

// Création d'un objet pour contenir tous les modèles et la configuration
const db = {};

// Lecture des fichiers modèles et synchronisation avec la base de données
fs.readdirSync(__dirname)
    .filter(file => {
        // Filtrer les fichiers modèles :
        // - Ignorer les fichiers commençant par un point
        // - Ignorer ce fichier (index.js)
        // - Inclure uniquement les fichiers se terminant par .js
        return (
            file.indexOf('.') !== 0 &&
            file !== 'index.js' &&
            file.slice(-3) === '.js'
        );
    })
    .forEach(file => {
        // Importer chaque modèle :
        // - Construire le chemin complet du fichier
        // - Importer le modèle avec require
        // - Passer l'instance Sequelize et DataTypes
        // - Ajouter le modèle à l'objet db avec son nom comme clé
        const model = require(path.join(__dirname, file))(sequelizeInstance, DataTypes);
        db[model.name] = model;
    });

// Configurer les relations entre les modèles, si elles existent
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Ajouter l'instance Sequelize et la classe Sequelize à l'objet db
db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

// Exporter l'objet db
module.exports = db;
