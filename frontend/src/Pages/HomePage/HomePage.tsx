import { useState } from "react";
import CatalogHeader from "../../components/CatalogHeader";
import BookCard from "../../components/BookCard";
import TopBorrowedBooksPanel from "../../components/TopBorrowedBooksPanel";
import { SearchBar } from "../../components/SearchBar";
import type { Book } from "../../Types";
import { useAuth } from "../../context/AuthContext/useAuth";
import { useLibraryDataContext } from "../../context/LibraryDataContext/useLibraryDataContext";
import "./HomePage.css";

export default function HomePage() {
  const { isEmployee, isCustomer, user } = useAuth();

  const {
    books,
    authors,
    topBooks,
    wallet,
    isLoading,
    error,
    addBook,
    removeBook,
    borrowBookById,
  } = useLibraryDataContext();

  const [search, setSearch] = useState("");
  const [sortByPrice, setSortByPrice] = useState<"none" | "asc" | "desc">(
    "none",
  );
  const [availabilityFilter, setAvailabilityFilter] = useState<
    "all" | "available" | "borrowed"
  >("all");

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((book) => {
      if (availabilityFilter === "available") return !book.is_borrowed;
      if (availabilityFilter === "borrowed") return book.is_borrowed;
      return true;
    })
    .sort((a, b) => {
      if (sortByPrice === "asc") return Number(a.price) - Number(b.price);
      if (sortByPrice === "desc") return Number(b.price) - Number(a.price);
      return 0;
    });

  async function handleBorrow(bookId: string) {
    if (!user) return;

    try {
      await borrowBookById(bookId, user.person_id);
    } catch {
      alert("Failed to borrow book");
    }
  }

  async function handleDelete(bookId: string) {
    try {
      await removeBook(bookId);
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
        <div className="d-flex gap-3 mb-3 align-items-center flex-wrap">
          <SearchBar value={search} onChange={setSearch} />

          <select
            className="form-select"
            style={{ width: "200px" }}
            value={sortByPrice}
            onChange={(e) =>
              setSortByPrice(e.target.value as "none" | "asc" | "desc")
            }
          >
            <option value="none">Sort By Price</option>
            <option value="asc">Lowest Price First</option>
            <option value="desc">Highest Price First</option>
          </select>

          <select
            className="form-select"
            style={{ width: "200px" }}
            value={availabilityFilter}
            onChange={(e) =>
              setAvailabilityFilter(
                e.target.value as "all" | "available" | "borrowed",
              )
            }
          >
            <option value="all">All Books</option>
            <option value="available">Available Only</option>
            <option value="borrowed">Borrowed Only</option>
          </select>
        </div>

        <div className={isEmployee ? "home-with-sidebar" : ""}>
          <div>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="row justify-content-start g-3">
              {filteredBooks.map((book: Book) => (
                <div key={book.book_id} className="col-12 col-md-6 col-lg-4">
                  <BookCard
                    title={book.title}
                    price={book.price}
                    isBorrowed={book.is_borrowed}
                    canAfford={
                      isCustomer
                        ? wallet
                          ? wallet.balance >= Number(book.price)
                          : false
                        : true
                    }
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