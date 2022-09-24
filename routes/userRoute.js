const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
router.get("/", userController.getAllUser);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/:id", userController.searchUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
