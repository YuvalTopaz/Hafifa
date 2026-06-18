import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../api/hooks";
import { useAuth } from "../../context/AuthContext/useAuth";

export default function LoginPage() {
  const { loginUser } = useLogin();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  type FormField = keyof typeof form;

  function handleFormChange(field: FormField, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function renderInput(
    field: FormField,
    label: string,
    type = "text",
    placeholder = "",
  ) {
    return (
      <div className={field === "password" ? "mb-4" : "mb-3"}>
        <label htmlFor={field} className="form-label">
          {label}
        </label>

        <input
          id={field}
          type={type}
          className="form-control"
          placeholder={placeholder}
          value={form[field]}
          onChange={(e) => handleFormChange(field, e.target.value)}
          required
        />
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const result = await loginUser(form.email, form.password);

      login(result.token, result.user);

      navigate("/app");
    } catch {
      alert("Invalid email or password");
    }
  }

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-sm p-4"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <h1 className="text-center mb-4">Login</h1>

        <form onSubmit={handleSubmit}>
          {renderInput("email", "Email", "email", "Enter your email")}
          {renderInput(
            "password",
            "Password",
            "password",
            "Enter your password",
          )}

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account? </span>

            <Link to="/register" className="text-decoration-none">
              Create one
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}