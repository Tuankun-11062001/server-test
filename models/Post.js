const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String },
    body: { type: String },
    image: { type: String },
    description: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    stars: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Posts", PostSchema);
