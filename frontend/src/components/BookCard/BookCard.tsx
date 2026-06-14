import { Trash } from "react-bootstrap-icons";
import { useAuth } from "../../context/useAuth";

type BookCardProps = {
  title: string;
  price: number;
  isBorrowed: boolean;
  onBorrow?: () => void;
  onDelete?: () => void;
};

export default function BookCard({
  title,
  price,
  isBorrowed,
  onBorrow,
  onDelete,
}: BookCardProps) {
  const { isEmployee, isActiveCustomer } = useAuth();

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

        <p className="mt-4 mb-4">price: {price} $</p>

        <hr />
        {isActiveCustomer && (
          <button
            className="btn btn-primary btn-sm"
            onClick={onBorrow}
            disabled={isBorrowed}
          >
            {isBorrowed ? "Already Borrowed" : "Borrow Book"}
          </button>
        )}
      </div>
    </div>
  );
}
