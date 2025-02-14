const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");


router.post("/login", userController.login);

router.post("/register", userController.create);

router.get("/me", authMiddleware, userController.getUserInfo);

router.put("/updateUser", authMiddleware, userController.updateUser);

router.post("/upload-avatar", authMiddleware, multerMiddleware.single("avatar"), userController.uploadAvatar);

module.exports = router;
