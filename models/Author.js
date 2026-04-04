import mongoose from "mongoose";

const { Schema } = mongoose;

const authorSchema = new Schema({
  name: { type: String, required: true },
  bio: String,
  createdAt: { type: Date, default: Date.now },
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
