import type { TopBorrowedBook } from "../../Types";

type Props = {
  books: TopBorrowedBook[];
};

export default function TopBorrowedBooksPanel({ books }: Props) {
  return (
    <aside className="card shadow-sm p-3">
      <h4 className="mb-3">Top 10 Borrowed Books</h4>

      {books.length === 0 ? (
        <p className="text-muted mb-0">No borrowed books yet.</p>
      ) : (
        <ol className="list-group list-group-numbered">
          {books.map((book) => (
            <li
              key={book.book_id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div>
                <div className="fw-semibold">
                  {book.Book.title}
                </div>
                <small className="text-muted">
                  {book.borrow_count} borrows
                </small>
              </div>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}