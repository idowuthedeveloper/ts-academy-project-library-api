import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "All Authors -> AuthorController.allAuthors" });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  return res.status(200).json({
    message: `Find Authors -> AuthorController.singleAuthor with id: ${id}`,
  });
});

router.post("/", (req, res) => {
  return res.status(201).json({
    message: "Create Authors -> AuthorController.createAuthor",
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  return res.status(201).json({
    message:
      "Update Authors -> AuthorController.createAuthor with id number " + id,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  return res.status(204).json({
    message:
      "Delete Authors -> AuthorController.createAuthor with id number " + id,
  });
});

export default router;
