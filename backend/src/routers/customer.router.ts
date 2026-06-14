import { Router } from "express";
import {
  getCustomerActiveBorrows,
  getCustomerBorrowHistory,
} from "../controllers/borrow.controller";
import { deleteCustomer, getAll } from "../controllers/customer.controller";

const router = Router();

router.get("/", getAll);

router.get("/:customerId/borrows", getCustomerActiveBorrows);

router.get("/:customerId/borrows/history", getCustomerBorrowHistory);

router.delete("/:customerId", deleteCustomer);

export default router;