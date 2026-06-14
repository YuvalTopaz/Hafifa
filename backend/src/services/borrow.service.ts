import {
  borrowBookRepository,
  returnBookRepository,
  getCustomerActiveBorrowsRepository,
  getCustomerBorrowHistoryRepository,
} from "../repositories/borrow.repository";

export const borrowBookService = async (
  customerId: string,
  bookId: string,
) => {
  return borrowBookRepository(customerId, bookId);
};

export const returnBookService = async (borrowId: number) => {
  return returnBookRepository(borrowId);
};

export const getCustomerActiveBorrowsService = async (
  customerId: string,
) => {
  return getCustomerActiveBorrowsRepository(customerId);
};

export const getCustomerBorrowHistoryService = async (
  customerId: string,
) => {
  return getCustomerBorrowHistoryRepository(customerId);
};