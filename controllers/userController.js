const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const userController = {
  getAllUser: async (req, res) => {
    try {
      const allUser = await UserModel.find({});
      res.status(200).json(allUser);
    } catch (error) {
      res.status(404).json(error);
    }
  },
  createUser: async (req, res) => {
    try {
      const bodyUser = req.body;
      const user = await UserModel.findOne({ username: req.body.username });
      if (!user) {
        const newUser = await UserModel.create(bodyUser);
        await newUser.save();
        return res.status(201).json(bodyUser);
      }
      res.status(200).json({ message: "user exist" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await UserModel.findOne({ username: req.body.username });

      if (!user || user.password !== req.body.password) {
        return res
          .status(200)
          .json({ message: "username or password is incorrect" });
      }

      const token = jwt.sign(
        {
          id: user._id,
          admin: user.admin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const { password, ...rest } = user._doc;

      if (user.admin) {
        return res.status(200).json({ ...rest, token });
      }

      res.status(200).json({ ...rest, token });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  searchUser: async (req, res) => {
    try {
      const idUser = req.params.id;
      const user = await UserModel.findOne({ _id: idUser });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  updateUser: async (req, res) => {
    try {
      const idUser = req.params.id;
      const bodyUpdate = req.body;
      await UserModel.updateOne({ _id: idUser }, bodyUpdate);
      res.status(200).json(bodyUpdate);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const idUser = req.params.id;
      await UserModel.deleteOne({ _id: idUser });
      res.status(200).json({ message: "done" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};

module.exports = userController;
