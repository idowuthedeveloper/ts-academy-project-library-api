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
    message: `Find Books -> BookController.singleBook with id: ${id}`,
  });
});

router.post("/", (req, res) => {
  return res.status(201).json({
    message: "Create Books -> BookController.createBook",
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  return res.status(201).json({
    message: "Update Books -> BookController.createBook with id number " + id,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  return res.status(204).json({
    message: "Delete Books -> BookController.createBook with id number " + id,
  });
});

export default router;
