import express from "express";
import authorController from "../controllers/authorController.js";

const router = express.Router();

router.get("/", authorController.allAuthors);

router.get("/:id", authorController.oneAuthor);

router.post("/", authorController.createNewAuthor);

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
