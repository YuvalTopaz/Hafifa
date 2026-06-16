import type { BorrowedBook } from "../../Types";

type BorrowedBookCardProps = {
  borrow: BorrowedBook;
  onReturn: (borrowId: number) => void;
};

export default function BorrowedBookCard({
  borrow,
  onReturn,
}: BorrowedBookCardProps) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{borrow.Book.title}</h5>

        <p className="card-text text-muted">
          Borrowed at: {new Date(borrow.borrow_date).toLocaleDateString()}
        </p>

        <p className="card-text">
          <strong>Price:</strong> ₪{borrow.Book.price}
        </p>

        <button
          className="btn btn-outline-primary mt-auto"
          onClick={() => onReturn(borrow.borrow_id)}
        >
          Return Book
        </button>
      </div>
    </div>
  );
}