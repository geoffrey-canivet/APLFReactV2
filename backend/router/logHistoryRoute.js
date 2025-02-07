const express = require('express');
const router = express.Router();
const logHistoryController = require('../controllers/logHistoryController');
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/addLogHistory', authMiddleware, logHistoryController.addLogHistory)
router.get('/getLogHistory', authMiddleware, logHistoryController.getAllLogHistory)
router.get('/findLogHistoryByType', authMiddleware, logHistoryController.findLogHistoryByType)

module.exports = router;