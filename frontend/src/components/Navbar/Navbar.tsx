import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext/useAuth";
import { useLibraryDataContext } from "../../context/LibraryDataContext/useLibraryDataContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, isEmployee, isCustomer, logout } = useAuth();
  const { wallet } = useLibraryDataContext();

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

        <div className="text-white d-flex align-items-center gap-3">
          {isCustomer && wallet && (
            <span>Balance: ₪{wallet.balance.toFixed(2)}</span>
          )}

          <span>
            Logged in as:{" "}
            <strong>
              {user?.first_name && user?.last_name
                ? `${user.first_name} ${user.last_name}`
                : user?.email}
            </strong>
          </span>
        </div>
      </div>
    </nav>
  );
}
