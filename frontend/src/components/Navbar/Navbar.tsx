import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { isEmployee, logout } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#232544" }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src="/favicon.svg"
            alt="Library Logo"
            style={{ height: "40px" }}
          />

          <button
            className="btn btn-link text-white text-decoration-none ms-3"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>

        <div className="d-flex gap-4">
          <NavLink end className="text-white text-decoration-none" to="/app">
            Home
          </NavLink>

          <NavLink
            className="text-white text-decoration-none"
            to="/app/library"
          >
            Library
          </NavLink>

          <NavLink
            className="text-white text-decoration-none"
            to="/app/personal"
          >
            Personal
          </NavLink>
          {isEmployee && (
            <>
              <NavLink
                className="text-white text-decoration-none"
                to="/app/customers"
              >
                Customers
              </NavLink>

              <NavLink
                className="text-white text-decoration-none"
                to="/app/publishers"
              >
                Publishers
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
