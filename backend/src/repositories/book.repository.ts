import { fn, col, literal } from "sequelize";
import { Book, BookBorrow } from "../models";

export class BookRepository {
  async findAll() {
    return Book.findAll({
      where: {
        is_active: true,
      },
    });
  }

  async findById(bookId: string) {
    return Book.findOne({
      where: {
        book_id: bookId,
        is_active: true,
      },
    });
  }

  async findExisting(title: string, authorId: string) {
    return Book.findOne({
      where: {
        title,
        author_id: authorId,
        is_active: true,
      },
    });
  }

  async create(data: {
    title: string;
    author_id: string;
    price?: number;
    release_date?: string | null;
  }) {
    return Book.create({
      title: data.title,
      author_id: data.author_id,
      price: data.price ?? 0,
      release_date: data.release_date ?? null,
    });
  }

  async deactivate(bookId: string) {
    const [affectedRows] = await Book.update(
      {
        is_active: false,
      },
      {
        where: {
          book_id: bookId,
          is_active: true,
        },
      },
    );

    return affectedRows;
  }

  async getTopBorrowedBooks() {
    return BookBorrow.findAll({
      attributes: [
        "book_id",
        [fn("COUNT", col("borrow_id")), "borrow_count"],
      ],
      include: [
        {
          model: Book,
          attributes: ["book_id", "title", "price"],
          where: {
            is_active: true,
          },
        },
      ],
      group: ["BookBorrow.book_id", "Book.book_id"],
      order: [[literal("borrow_count"), "DESC"]],
      limit: 10,
    });
  }
}