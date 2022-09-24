const modelPost = require("../models/Post");
const PostController = {
  createPost: async (req, res) => {
    try {
      const bodyPost = req.body;
      const post = new modelPost(bodyPost);
      await post.save();
      res.status(200).json(bodyPost);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },
  getPost: async (req, res) => {
    try {
      const posts = await modelPost.find().populate("userId");
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  editPost: async (req, res) => {
    try {
      const idPost = req.params.id;
      const bodyPost = req.body;
      await modelPost.updateOne({ _id: idPost }, bodyPost);
      res.status(200).json(bodyPost);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deletePost: async (req, res) => {
    try {
      const idPost = req.params.id;
      await modelPost.deleteOne({ _id: idPost });
      res.status(200).json({ message: "done" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = PostController;
