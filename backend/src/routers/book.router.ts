import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAll,
  getTopBorrowedBooks,
} from "../controllers/book.controller";
import { borrowBook } from "../controllers/borrow.controller";

const router = Router();

router.get("/", getAll);

router.get("/top-borrowed", getTopBorrowedBooks);

router.post("/", createBook);

router.post("/:bookId/borrow", borrowBook);

router.delete("/:bookId", deleteBook);

export default router;
