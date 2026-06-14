import { Request, Response } from "express";
import {
  borrowBookService,
  returnBookService,
  getCustomerActiveBorrowsService,
  getCustomerBorrowHistoryService,
} from "../services/borrow.service";

type BorrowParams = {
  bookId: string;
};

type ReturnParams = {
  borrowId: string;
};

type CustomerParams = {
  customerId: string;
};

export const borrowBook = async (
  req: Request<BorrowParams>,
  res: Response,
) => {
  try {
    const { bookId } = req.params;
    const { customerId } = req.body;

    const result = await borrowBookService(customerId, bookId);

    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "CUSTOMER_NOT_ACTIVE") {
        return res.status(403).json({
          message: "Customer is not active",
        });
      }

      if (error.message === "BOOK_NOT_FOUND") {
        return res.status(404).json({
          message: "Book not found",
        });
      }

      if (error.message === "BOOK_ALREADY_BORROWED") {
        return res.status(409).json({
          message: "Book is already borrowed",
        });
      }
    }

    return res.status(500).json({
      message: "Failed to borrow book",
    });
  }
};

export const returnBook = async (
  req: Request<ReturnParams>,
  res: Response,
) => {
  try {
    const borrowId = Number(req.params.borrowId);

    const result = await returnBookService(borrowId);

    return res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "BORROW_NOT_FOUND") {
        return res.status(404).json({
          message: "Borrow record not found",
        });
      }

      if (error.message === "ALREADY_RETURNED") {
        return res.status(409).json({
          message: "Book already returned",
        });
      }
    }

    return res.status(500).json({
      message: "Failed to return book",
    });
  }
};

export const getCustomerActiveBorrows = async (
  req: Request<CustomerParams>,
  res: Response,
) => {
  try {
    const { customerId } = req.params;

    const result = await getCustomerActiveBorrowsService(customerId);

    return res.json(result);
  } catch {
    return res.status(500).json({
      message: "Failed to get active borrows",
    });
  }
};

export const getCustomerBorrowHistory = async (
  req: Request<CustomerParams>,
  res: Response,
) => {
  try {
    const { customerId } = req.params;

    const result = await getCustomerBorrowHistoryService(customerId);

    return res.json(result);
  } catch {
    return res.status(500).json({
      message: "Failed to get borrowing history",
    });
  }
};