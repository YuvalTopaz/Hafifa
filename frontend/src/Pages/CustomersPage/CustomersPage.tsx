import { useState } from "react";
import { useCreateEmployee } from "../../api/hooks";
import CustomerBorrowHistory from "../../components/CustomerBorrowHistory";
import EntityCard from "../../components/EntityCard";
import { SearchBar } from "../../components/SearchBar";
import { useLibraryDataContext } from "../../context/LibraryDataContext/useLibraryDataContext";

export default function CustomersPage() {
  const { addEmployee, isLoading } = useCreateEmployee();

  const {
    customers,
    isLoading: isCustomersLoading,
    error,
    removeCustomer,
    depositToCustomerWallet,
  } = useLibraryDataContext();

  const [isDepositLoading, setIsDepositLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null,
  );
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
  });

  const filteredCustomers = customers.filter((customer) => {
    const fullName = `${customer.first_name ?? ""} ${customer.last_name ?? ""}`;
    const email = customer.email ?? "";

    return (
      fullName.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
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

  async function handleDeposit(customerId: string) {
    const amountInput = prompt("Enter amount to deposit:");

    if (!amountInput) return;

    const amount = Number(amountInput);

    if (Number.isNaN(amount) || amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    try {
      setIsDepositLoading(true);
      await depositToCustomerWallet(customerId, amount);
      alert("Money deposited successfully");
    } catch {
      alert("Failed to deposit money");
    } finally {
      setIsDepositLoading(false);
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

          <input
            className="form-control mb-3"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            required
          />

          <input
            type="date"
            className="form-control mb-3"
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            className="form-control mb-4"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

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

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search customers..."
        />

        {isDepositLoading && <p className="text-muted">Depositing money...</p>}
        {isCustomersLoading && <p>Loading customers...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!isCustomersLoading && customers.length === 0 ? (
          <p className="text-muted">No customers found.</p>
        ) : filteredCustomers.length === 0 ? (
          <p className="text-muted">No customers match your search.</p>
        ) : (
          <div className="row g-3">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.customer_id}
                className="col-12 col-md-6 col-lg-4"
              >
                <EntityCard
                  title={`${customer.first_name ?? "Unknown"} ${
                    customer.last_name ?? ""
                  }`}
                  actions={
                    <>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() =>
                          setSelectedCustomerId(customer.customer_id)
                        }
                      >
                        View History
                      </button>

                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleDeposit(customer.customer_id)}
                      >
                        Deposit
                      </button>

                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(customer.customer_id)}
                      >
                        Delete
                      </button>
                    </>
                  }
                >
                  <p className="text-muted mb-1">
                    Birth date: {customer.birth_date ?? "Unknown"}
                  </p>

                  <p className="text-muted mb-0">
                    Email: {customer.email ?? "Unknown"}
                  </p>
                </EntityCard>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}