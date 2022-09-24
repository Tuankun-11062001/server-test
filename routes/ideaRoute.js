const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");

router.get("/", ideaController.getAllIdea);
router.post("/create", ideaController.postIdea);
router.put("/comment/:id", ideaController.commentIdea);
router.put("/:id", ideaController.editIdea);
router.delete("/:id", ideaController.deleteIdea);

module.exports = router;
