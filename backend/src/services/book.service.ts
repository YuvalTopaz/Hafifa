import { BookRepository } from "../repositories/book.repository";

const bookRepository = new BookRepository();

export class BookService {
  getAllBooks() {
    return bookRepository.findAll();
  }
}