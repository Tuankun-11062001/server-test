const modelIdea = require("../models/Idea");
const ideaController = {
  getAllIdea: async (req, res) => {
    try {
      const allIdea = await modelIdea.find().populate("userId");
      res.status(200).json(allIdea);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  postIdea: async (req, res) => {
    try {
      const bodyIdea = req.body;
      const newIdea = new modelIdea(bodyIdea);
      await newIdea.save();
      res.status(200).json(bodyIdea);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  commentIdea: async (req, res) => {
    try {
      const idIdea = req.params.id;
      const bodyComment = req.body;
      const idea = await modelIdea.findById({ _id: idIdea });
      const { ...rest } = idea._doc;

      const updateComment = {
        ...rest,
        comment: [...rest.comment, bodyComment],
      };
      await modelIdea.updateOne({ _id: idIdea }, updateComment);
      res.status(200).json(updateComment);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  editIdea: async (req, res) => {
    try {
      const idIdea = req.params.id;
      const newBody = req.body;
      await modelIdea.updateOne({ _id: idIdea }, newBody);
      res.status(200).json(newBody);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteIdea: async (req, res) => {
    try {
      const idIdea = req.params.id;
      await modelIdea.deleteOne({ _id: idIdea });
      res.status(200).json({ message: "dome" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ideaController;
