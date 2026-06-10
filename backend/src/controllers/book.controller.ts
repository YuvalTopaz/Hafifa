import { Request, Response } from "express";
import { BookService } from "../services/book.service";

const bookService = new BookService();

export const getAll = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      dbError: error.parent?.message,
    });
  }
};
