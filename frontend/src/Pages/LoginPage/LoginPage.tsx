import { useState } from "react";
import { useLogin } from "../../api/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useLogin();
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const result = await loginUser(email, password);

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
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

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
