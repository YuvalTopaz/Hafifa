import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  borrowBook,
  createAuthor,
  createBook,
  deleteAuthor,
  deleteBook,
  deleteCustomer,
  depositMoney,
  getAllCustomers,
  getAuthorPaymentReport,
  getAuthors,
  getBooks,
  getCustomerBorrowHistory,
  getMyBorrows,
  getTopBorrowedBooks,
  getWallet,
  returnBook,
} from "../../api/api";

import type {
  Author,
  Book,
  BorrowedBook,
  CreateAuthorDto,
  CreateBookDto,
  Customer,
  CustomerWallet,
  TopBorrowedBook,
  User,
} from "../../Types";

import { LibraryDataContext } from "./LibraryDataContext";

export function LibraryDataProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [topBooks, setTopBooks] = useState<TopBorrowedBook[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [myBorrows, setMyBorrows] = useState<BorrowedBook[]>([]);
  const [myBorrowHistory, setMyBorrowHistory] = useState<BorrowedBook[]>([]);
  const [wallet, setWallet] = useState<CustomerWallet | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshLibraryData = useCallback(
    async (currentUser?: User | null) => {
      const activeUser = currentUser ?? user;

      setIsLoading(true);
      setError(null);

      try {
        const [booksData, authorsData, topBooksData] = await Promise.all([
          getBooks(),
          getAuthors(),
          getTopBorrowedBooks(),
        ]);

        setBooks(booksData);
        setAuthors(authorsData);
        setTopBooks(topBooksData);

        if (activeUser?.isEmployee) {
          const customersData = await getAllCustomers();
          setCustomers(customersData);
        } else {
          setCustomers([]);
        }

        if (activeUser?.isCustomer) {
          const [borrowsData, walletData, historyData] = await Promise.all([
            getMyBorrows(activeUser.person_id),
            getWallet(activeUser.person_id),
            getCustomerBorrowHistory(activeUser.person_id),
          ]);

          setMyBorrows(borrowsData);
          setMyBorrowHistory(historyData);
          setWallet({
            ...walletData,
            balance: Number(walletData.balance),
          });
        } else {
          setMyBorrows([]);
          setMyBorrowHistory([]);
          setWallet(null);
        }
      } catch {
        setError("Failed to load library data");
      } finally {
        setIsLoading(false);
      }
    },
    [user],
  );

  useEffect(() => {
    let ignore = false;

    async function load() {
      const activeUser = user;

      try {
        setIsLoading(true);
        setError(null);

        const [booksData, authorsData, topBooksData] = await Promise.all([
          getBooks(),
          getAuthors(),
          getTopBorrowedBooks(),
        ]);

        if (ignore) return;

        setBooks(booksData);
        setAuthors(authorsData);
        setTopBooks(topBooksData);

        if (activeUser?.isEmployee) {
          const customersData = await getAllCustomers();

          if (!ignore) {
            setCustomers(customersData);
          }
        } else {
          setCustomers([]);
        }

        if (activeUser?.isCustomer) {
          const [borrowsData, walletData, historyData] = await Promise.all([
            getMyBorrows(activeUser.person_id),
            getWallet(activeUser.person_id),
            getCustomerBorrowHistory(activeUser.person_id),
          ]);

          if (!ignore) {
            setMyBorrows(borrowsData);
            setMyBorrowHistory(historyData);
            setWallet({
              ...walletData,
              balance: Number(walletData.balance),
            });
          }
        } else {
          setMyBorrows([]);
          setMyBorrowHistory([]);
          setWallet(null);
        }
      } catch {
        if (!ignore) {
          setError("Failed to load library data");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      ignore = true;
    };
  }, [user]);

  async function addBook(data: CreateBookDto) {
    const newBook = await createBook(data);

    setBooks((prev) => [...prev, newBook]);

    setAuthors((prev) =>
      prev.map((author) =>
        author.author_id === newBook.author_id
          ? { ...author, paymentReport: undefined }
          : author,
      ),
    );
  }

  async function removeBook(bookId: string) {
    await deleteBook(bookId);

    const deletedBook = books.find((book) => book.book_id === bookId);

    setBooks((prev) => prev.filter((book) => book.book_id !== bookId));

    setTopBooks((prev) => prev.filter((item) => item.book_id !== bookId));

    if (deletedBook) {
      setAuthors((prev) =>
        prev.map((author) =>
          author.author_id === deletedBook.author_id
            ? { ...author, paymentReport: undefined }
            : author,
        ),
      );
    }
  }

  async function borrowBookById(bookId: string, customerId: string) {
    const borrow = await borrowBook(bookId, customerId);

    const borrowedBook = books.find((book) => book.book_id === bookId);

    setBooks((prev) =>
      prev.map((book) =>
        book.book_id === bookId ? { ...book, is_borrowed: true } : book,
      ),
    );

    if (!borrowedBook) {
      return;
    }

    const borrowWithBook: BorrowedBook = {
      ...borrow,
      Book: borrow.Book ?? {
        book_id: borrowedBook.book_id,
        title: borrowedBook.title,
        price: borrowedBook.price,
      },
    };

    setWallet((prev) =>
      prev && prev.customer_id === customerId
        ? {
            ...prev,
            balance: prev.balance - Number(borrowedBook.price),
          }
        : prev,
    );

    setTopBooks((prev) => {
      const existing = prev.find((item) => item.book_id === bookId);

      if (existing) {
        return prev
          .map((item) =>
            item.book_id === bookId
              ? { ...item, borrow_count: item.borrow_count + 1 }
              : item,
          )
          .sort((a, b) => b.borrow_count - a.borrow_count)
          .slice(0, 10);
      }

      return [
        ...prev,
        {
          book_id: borrowedBook.book_id,
          borrow_count: 1,
          Book: {
            book_id: borrowedBook.book_id,
            title: borrowedBook.title,
            price: borrowedBook.price,
          },
        },
      ]
        .sort((a, b) => b.borrow_count - a.borrow_count)
        .slice(0, 10);
    });

    setAuthors((prev) =>
      prev.map((author) => {
        if (
          author.author_id !== borrowedBook.author_id ||
          author.paymentReport === undefined
        ) {
          return author;
        }

        return {
          ...author,
          paymentReport: {
            ...author.paymentReport,
            total_payment:
              author.paymentReport.total_payment + Number(borrowedBook.price),
          },
        };
      }),
    );

    setCustomers((prev) =>
      prev.map((customer) => {
        if (
          customer.customer_id !== customerId ||
          customer.borrowHistory === undefined
        ) {
          return customer;
        }

        return {
          ...customer,
          borrowHistory: [borrowWithBook, ...customer.borrowHistory],
        };
      }),
    );

    setMyBorrows((prev) =>
      wallet?.customer_id === customerId ? [borrowWithBook, ...prev] : prev,
    );

    setMyBorrowHistory((prev) =>
      wallet?.customer_id === customerId ? [borrowWithBook, ...prev] : prev,
    );
  }

  async function returnBorrowById(borrowId: number, bookId: string) {
    const returnedBorrow = await returnBook(borrowId);

    setBooks((prev) =>
      prev.map((book) =>
        book.book_id === bookId ? { ...book, is_borrowed: false } : book,
      ),
    );

    setMyBorrows((prev) =>
      prev.filter((borrow) => borrow.borrow_id !== borrowId),
    );

    setMyBorrowHistory((prev) =>
      prev.map((borrow) =>
        borrow.borrow_id === borrowId
          ? {
              ...borrow,
              return_date: returnedBorrow.return_date,
            }
          : borrow,
      ),
    );

    setCustomers((prev) =>
      prev.map((customer) => {
        if (customer.borrowHistory === undefined) {
          return customer;
        }

        return {
          ...customer,
          borrowHistory: customer.borrowHistory.map((borrow) =>
            borrow.borrow_id === borrowId
              ? {
                  ...borrow,
                  return_date: returnedBorrow.return_date,
                }
              : borrow,
          ),
        };
      }),
    );
  }

  async function addAuthor(data: CreateAuthorDto) {
    const newAuthor = await createAuthor(data);

    setAuthors((prev) => [...prev, newAuthor]);
  }

  async function removeAuthor(authorId: string) {
    await deleteAuthor(authorId);

    const removedBookIds = books
      .filter((book) => book.author_id === authorId)
      .map((book) => book.book_id);

    setAuthors((prev) =>
      prev.filter((author) => author.author_id !== authorId),
    );

    setBooks((prev) => prev.filter((book) => book.author_id !== authorId));

    setTopBooks((prev) =>
      prev.filter((item) => !removedBookIds.includes(item.book_id)),
    );
  }

  async function removeCustomer(customerId: string) {
    await deleteCustomer(customerId);

    setCustomers((prev) =>
      prev.filter((customer) => customer.customer_id !== customerId),
    );
  }

  async function depositToCustomerWallet(customerId: string, amount: number) {
    const updatedWallet = await depositMoney(customerId, amount);

    setWallet((prev) =>
      prev?.customer_id === customerId
        ? {
            ...updatedWallet,
            balance: Number(updatedWallet.balance),
          }
        : prev,
    );
  }

  async function loadCustomerBorrowHistory(customerId: string) {
    const existingCustomer = customers.find(
      (customer) => customer.customer_id === customerId,
    );

    if (existingCustomer?.borrowHistory !== undefined) {
      return existingCustomer.borrowHistory;
    }

    const history = await getCustomerBorrowHistory(customerId);

    setCustomers((prev) =>
      prev.map((customer) =>
        customer.customer_id === customerId
          ? { ...customer, borrowHistory: history }
          : customer,
      ),
    );

    return history;
  }

  async function loadAuthorPaymentReport(authorId: string) {
    const existingAuthor = authors.find(
      (author) => author.author_id === authorId,
    );

    if (existingAuthor?.paymentReport !== undefined) {
      return existingAuthor.paymentReport;
    }

    const report = await getAuthorPaymentReport(authorId);

    setAuthors((prev) =>
      prev.map((author) =>
        author.author_id === authorId
          ? { ...author, paymentReport: report }
          : author,
      ),
    );

    return report;
  }

  function clearAuthorPaymentReport(authorId: string) {
    setAuthors((prev) =>
      prev.map((author) =>
        author.author_id === authorId
          ? { ...author, paymentReport: undefined }
          : author,
      ),
    );
  }

  const value = {
  books,
  authors,
  topBooks,
  customers,
  myBorrows,
  myBorrowHistory,
  wallet,
  isLoading,
  error,
  refreshLibraryData,
  addBook,
  removeBook,
  borrowBookById,
  returnBorrowById,
  addAuthor,
  removeAuthor,
  removeCustomer,
  depositToCustomerWallet,
  loadCustomerBorrowHistory,
  loadAuthorPaymentReport,
  clearAuthorPaymentReport,
};

  return (
    <LibraryDataContext.Provider value={value}>
      {children}
    </LibraryDataContext.Provider>
  );
}