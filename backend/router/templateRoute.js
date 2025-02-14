const router = require("express").Router();
const templateController = require("../controllers/templateController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/createTemplate", authMiddleware, templateController.addTemplate);

router.delete("/deleteTemplate", authMiddleware, templateController.deleteTemplate);

router.put("/updateTemplate", authMiddleware, templateController.updateTemplate);

router.post("/addTransactionToTemplate", authMiddleware, templateController.addTransactionToTemplate);

router.get("/getUserTemplates", authMiddleware, templateController.getUserTemplates);

router.delete("/deleteTransactionFromTemplate", authMiddleware, templateController.deleteTransactionFromTemplate);

router.get("/getTemplateById/:templateId", authMiddleware, templateController.getTemplateById);

router.post("/useTemplate", authMiddleware, templateController.applyTemplateToCategory);




module.exports = router;
