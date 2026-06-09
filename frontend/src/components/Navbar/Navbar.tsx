import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#232544" }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img src="/favicon.svg" alt="Library Logo" style={{ height: "40px" }} />

          <button className="btn btn-link text-white text-decoration-none ms-3">
            LogOut
          </button>
        </div>

        <div className="d-flex gap-4">
          <NavLink className="text-white text-decoration-none" to="/">
            Home
          </NavLink>

          <NavLink className="text-white text-decoration-none" to="/library">
            Library
          </NavLink>

          <NavLink className="text-white text-decoration-none" to="/personal">
            Personal
          </NavLink>

          <NavLink className="text-white text-decoration-none" to="/customers">
            Customers
          </NavLink>

          <NavLink className="text-white text-decoration-none" to="/publishers">
            Publishers
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
