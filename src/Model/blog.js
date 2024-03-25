const { Schema, model } = require("mongoose");

const BlogModel = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
  author_ID: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  category_desc: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  image: { type: String }, 
});

const BlogShcema = model("Blog", BlogModel);

module.exports = BlogShcema;
