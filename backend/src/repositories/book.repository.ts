import { Book } from "../models/book.model";

export class BookRepository {
  async findAll() {
    return Book.findAll();
  }

}