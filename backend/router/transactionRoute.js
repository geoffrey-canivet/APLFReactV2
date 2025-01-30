const router = require("express").Router();
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/transaction", authMiddleware, transactionController.addTransaction);
router.post("/delete", authMiddleware, transactionController.deleteTransaction)
router.post("/delAllByCat",authMiddleware, transactionController.deleteAllTransactionsByCategory)
router.put("/update", authMiddleware, transactionController.updateTransaction)
module.exports = router;