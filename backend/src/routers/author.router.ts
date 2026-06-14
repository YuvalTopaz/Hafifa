import { Router } from "express";
import { create, deleteAuthor, getAll } from "../controllers/author.controller";

const router = Router();

router.post("/", create);
router.get("/", getAll);
router.delete("/:id", deleteAuthor);

export default router;