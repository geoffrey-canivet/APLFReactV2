const express = require("express");
const upload = require("../middlewares/multerMiddleware");
const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes pour les tickets
router.post("/upload", authMiddleware, upload.single("ticket"), ticketController.uploadTicket);
router.get("/user/:userId", authMiddleware, ticketController.getTicketsByUser);
router.get("/:id", authMiddleware, ticketController.getTicketById);
router.delete("/:id", authMiddleware, ticketController.deleteTicket);

module.exports = router;