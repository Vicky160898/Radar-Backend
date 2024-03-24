const { Schema, model } = require("mongoose");

const AuthorModel = new Schema({
  full_name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String }, 
});

const AuthorShcema = model("Author", AuthorModel);

module.exports = AuthorShcema;
