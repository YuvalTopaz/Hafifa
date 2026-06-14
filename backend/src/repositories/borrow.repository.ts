import { Book, BookBorrow, Customer, CustomerWallet } from "../models";
import { sequelize } from "../config/database";

export const borrowBookRepository = async (
  customerId: string,
  bookId: string,
) => {
  return sequelize.transaction(async (transaction) => {
    const customer = await Customer.findOne({
      where: {
        customer_id: customerId,
        is_active: true,
      },
      transaction,
    });

    if (!customer) {
      throw new Error("CUSTOMER_NOT_ACTIVE");
    }

    const book = await Book.findByPk(bookId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!book) {
      throw new Error("BOOK_NOT_FOUND");
    }

    if (!book.is_active) {
      throw new Error("BOOK_NOT_ACTIVE");
    }

    if (book.is_borrowed) {
      throw new Error("BOOK_ALREADY_BORROWED");
    }

    const wallet = await CustomerWallet.findByPk(customerId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!wallet) {
      throw new Error("WALLET_NOT_FOUND");
    }

    const bookPrice = Number(book.price);
    const currentBalance = Number(wallet.balance);

    if (currentBalance < bookPrice) {
      throw new Error("INSUFFICIENT_FUNDS");
    }

    await wallet.update(
      {
        balance: currentBalance - bookPrice,
      },
      { transaction },
    );

    const borrow = await BookBorrow.create(
      {
        borrower_id: customerId,
        book_id: bookId,
        borrow_date: new Date(),
        return_date: null,
      },
      { transaction },
    );

    await book.update(
      {
        is_borrowed: true,
      },
      { transaction },
    );

    return borrow;
  });
};

export const returnBookRepository = async (borrowId: number) => {
  return sequelize.transaction(async (transaction) => {
    const borrow = await BookBorrow.findByPk(borrowId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!borrow) {
      throw new Error("BORROW_NOT_FOUND");
    }

    if (borrow.return_date) {
      throw new Error("ALREADY_RETURNED");
    }

    await borrow.update(
      {
        return_date: new Date(),
      },
      { transaction },
    );

    await Book.update(
      {
        is_borrowed: false,
      },
      {
        where: {
          book_id: borrow.book_id,
        },
        transaction,
      },
    );

    return borrow;
  });
};

export const getCustomerActiveBorrowsRepository = async (
  customerId: string,
) => {
  return BookBorrow.findAll({
    where: {
      borrower_id: customerId,
      return_date: null,
    },
    include: [Book],
    order: [["borrow_date", "DESC"]],
  });
};

export const getCustomerBorrowHistoryRepository = async (
  customerId: string,
) => {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const borrows = await BookBorrow.findAll({
    where: {
      borrower_id: customerId,
    },
    include: [Book],
    order: [["borrow_date", "DESC"]],
  });

  return borrows.map((borrow) => {
    const plainBorrow = borrow.toJSON();

    return {
      ...plainBorrow,
      is_late:
        borrow.return_date === null &&
        new Date(borrow.borrow_date) < twoWeeksAgo,
    };
  });
};