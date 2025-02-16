const { Template, TemplateTransaction } = require('../models');

const defaultTemplates = [
    {
        name: "Template Charges",
        categoryId: 1,
        transactions: [
            { name: "Loyer", amount: 0 },
            { name: "Électricité", amount: 0 },
            { name: "Gaz", amount: 0 },
            { name: "Eau", amount: 0 },
        ]
    },
    {
        name: "Template Crédits",
        categoryId: 2,
        transactions: [
            { name: "Voiture", amount: 0 },
            { name: "Hypothécaire", amount: 0 },
            { name: "Personnel", amount: 0 },
            { name: "Travaux", amount: 0 },
        ]
    },
    {
        name: "Template Assurances",
        categoryId: 3,
        transactions: [
            { name: "Syndicat", amount: 0 },
            { name: "Mutuelle", amount: 0 },
            { name: "Incendie", amount: 0 },
            { name: "Voiture", amount: 0 },
            { name: "Civile", amount: 0 },
        ]
    },
    {
        name: "Template Abonnements",
        categoryId: 4,
        transactions: [
            { name: "Cloud", amount: 0 },
            { name: "Netflix", amount: 0 },
            { name: "Internet", amount: 0 },
            { name: "TV", amount: 0 },
            { name: "Mobile", amount: 0 },
            { name: "Sport", amount: 0 },
        ]
    },
    {
        name: "Dépenses Courants",
        categoryId: 5,
        transactions: [
            { name: "Alimentaire", amount: 0 },
            { name: "Carburant", amount: 0 },
        ]
    },
    {
        name: "Dépenses Loisirs",
        categoryId: 6,
        transactions: [
            { name: "Cinéma", amount: 0 },
            { name: "Gaming", amount: 0 },
            { name: "Concert", amount: 0 },
            { name: "Restaurant", amount: 0 },
            { name: "Sorties", amount: 0 },
        ]
    },
    {
        name: "Dépenses Occasionnelles",
        categoryId: 7,
        transactions: [
            { name: "Médecin", amount: 0 },
            { name: "Médicaments", amount: 0 },
            { name: "Cadeau", amount: 0 },
            { name: "Coiffeur", amount: 0 },
            { name: "Vétérinaire", amount: 0 },
        ]
    },
    {
        name: "Dépenses Divers",
        categoryId: 8,
        transactions: [
            { name: "Taxe", amount: 0 },
            { name: "Frais bancaire", amount: 0 },
            { name: "Parking", amount: 0 },
            { name: "Avocat", amount: 0 },
            { name: "Comptable", amount: 0 },
            { name: "Investissement", amount: 0 },
        ]
    },
    {
        name: "Revenus Actifs",
        categoryId: 9,
        transactions: [
            { name: "Salaire", amount: 0 },
        ]
    },
    {
        name: "Revenus Passif",
        categoryId: 10,
        transactions: [
            { name: "Freelance", amount: 0 },
            { name: "Loyer parking", amount: 0 },
            { name: "Loyer maison", amount: 0 },
        ]
    },
    {
        name: "Revenus Occasionnelles",
        categoryId: 11,
        transactions: [
            { name: "Vente objet", amount: 0 },
            { name: "Primes", amount: 0 },
            { name: "Cadeaux", amount: 0 },
        ]
    },
    {
        name: "Revenus Divers",
        categoryId: 12,
        transactions: [
            { name: "Gains jeux", amount: 0 },
            { name: "Héritage", amount: 0 },
            { name: "Autres", amount: 0 },
        ]
    },
];

const seedTemplates = async () => {
    for (const templateData of defaultTemplates) {
        const existingTemplate = await Template.findOne({
            where: { name: templateData.name, isDefault: true }
        });

        if (!existingTemplate) {
            const template = await Template.create({
                name: templateData.name,
                categoryId: templateData.categoryId, // 🔥 Assignation directe
                isDefault: true
            });

            await TemplateTransaction.bulkCreate(templateData.transactions.map(t => ({
                templateId: template.id,
                name: t.name,
                amount: t.amount
            })));

            console.log(`✅ Template ajouté : ${templateData.name}`);
        } else {
            console.log(`⚠️ Template déjà existant : ${templateData.name}`);
        }
    }
};

module.exports = seedTemplates;
