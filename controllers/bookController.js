import Book from "../models/Book.js";
import Student from "../models/Student.js";
import Attendant from "../models/Attendant.js";
import Author from "../models/Author.js";

const bookController = {
  options: {
    select:
      "_id title isbn authors status borrowedBy issuedBy returnDate createdAt",
  },
  // Create new Book record in the database
  async createNewBook(req, res) {
    // get the data coming from the request
    const { title, isbn, authors } = req.body;

    // return an error if title is empty
    if (!title) {
      return res.status(412).json({ error: "Title is required" });
    }
    // return an error if isbn is empty
    if (!isbn) {
      return res.status(412).json({ error: "ISBN is required" });
    }
    // return an error if authors is empty
    if (!authors || !Array.isArray(authors)) {
      return res
        .status(412)
        .json({ error: "Authors is required and must be an array" });
    }

    // return an error if title is not a string
    if (typeof title !== "string") {
      return res.status(412).json({ error: "Title must be a string" });
    }

    // return an error if isbn is not a string
    if (typeof isbn !== "string") {
      return res.status(412).json({ error: "ISBN must be a string" });
    }

    // return an error if authors is not an array
    if (!Array.isArray(authors)) {
      return res.status(412).json({ error: "Authors must be an array" });
    }

    const isbnExists = await Book.find({ isbn }).select("isbn");
    if (isbnExists.length >= 1)
      return res.status(403).json({ error: "ISBN already exists!" });

    const book = new Book();
    book.title = title;
    book.isbn = isbn;
    book.authors = authors;
    await book.save();
    res.status(201).json({
      message: "New Book created successfully!",
    });
  },

  async allBooks(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const skip = (page - 1) * limit;

    const Books = await Book.find()
      .skip(skip)
      .limit(limit)
      .populate("authors", "name bio")
      .setOptions(bookController.options);

    const total = await Book.countDocuments();
    // return res.json({ query_params: req.query });
    return res.status(200).json({
      data: Books,
      meta: {
        per_page: limit,
        current_page: page,
        total,
        total_pages: Math.ceil(total / limit),
      },
    });
  },

  async oneBook(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(503).json({ error: "Book identity is missing!" });
    const book = await Book.findById(id, null, bookController.options);
    if (!book) return res.status(404).json({ error: "Book cannot be found!" });
    return res.status(200).json({ data: book });
  },

  async updateBook(req, res) {
    const { title, isbn, authors, status } = req.body;
    // console.log(name, bio, req.body);
    // return;

    const BookDataFromReq = {};
    if (title && typeof title == "string") BookDataFromReq["title"] = title;
    if (isbn && typeof isbn == "string") BookDataFromReq["isbn"] = isbn;
    if (authors && Array.isArray(authors)) BookDataFromReq["authors"] = authors;
    if (status && typeof status == "string") BookDataFromReq["status"] = status;

    const { id } = req.params;

    if (!id)
      return res.status(503).json({ error: "Book identity is missing!" });
    try {
      const book = await Book.findByIdAndUpdate(id, BookDataFromReq, {
        ...bookController.options,
        returnDocument: "after",
      }).populate("authors");

      if (!book) {
        return res.status(404).json({
          error: "Book could not be found!",
        });
      }
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    return res.status(200).json({ data: book });
  },

  async borrowBook(req, res) {
    const { studentId, attendantId, returnDate } = req.body;
    // console.log(name, bio, req.body);
    // return;

    if (!studentId || !attendantId || !returnDate) {
      return res.status(412).json({ error: "All fields are required!" });
    }

    const student = await Student.findById(studentId);
    if (!student) return res.json({ error: "Invalid Student ID" });
    const attendant = await Attendant.findById(attendantId);
    if (!attendant) return res.json({ error: "Invalid Attendant ID" });

    const BookDataFromReq = {};
    if (studentId && typeof studentId == "string")
      BookDataFromReq["borrowedBy"] = studentId;
    if (attendantId && typeof attendantId == "string")
      BookDataFromReq["issuedBy"] = attendantId;
    if (returnDate && typeof returnDate == "string")
      BookDataFromReq["returnDate"] = returnDate;
    BookDataFromReq["status"] = "OUT";

    const { id } = req.params;

    const isItBorrowed = await Book.findById(id).populate("borrowedBy");
    if (isItBorrowed && isItBorrowed.status === "OUT") {
      const { borrowedBy } = isItBorrowed;
      return res.status(403).json({
        message: "Book is borrowed already, find other book!",
        borrowedBy,
      });
    }

    if (!id)
      return res.status(503).json({ error: "Book identity is missing!" });
    const book = await Book.findByIdAndUpdate(id, BookDataFromReq, {
      ...bookController.options,
      returnDocument: "after",
    }).populate(["authors", "borrowedBy", "issuedBy"]);

    if (!book) {
      return res.status(404).json({
        error: "Book could not be found!",
      });
    }

    return res.status(200).json({ data: book });
  },

  async returnBook(req, res) {
    const BookDataFromReq = {
      status: "IN",
      borrowedBy: null,
      returnDate: null,
      issuedBy: null,
    };

    const { id } = req.params;

    const isNOTBorrowed = await Book.findById(id).populate("borrowedBy");
    if (isNOTBorrowed && isNOTBorrowed.status === "IN") {
      return res.status(403).json({
        error: "Book NOT borrowed can't be returned!",
        book: isNOTBorrowed,
      });
    }

    if (!id)
      return res.status(503).json({ error: "Book identity is missing!" });
    const book = await Book.findByIdAndUpdate(id, BookDataFromReq, {
      ...bookController.options,
      returnDocument: "after",
    }).populate("authors");

    if (!book) {
      return res.status(404).json({
        error: "Book could not be found!",
      });
    }

    return res.status(200).json({ data: book });
  },

  async searchBookByTitleOrAuthor(req, res) {
    const q = req.query.q || "";

    if (!q)
      return res
        .status(400)
        .json({ message: "Title or Author is required for this search" });

    try {
      const authors = await Author.find({
        name: { $regex: q, $options: "i" },
      }).select("_id");
      console.log(authors);
      const authorIds = authors.map((author) => author._id);
      console.log(authorIds);
      const book = await Book.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { authors: { $in: authorIds } },
        ],
      }).populate("authors");
      return res.status(200).json({ data: book });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async deleteBook(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(503).json({ error: "Book identity is missing!" });
    const book = await Book.findByIdAndDelete(id);

    if (!book)
      return res.status(404).json({
        error: "Book could not be deleted because we couldn't found it!",
      });

    return res.status(200).json({ message: "Book deleted successfully!" });
  },
};

export default bookController;
