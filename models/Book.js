import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  isbn: { type: String, unique: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
  status: {
    type: String,
    enum: ["IN", "OUT"],
    default: "IN",
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    null: true,
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendant",
    null: true,
  },
  returnDate: { type: Date, null: true },
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
