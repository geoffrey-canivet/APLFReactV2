const express = require('express');
const router = express.Router();
const categoriesTransactionsController = require('../controllers/categoriesTransactionsController');
const authMiddleware = require("../middlewares/authMiddleware");


router.get('/categories-with-transactions', authMiddleware, categoriesTransactionsController.getAll)
router.get('/getFixe', authMiddleware, categoriesTransactionsController.getFixe)
router.get('/getOccasionnelle', authMiddleware, categoriesTransactionsController.getOccasionnelle)
router.get('/getRevenu', authMiddleware, categoriesTransactionsController.getRevenu)
module.exports = router;