import axios from "axios";
import type { Book, CreateEmployeeDto } from "../Types";
import type { CreateBookDto } from "../Types";
import type { CreateCustomerDto } from "../Types";

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

export const registerCustomer = async (
  customer: CreateCustomerDto
) => {
  const response = await api.post("/auth/register", customer);
  return response.data;
};

export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>("/books");
  return response.data;
};

export const getBookById = async (
  id: number
): Promise<Book> => {
  const response = await api.get<Book>(`/books/${id}`);
  return response.data;
};

export const createBook = async (
  book: CreateBookDto
): Promise<Book> => {
  const response = await api.post<Book>(
    "/books",
    book
  );

  return response.data;
};

export const deleteBook = async (
  id: number
): Promise<void> => {
  await api.delete(`/books/${id}`);
};

export const createEmployee = async (
  employee: CreateEmployeeDto
) => {
  const response = await api.post("/employees", employee);
  return response.data;
};