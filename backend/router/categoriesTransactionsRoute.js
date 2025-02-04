const express = require('express');
const router = express.Router();
const categoriesTransactionsController = require('../controllers/categoriesTransactionsController');
const authMiddleware = require("../middlewares/authMiddleware");


router.get('/categories-with-transactions', authMiddleware, categoriesTransactionsController.getAll)
router.get('/getFixe', authMiddleware, categoriesTransactionsController.getFixe)
router.post("/getFixeByPeriod", authMiddleware, categoriesTransactionsController.getFixeByPeriod);
router.get('/getOccasionnelle', authMiddleware, categoriesTransactionsController.getOccasionnelle)
router.post('/getOccasionnelleByPeriod', authMiddleware, categoriesTransactionsController.getOccasionnelleByPeriod);
router.get('/getRevenu', authMiddleware, categoriesTransactionsController.getRevenu)
router.post('/getRevenuByPeriod', authMiddleware, categoriesTransactionsController.getRevenuByPeriod);
module.exports = router;