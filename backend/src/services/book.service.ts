import { BookRepository } from "../repositories/book.repository";

const bookRepository = new BookRepository();

export class BookService {
  getAllBooks() {
    return bookRepository.findAll();
  }

  getBookById(id: number) {
    return bookRepository.findById(id);
  }

  createBook(data: { title: string; author_id: number; release_date: Date }) {
    return bookRepository.create(data);
  }
}