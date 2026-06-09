import CatalogHeader from "../../components/CatalogHeader";
import { useBooks } from "../../api/hooks";
import BookCard from "../../components/BookCard";
import type { Book } from "../../Types";

export default function HomePage() {
  const { books, isLoading, error } = useBooks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="container mt-4">
        <CatalogHeader />
      </div>
      <div className="container">
        <div className="row justify-content-start g-3">
          {books.map((book: Book) => (
            <div key={book.id} className="col-12 col-md-6 col-lg-4">
              <BookCard title={book.title} price={book.price} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
