const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require("./User");

const ideaSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
  body: { type: String },
  comment: { type: Schema.Types.Array },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
});

module.exports = mongoose.model("ideas", ideaSchema);
