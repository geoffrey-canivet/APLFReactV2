const router = require("express").Router();
const subTransactionController = require("../controllers/subTransactionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/addSubTransaction', authMiddleware, subTransactionController.addSubTransaction);
router.get('/getSubTransactions', authMiddleware, subTransactionController.getSubTransactions);
router.delete('/deleteSubTransaction', authMiddleware, subTransactionController.deleteSubTransaction);

module.exports = router;