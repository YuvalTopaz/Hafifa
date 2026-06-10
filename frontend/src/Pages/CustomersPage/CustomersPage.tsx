import { useState } from "react";
import { createEmployee } from "../../api/api";

export default function CustomersPage() {
  const [showForm, setShowForm] = useState(false);

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
      await createEmployee(form);

      alert("Employee created successfully");

      setForm({
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        password: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create employee");
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
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
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
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
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

          <button className="btn btn-success">
            Save Employee
          </button>
        </form>
      )}
    </main>
  );
}