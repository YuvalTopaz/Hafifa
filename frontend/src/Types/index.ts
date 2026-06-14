export interface Book {
  book_id: string;
  title: string;
  price: number;
  authorId: number;
  is_borrowed: boolean;
  is_active: boolean;
}

export type TopBorrowedBook = {
  book_id: string;
  borrow_count: string;
  Book: {
    book_id: string;
    title: string;
    price: number;
  };
};

export type CustomerWallet = {
  customer_id: string;
  balance: number;
};

export interface CreateBookDto {
  title: string;
  author_id: string;
  price?: number;
  release_date?: string | null;
}

export type AuthorPaymentReport = {
  author_id: string;
  author_name: string;
  total_payment: number;
  books: {
    book_id: string;
    title: string;
    price: number;
    borrow_count: number;
    total: number;
  }[];
};

export type User = {
  person_id: string;
  email: string;
  first_name: string;
  last_name: string;
  isEmployee: boolean;
  isCustomer: boolean;
  isActiveCustomer: boolean;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isEmployee: boolean;
  isCustomer: boolean;
  isActiveCustomer: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export interface CreateCustomerDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
}

export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
}

export type BorrowedBook = {
  borrow_id: string;
  borrower_id: string;
  book_id: string;
  borrow_date: string;
  return_date: string | null;
  is_late: boolean;
  Book: {
    book_id: string;
    title: string;
    price: number;
  };
};

export type CreateAuthorDto = {
  first_name: string;
  last_name: string;
  birth_date: string;
};

export type Author = {
  author_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
};

export type Customer = {
  customer_id: string;
  first_name?: string;
  last_name?: string;
  birth_date?: string;
  email?: string;
  is_active?: boolean;
};