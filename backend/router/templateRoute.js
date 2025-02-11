const router = require("express").Router();
const templateController = require("../controllers/templateController");
const authMiddleware = require("../middlewares/authMiddleware");

// 🔹 Ajouter un nouveau template
router.post("/createTemplate", authMiddleware, templateController.addTemplate);

// 🔹 Supprimer un template
router.delete("/deleteTemplate", authMiddleware, templateController.deleteTemplate);

// 🔹 Modifier un template
router.put("/updateTemplate", authMiddleware, templateController.updateTemplate);

// 🔹 Ajouter une transaction à un template
router.post("/addTransactionToTemplate", authMiddleware, templateController.addTransactionToTemplate);

// 🔹 Récupérer tous les templates d'un utilisateur
router.get("/getUserTemplates", authMiddleware, async (req, res, next) => {
    console.log("📡 Requête reçue pour getUserTemplates !");
    next();
}, templateController.getUserTemplates);

// 🔹 Supprimer une transaction d'un template
router.delete("/deleteTransactionFromTemplate", authMiddleware, templateController.deleteTransactionFromTemplate);

// 🔹 Récupérer un template par son ID
router.get("/getTemplateById/:templateId", authMiddleware, templateController.getTemplateById);

// Utiliser un template
router.post("/useTemplate", authMiddleware, templateController.applyTemplateToCategory);




module.exports = router;
