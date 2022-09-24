const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const middlewareVerify = require("../middleware/verifyToken");
router.get("/", postController.getPost);
router.post("/createPost", postController.createPost);
router.put("/:id", postController.editPost);
router.delete(
  "/:id",
  middlewareVerify.adminVerifyToken,
  postController.deletePost
);

module.exports = router;
