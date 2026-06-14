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

export const getTopBorrowedBooks = async (
  req: Request,
  res: Response,
) => {
  try {
    const books = await bookService.getTopBorrowedBooks();

    return res.json(books);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      dbError: error.parent?.message,
    });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.createBook(req.body);

    res.status(201).json(book);
  } catch (error: any) {
    if (error.message === "Missing book details") {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (error.message === "Book already exists") {
      return res.status(409).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: error.message,
      dbError: error.parent?.message,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await bookService.deleteBook(req.params.bookId as string);

    res.status(204).send();
  } catch (error: any) {
    if (error.message === "Book not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: error.message,
      dbError: error.parent?.message,
    });
  }
};