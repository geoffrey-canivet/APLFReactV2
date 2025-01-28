const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/", authMiddleware);


module.exports = router;
