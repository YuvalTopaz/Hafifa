import axios from "axios";
import type { Book, BorrowedBook, CreateEmployeeDto, Customer } from "../Types";
import type { CreateBookDto } from "../Types";
import type { CreateCustomerDto } from "../Types";
import type { Author, CreateAuthorDto, TopBorrowedBook } from "../Types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const getTopBorrowedBooks = async (): Promise<TopBorrowedBook[]> => {
  const response = await api.get<TopBorrowedBook[]>("/books/top-borrowed");
  return response.data;
};

export const registerCustomer = async (customer: CreateCustomerDto) => {
  const response = await api.post("/auth/register", customer);
  return response.data;
};

export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>("/books");
  return response.data;
};

export const getBookById = async (id: string): Promise<Book> => {
  const response = await api.get<Book>(`/books/${id}`);
  return response.data;
};

export const createBook = async (book: CreateBookDto): Promise<Book> => {
  const response = await api.post<Book>("/books", book);

  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`/books/${id}`);
};

export const createEmployee = async (employee: CreateEmployeeDto) => {
  const response = await api.post("/employees", employee);
  return response.data;
};

export const borrowBook = async (bookId: string, customerId: string) => {
  const response = await api.post(`/books/${bookId}/borrow`, {
    customerId,
  });

  return response.data;
};

export const getMyBorrows = async (
  customerId: string,
): Promise<BorrowedBook[]> => {
  const response = await api.get<BorrowedBook[]>(
    `/customers/${customerId}/borrows`,
  );

  return response.data;
};

export const getCustomerBorrowHistory = async (
  customerId: string,
): Promise<BorrowedBook[]> => {
  const response = await api.get<BorrowedBook[]>(
    `/customers/${customerId}/borrows/history`,
  );

  return response.data;
};

export const returnBook = async (borrowId: string): Promise<void> => {
  await api.patch(`/borrows/${borrowId}/return`);
};

export const createAuthor = async (
  author: CreateAuthorDto,
): Promise<Author> => {
  const response = await api.post<Author>("/authors", author);
  return response.data;
};

export const getAuthors = async (): Promise<Author[]> => {
  const response = await api.get<Author[]>("/authors");
  return response.data;
};

export const deleteAuthor = async (id: string): Promise<void> => {
  await api.delete(`/authors/${id}`);
};

export async function getAllCustomers(): Promise<Customer[]> {
  const res = await api.get("/customers");
  return res.data;
}

export async function deleteCustomer(customerId: string): Promise<void> {
  await api.delete(`/customers/${customerId}`);
}