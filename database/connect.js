const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:${process.env.PASSWORD_DB}@cluster0.isnrgxr.mongodb.net/natural?retryWrites=true&w=majority`
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("something went wrong: " + error);
  }
};

module.exports = { connection };
