const express = require("express");
const router = express.Router();
const periodController = require("../controllers/periodController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/findPeriod", authMiddleware, periodController.findPeriod);

module.exports = router;