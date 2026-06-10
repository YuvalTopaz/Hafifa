import { Router } from "express";
import { login, registerCustomer } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/register", registerCustomer);

export default router;