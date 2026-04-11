import Author from "../models/Author.js";

const authorController = {
  options: {
    select: "_id name bio createdAt",
  },
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
    const authors = await Author.find().setOptions(authorController.options);
    return res.status(200).json({ data: authors });
  },

  async oneAuthor(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(503).json({ error: "Author identity is missing!" });
    const author = await Author.findById(id, null, authorController.options);
    if (!author)
      return res.status(404).json({ error: "Author cannot be found!" });
    return res.status(200).json({ data: author });
  },

  async updateAuthor(req, res) {
    const { name, bio } = req.body;
    // console.log(name, bio, req.body);
    // return;

    const authorDataFromReq = {};
    if (name && typeof name == "string") authorDataFromReq["name"] = name;
    if (bio && typeof bio == "string") authorDataFromReq["bio"] = bio;

    const { id } = req.params;

    if (!id)
      return res.status(503).json({ error: "Author identity is missing!" });
    const author = await Author.findByIdAndUpdate(id, authorDataFromReq, {
      ...authorController.options,
      returnDocument: "after",
    });

    if (!author) {
      return res.status(404).json({
        error: "Author could not be found!",
      });
    }

    return res.status(200).json({ data: author });
  },

  async deleteAuthor(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(503).json({ error: "Author identity is missing!" });
    const author = await Author.findByIdAndDelete(id);

    if (!author)
      return res.status(404).json({
        error: "Author could not be deleted because we couldn't found it!",
      });

    return res.status(200).json({ message: "Author deleted successfully!" });
  },
};

export default authorController;
