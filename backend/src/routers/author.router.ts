import { Router } from "express";
import {
  create,
  deleteAuthor,
  getAll,
  getPaymentReport,
} from "../controllers/author.controller";

const router = Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id/payment-report", getPaymentReport);
router.delete("/:id", deleteAuthor);

export default router;