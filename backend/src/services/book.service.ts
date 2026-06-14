import { BookRepository } from "../repositories/book.repository";

const bookRepository = new BookRepository();

export class BookService {
  async getAllBooks() {
    return bookRepository.findAll();
  }

  async getBookById(bookId: string) {
    const book = await bookRepository.findById(bookId);

    if (!book) {
      throw new Error("Book not found");
    }

    return book;
  }

  async createBook(data: {
    title: string;
    author_id: string;
    price?: number;
    release_date?: string | null;
  }) {
    if (!data.title || !data.author_id) {
      throw new Error("Missing book details");
    }

    const existingBook = await bookRepository.findExisting(
      data.title,
      data.author_id,
    );

    if (existingBook) {
      throw new Error("Book already exists");
    }

    return bookRepository.create(data);
  }

  async deleteBook(bookId: string) {
    const affectedRows = await bookRepository.deactivate(bookId);

    if (affectedRows === 0) {
      throw new Error("Book not found");
    }
  }

  async getTopBorrowedBooks() {
    return bookRepository.getTopBorrowedBooks();
  }
}