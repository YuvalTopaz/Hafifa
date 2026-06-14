import { useEffect, useState } from "react";
import {
  borrowBook,
  createAuthor,
  createBook,
  createEmployee,
  deleteAuthor,
  deleteBook,
  deleteCustomer,
  getAllCustomers,
  getAuthors,
  getBookById,
  getBooks,
  getCustomerBorrowHistory,
  getMyBorrows,
  login,
  registerCustomer,
  returnBook,
  getTopBorrowedBooks,
  depositMoney,
  getWallet,
  getAuthorPaymentReport,
} from "./api";
import type {
  Author,
  Book,
  BorrowedBook,
  Customer,
  CreateAuthorDto,
  CreateBookDto,
  CreateCustomerDto,
  CreateEmployeeDto,
  TopBorrowedBook,
  CustomerWallet,
  AuthorPaymentReport,
} from "../Types";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshBooks() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getBooks();
      setBooks(data);
    } catch {
      setError("Failed to load books");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getBooks();

        if (!ignore) {
          setBooks(data);
        }
      } catch {
        if (!ignore) {
          setError("Failed to load books");
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
  }, []);

  async function addBook(book: CreateBookDto) {
    const newBook = await createBook(book);
    setBooks((prev) => [...prev, newBook]);
    return newBook;
  }

  async function removeBook(id: string) {
    await deleteBook(id);
    setBooks((prev) => prev.filter((book) => book.book_id !== id));
  }

  return {
    books,
    isLoading,
    error,
    refreshBooks,
    reload: refreshBooks,
    addBook,
    removeBook,
  };
}

export function useBook(id: string | undefined) {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let ignore = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getBookById(id!);

        if (!ignore) {
          setBook(data);
        }
      } catch {
        if (!ignore) {
          setError("Failed to load book");
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
  }, [id]);

  return { book, isLoading, error };
}

export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshAuthors() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAuthors();
      setAuthors(data);
    } catch {
      setError("Failed to load authors");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getAuthors();

        if (!ignore) {
          setAuthors(data);
        }
      } catch {
        if (!ignore) {
          setError("Failed to load authors");
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
  }, []);

  async function addAuthor(data: CreateAuthorDto) {
    await createAuthor(data);
    await refreshAuthors();
  }

  async function removeAuthor(id: string) {
    await deleteAuthor(id);
    setAuthors((prev) => prev.filter((author) => author.author_id !== id));
  }

  return {
    authors,
    isLoading,
    error,
    refreshAuthors,
    addAuthor,
    removeAuthor,
  };
}

export function useMyBorrows(customerId: string | undefined) {
  const [borrows, setBorrows] = useState<BorrowedBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshBorrows() {
    if (!customerId) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await getMyBorrows(customerId);
      setBorrows(data);
    } catch {
      setError("Failed to load borrowed books");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!customerId) return;

    let ignore = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getMyBorrows(customerId!);

        if (!ignore) {
          setBorrows(data);
        }
      } catch {
        if (!ignore) {
          setError("Failed to load borrowed books");
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
  }, [customerId]);

  async function returnBorrow(borrowId: string) {
    await returnBook(borrowId);
    await refreshBorrows();
  }

  return {
    borrows,
    isLoading,
    error,
    refreshBorrows,
    returnBorrow,
  };
}

export function useBorrowBook() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function borrow(bookId: string, customerId: string) {
    try {
      setIsLoading(true);
      setError(null);

      return await borrowBook(bookId, customerId);
    } catch {
      setError("Failed to borrow book");
      throw new Error("Failed to borrow book");
    } finally {
      setIsLoading(false);
    }
  }

  return { borrow, isLoading, error };
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loginUser(email: string, password: string) {
    try {
      setIsLoading(true);
      setError(null);

      return await login(email, password);
    } catch {
      setError("Invalid email or password");
      throw new Error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return { loginUser, isLoading, error };
}

export function useRegisterCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(customer: CreateCustomerDto) {
    try {
      setIsLoading(true);
      setError(null);

      return await registerCustomer(customer);
    } catch {
      setError("Failed to register customer");
      throw new Error("Failed to register customer");
    } finally {
      setIsLoading(false);
    }
  }

  return { register, isLoading, error };
}

export function useCustomerBorrowHistory(customerId: string | undefined) {
  const [borrows, setBorrows] = useState<BorrowedBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) return;

    let ignore = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getCustomerBorrowHistory(customerId!);

        if (!ignore) {
          setBorrows(data);
        }
      } catch {
        if (!ignore) {
          setError("Failed to load borrowing history");
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
  }, [customerId]);

  return { borrows, isLoading, error };
}

export function useCreateEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addEmployee(employee: CreateEmployeeDto) {
    try {
      setIsLoading(true);
      setError(null);

      return await createEmployee(employee);
    } catch {
      setError("Failed to create employee");
      throw new Error("Failed to create employee");
    } finally {
      setIsLoading(false);
    }
  }

  return { addEmployee, isLoading, error };
}

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshCustomers() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAllCustomers();
      setCustomers(data);
    } catch {
      setError("Failed to load customers");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getAllCustomers();

        if (!ignore) {
          setCustomers(data);
        }
      } catch {
        if (!ignore) {
          setError("Failed to load customers");
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
  }, []);

  async function removeCustomer(id: string) {
    await deleteCustomer(id);
    setCustomers((prev) =>
      prev.filter((customer) => customer.customer_id !== id),
    );
  }

  return {
    customers,
    isLoading,
    error,
    refreshCustomers,
    removeCustomer,
  };
}

export function useTopBorrowedBooks() {
  const [books, setBooks] = useState<TopBorrowedBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshTopBooks() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getTopBorrowedBooks();
      setBooks(data);
    } catch {
      setError("Failed to load top borrowed books");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getTopBorrowedBooks();

        if (!ignore) {
          setBooks(data);
        }
      } catch {
        if (!ignore) {
          setError("Failed to load top borrowed books");
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
  }, []);

  return { books, isLoading, error, refreshTopBooks };
}

export function useWallet(customerId?: string) {
  const [wallet, setWallet] = useState<CustomerWallet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshWallet() {
    if (!customerId) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await getWallet(customerId);

      setWallet({
        ...data,
        balance: Number(data.balance),
      });
    } catch {
      setError("Failed to load wallet");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!customerId) return;

    let ignore = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getWallet(customerId!);

        if (!ignore) {
          setWallet({
            ...data,
            balance: Number(data.balance),
          });
        }
      } catch {
        if (!ignore) {
          setError("Failed to load wallet");
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
  }, [customerId]);

  return {
    wallet: customerId ? wallet : null,
    isLoading,
    error,
    refreshWallet,
  };
}

export function useWalletActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deposit(customerId: string, amount: number) {
    try {
      setIsLoading(true);
      setError(null);

      return await depositMoney(customerId, amount);
    } catch {
      setError("Failed to deposit money");
      throw new Error("Failed to deposit money");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    deposit,
    isLoading,
    error,
  };
}

export function useAuthorPaymentReport() {
  const [report, setReport] = useState<AuthorPaymentReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadReport(authorId: string) {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAuthorPaymentReport(authorId);

      setReport({
        ...data,
        total_payment: Number(data.total_payment),
        books: data.books.map((book) => ({
          ...book,
          price: Number(book.price),
          total: Number(book.total),
        })),
      });
    } catch {
      setError("Failed to load payment report");
      throw new Error("Failed to load payment report");
    } finally {
      setIsLoading(false);
    }
  }

  function clearReport() {
    setReport(null);
    setError(null);
  }

  return {
    report,
    isLoading,
    error,
    loadReport,
    clearReport,
  };
}