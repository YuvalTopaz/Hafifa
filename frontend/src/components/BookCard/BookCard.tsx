import { Trash } from "react-bootstrap-icons";
import { useAuth } from "../../context/AuthContext/useAuth";

type BookCardProps = {
  title: string;
  price: number;
  isBorrowed: boolean;
  canAfford?: boolean;
  onBorrow?: () => void;
  onDelete?: () => void;
};

export default function BookCard({
  title,
  price,
  isBorrowed,
  canAfford = true,
  onBorrow,
  onDelete,
}: BookCardProps) {
  const { isEmployee, isActiveCustomer } = useAuth();

  const isBorrowDisabled = isBorrowed || !canAfford;

  function getBorrowButtonText() {
    if (isBorrowed) return "Already Borrowed";
    if (!canAfford) return "Not Enough Balance";
    return "Borrow Book";
  }

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title fw-bold mb-0">{title}</h5>

          {isEmployee && (
            <button
              className="btn btn-link p-0 text-secondary"
              onClick={onDelete}
            >
              <Trash />
            </button>
          )}
        </div>

        <p className="mt-4 mb-4">Price: ₪{Number(price).toFixed(2)}</p>

        <hr />

        {isActiveCustomer && (
          <>
            <button
              className="btn btn-primary btn-sm"
              onClick={onBorrow}
              disabled={isBorrowDisabled}
            >
              {getBorrowButtonText()}
            </button>

            {!isBorrowed && !canAfford && (
              <p className="text-danger small mt-2 mb-0">
                You do not have enough balance for this book.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
