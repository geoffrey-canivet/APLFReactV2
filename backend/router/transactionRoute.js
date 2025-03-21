const router = require("express").Router();
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/transaction", authMiddleware, transactionController.addTransaction);

router.post("/delete", authMiddleware, transactionController.deleteTransaction)

router.post("/delAllByCat",authMiddleware, transactionController.deleteAllTransactionsByCategory)

router.post("/delAllByCatOccas",authMiddleware, transactionController.deleteAllTransactionsByCategoryOccas)

router.put("/update", authMiddleware, transactionController.updateTransaction)

router.put("/updateName", authMiddleware, transactionController.updateTransactionName)

router.put("/updateAmount", authMiddleware, transactionController.updateTransactionAmount)

router.delete('/deleteAllTransactions', authMiddleware, transactionController.deleteAllTransactions)

module.exports = router;