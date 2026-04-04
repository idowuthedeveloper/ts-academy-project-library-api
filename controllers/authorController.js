import Author from "../models/Author.js";
import dbConnection from "../config/DB.js";

dbConnection();

const authorController = {
  // Create new Author record in the database
  async createNewAuthor(req, res) {
    // get the data coming from the request
    const { bio, name } = req.body;

    // return an error if name is empty
    if (!name) {
      return res.status(412).json({ error: "Name is required" });
    }
    // return an error if name is not a string
    if (typeof name !== "string") {
      return res.status(412).json({ error: "Name cannot be a number" });
    }

    const author = new Author();
    author.name = name;
    author.bio = bio;
    await author.save();
    res.status(201).json({
      message: "New Author created successfully!",
    });
  },

  async allAuthors(req, res) {
    const authors = await Author.find();
    return res.status(200).json({ data: authors });
  },

  async oneAuthor(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(503).json({ error: "Author identity is missing!" });
    const author = await Author.findById(id).exec();
    if (!author)
      return res.status(404).json({ error: "Author cannot be found!" });
    return res.status(200).json({ data: author });
  },

  async updateAuthor(req, res) {
    const authors = await Author.find();
    return res.status(200).json({ data: authors });
  },
};

export default authorController;
