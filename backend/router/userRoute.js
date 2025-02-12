const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// connexion
router.post("/login", userController.login);

// inscription
router.post("/register", userController.create);

router.get("/me", authMiddleware, userController.getUserInfo);

router.put("/updateUser", authMiddleware, userController.updateUser);

router.post("/uploadImage", authMiddleware, userController.uploadImage);

module.exports = router;
