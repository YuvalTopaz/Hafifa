import { Router } from "express";
import {
  depositMoney,
  getWallet,
} from "../controllers/wallet.controller";

const router = Router();

router.get("/:customerId", getWallet);

router.post("/:customerId/deposit", depositMoney);

export default router;