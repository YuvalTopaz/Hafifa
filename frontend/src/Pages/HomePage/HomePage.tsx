import CatalogHeader from "../../components/CatalogHeader";
import {
  useAuthors,
  useBooks,
  useBorrowBook,
  useTopBorrowedBooks,
} from "../../api/hooks";
import BookCard from "../../components/BookCard";
import TopBorrowedBooksPanel from "../../components/TopBorrowedBooksPanel";
import type { Book } from "../../Types";
import { useAuth } from "../../context/useAuth";
import "./HomePage.css"


export default function HomePage() {
  const { books, isLoading, error, refreshBooks, removeBook, addBook } =
    useBooks();

  const { books: topBooks, refreshTopBooks } = useTopBorrowedBooks();

  const { authors } = useAuthors();
  const { borrow } = useBorrowBook();
  const { isEmployee, user } = useAuth();

  async function handleBorrow(bookId: string) {
    if (!user) return;

    try {
      await borrow(bookId, user.person_id);
      await refreshBooks();
      await refreshTopBooks();
    } catch {
      alert("Failed to borrow book");
    }
  }

  async function handleDelete(bookId: string) {
    try {
      await removeBook(bookId);
      await refreshBooks();
      await refreshTopBooks();
    } catch {
      alert("Failed to delete book");
    }
  }

  return (
  <>
    {isEmployee && (
      <div className="container mt-4">
        <CatalogHeader authors={authors} onAddBook={addBook} />
      </div>
    )}

    <div className="container mt-4">
      <div className={isEmployee ? "home-with-sidebar" : ""}>
        <div>
          {isLoading ? "Loading..." : error ? <div>{error}</div> : null}

          <div className="row justify-content-start g-3">
            {books.map((book: Book) => (
              <div key={book.book_id} className="col-12 col-md-6 col-lg-4">
                <BookCard
                  title={book.title}
                  price={book.price}
                  isBorrowed={book.is_borrowed}
                  onBorrow={() => handleBorrow(book.book_id)}
                  onDelete={() => handleDelete(book.book_id)}
                />
              </div>
            ))}
          </div>
        </div>

        {isEmployee && (
          <aside className="top-books-sidebar">
            <TopBorrowedBooksPanel books={topBooks} />
          </aside>
        )}
      </div>
    </div>
  </>
);
}
