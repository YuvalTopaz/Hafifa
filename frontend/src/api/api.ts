import axios from "axios";
import type { Book } from "../Types";
import type { CreateBookDto } from "../Types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

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