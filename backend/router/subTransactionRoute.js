const router = require("express").Router();
const subTransactionController = require("../controllers/subTransactionController");
const authMiddleware = require("../middlewares/authMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");

router.post('/addSubTransaction', authMiddleware,multerMiddleware.single("ticket"), subTransactionController.addSubTransaction);

router.get('/getSubTransactions', authMiddleware, subTransactionController.getSubTransactions);

router.delete('/deleteSubTransaction', authMiddleware, subTransactionController.deleteSubTransaction);

router.put('/updateSubTransaction', authMiddleware, subTransactionController.updateSubTransaction);

router.post("/getSubTransactionById", authMiddleware, subTransactionController.getSubTransactionById);

module.exports = router;