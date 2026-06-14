import { useState } from "react";
import { useCreateEmployee, useCustomers } from "../../api/hooks";
import CustomerCard from "../../components/CustomerCard";
import CustomerBorrowHistory from "../../components/CustomerBorrowHistory";

export default function CustomersPage() {
  const { addEmployee, isLoading } = useCreateEmployee();

  const {
    customers,
    isLoading: isCustomersLoading,
    error,
    removeCustomer,
  } = useCustomers();

  const [showForm, setShowForm] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null,
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await addEmployee(form);

      alert("Employee created successfully");

      setForm({
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        password: "",
      });

      setShowForm(false);
    } catch {
      alert("Failed to create employee");
    }
  }

  async function handleDelete(customerId: string) {
    try {
      await removeCustomer(customerId);

      if (selectedCustomerId === customerId) {
        setSelectedCustomerId(null);
      }
    } catch {
      alert("Failed to delete customer");
    }
  }

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Customers</h1>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Create Employee"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
          <h2 className="mb-4">Create Employee</h2>

          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Birth Date</label>
            <input
              type="date"
              className="form-control"
              value={form.birthDate}
              onChange={(e) =>
                setForm({ ...form, birthDate: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Employee"}
          </button>
        </form>
      )}

      {selectedCustomerId && (
        <CustomerBorrowHistory
          customerId={selectedCustomerId}
          onClose={() => setSelectedCustomerId(null)}
        />
      )}

      <section>
        <h2 className="mb-3">All Customers</h2>

        {isCustomersLoading && <p>Loading customers...</p>}

        {error && <p className="text-danger">{error}</p>}

        {!isCustomersLoading && customers.length === 0 ? (
          <p className="text-muted">No customers found.</p>
        ) : (
          <div className="row g-3">
            {customers.map((customer) => (
              <div
                key={customer.customer_id}
                className="col-12 col-md-6 col-lg-4"
              >
                <CustomerCard
                  customer={customer}
                  onDelete={handleDelete}
                  onViewHistory={setSelectedCustomerId}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}