import express from "express";
import authorController from "../controllers/authorController.js";

const router = express.Router();

router.get("/", authorController.allAuthors);

router.get("/:id", authorController.oneAuthor);

router.post("/", authorController.createNewAuthor);

router.put("/:id", authorController.updateAuthor);

router.delete("/:id", authorController.deleteAuthor);

export default router;
