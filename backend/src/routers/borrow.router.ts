import { Router } from "express";
import { returnBook } from "../controllers/borrow.controller";

const router = Router();

router.patch("/:borrowId/return", returnBook);

export default router;