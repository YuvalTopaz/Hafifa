import { createContext } from "react";

import type {
  Author,
  AuthorPaymentReport,
  Book,
  BorrowedBook,
  CreateAuthorDto,
  CreateBookDto,
  Customer,
  CustomerWallet,
  TopBorrowedBook,
  User,
} from "../../Types";

export type LibraryDataContextType = {
  books: Book[];
  authors: Author[];
  topBooks: TopBorrowedBook[];
  customers: Customer[];
  myBorrows: BorrowedBook[];
  myBorrowHistory: BorrowedBook[];
  wallet: CustomerWallet | null;

  isLoading: boolean;
  error: string | null;

  refreshLibraryData: (user?: User | null) => Promise<void>;

  addBook: (data: CreateBookDto) => Promise<void>;
  removeBook: (bookId: string) => Promise<void>;
  borrowBookById: (bookId: string, customerId: string) => Promise<void>;
  returnBorrowById: (borrowId: number, bookId: string) => Promise<void>;

  addAuthor: (data: CreateAuthorDto) => Promise<void>;
  removeAuthor: (authorId: string) => Promise<void>;

  removeCustomer: (customerId: string) => Promise<void>;
  depositToCustomerWallet: (
    customerId: string,
    amount: number,
  ) => Promise<void>;

  loadCustomerBorrowHistory: (customerId: string) => Promise<BorrowedBook[]>;
  loadAuthorPaymentReport: (
    authorId: string,
  ) => Promise<AuthorPaymentReport>;

  clearAuthorPaymentReport: (authorId: string) => void;
};

export const LibraryDataContext =
  createContext<LibraryDataContextType | null>(null);