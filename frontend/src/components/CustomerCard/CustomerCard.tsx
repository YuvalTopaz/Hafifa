import type { Customer } from "../../Types";

type CustomerCardProps = {
  customer: Customer;
  onDelete: (customerId: string) => void;
  onViewHistory: (customerId: string) => void;
};

export default function CustomerCard({
  customer,
  onDelete,
  onViewHistory,
}: CustomerCardProps) {
  return (
    <div className="card p-3 shadow-sm h-100">
      <h5>
        {customer.first_name ?? "Unknown"} {customer.last_name ?? ""}
      </h5>

      <p className="text-muted mb-1">
        Birth date: {customer.birth_date ?? "Unknown"}
      </p>

      <p className="text-muted mb-3">
        Email: {customer.email ?? "Unknown"}
      </p>

      <div className="d-flex gap-2 mt-auto">
        <button
          className="btn btn-outline-primary"
          onClick={() => onViewHistory(customer.customer_id)}
        >
          View History
        </button>

        <button
          className="btn btn-outline-danger"
          onClick={() => onDelete(customer.customer_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}