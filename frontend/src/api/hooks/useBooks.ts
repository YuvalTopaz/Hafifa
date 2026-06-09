import { useEffect, useState } from "react";
import { getBooks } from "../api";
import type { Book } from "../../Types";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null
  );

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      setIsLoading(true);

      const data = await getBooks();

      setBooks(data);
    } catch (error: unknown) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    books,
    isLoading,
    error,
    reload: loadBooks,
  };
}