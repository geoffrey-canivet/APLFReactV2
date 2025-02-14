const router = require("express").Router();
const commerceController = require("../controllers/commerceController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/commerce", authMiddleware, commerceController.createCommerce);

router.get("/commerces", authMiddleware, commerceController.getAllCommerces);

router.delete('/deleteCommerce', authMiddleware, commerceController.deleteCommerce);

module.exports = router;