import { Router } from "express";
import { getAll } from "../controllers/book.controller";

const router = Router();

router.get("/", getAll);

export default router;