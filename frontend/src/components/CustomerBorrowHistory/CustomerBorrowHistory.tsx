import { useCustomerBorrowHistory } from "../../api/hooks";

type Props = {
  customerId: string;
  onClose: () => void;
};

export default function CustomerBorrowHistory({ customerId, onClose }: Props) {
  const { borrows, isLoading, error } = useCustomerBorrowHistory(customerId);

  return (
    <div className="card shadow-sm p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Borrowing History</h2>

        <button className="btn btn-outline-secondary" onClick={onClose}>
          Close
        </button>
      </div>

      {isLoading && <p>Loading history...</p>}

      {error && <p className="text-danger">{error}</p>}

      {!isLoading && borrows.length === 0 && (
        <p className="text-muted">No borrowing history found.</p>
      )}

      <div className="d-flex flex-column gap-3">
        {borrows.map((borrow) => (
          <div
            key={borrow.borrow_id}
            className={`border rounded p-3 ${
              borrow.is_late ? "border-danger bg-danger-subtle" : ""
            }`}
          >
            <div className="d-flex justify-content-between">
              <h5>{borrow.Book?.title ?? "Unknown book"}</h5>

              {borrow.is_late && (
                <span className="badge bg-danger">
                  Over 2 weeks not returned
                </span>
              )}
            </div>

            <p className="mb-1">
              Borrowed: {new Date(borrow.borrow_date).toLocaleDateString()}
            </p>

            <p className="mb-1">
              Returned:{" "}
              {borrow.return_date
                ? new Date(borrow.return_date).toLocaleDateString()
                : "Not returned yet"}
            </p>

            <p className="mb-0">Price: {borrow.Book?.price ?? 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
