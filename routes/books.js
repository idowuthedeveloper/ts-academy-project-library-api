import express from "express";
import bookController from "../controllers/bookController.js";

const router = express.Router();

router.get("/", bookController.allBooks);

router.get("/:id", bookController.oneBook);

router.post("/", bookController.createNewBook);
router.post("/:id/borrow", bookController.borrowBook);
router.post("/:id/return", bookController.returnBook);
router.get("/search/book", bookController.searchBookByTitleOrAuthor);

router.put("/:id", bookController.updateBook);

router.delete("/:id", bookController.deleteBook);

export default router;
