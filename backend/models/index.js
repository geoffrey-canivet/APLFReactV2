const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/db.js');

// ✅ Création de l'instance Sequelize
const sequelizeInstance = new Sequelize(config);

const db = {};

// ✅ Lecture des fichiers modèles et synchronisation avec la base de données
fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== 'index.js' &&
            file.slice(-3) === '.js'
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelizeInstance, DataTypes);
        db[model.name] = model;
    });

// ✅ Configuration des relations entre les modèles
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// ✅ Ajouter l'instance Sequelize et la classe Sequelize
db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

// 📌 Vérifier si les relations sont bien établies
console.log("📌 Modèles chargés :", Object.keys(db));
console.log("📌 Relations Transaction -> SubTransaction :", db.Transaction?.associations?.subTransactions);
console.log("📌 Relations SubTransaction -> Transaction :", db.SubTransaction?.associations?.transaction);

module.exports = db;
