import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiBox,
  FiUsers,
  FiShoppingCart
} from "react-icons/fi";
function Navbar() {
  const location = useLocation();

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
  IMS
  <span
    style={{
      display: "block",
      fontSize: "13px",
      fontWeight: "400",
      opacity: 0.7,
      marginTop: "4px",
    }}
  >
    Inventory System
  </span>
</div>

      <div className="sidebar-links">

        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "sidebar-active"
              : ""
          }
        >
          <>
  <FiGrid />
  Dashboard
</>
        </Link>

        <Link
          to="/products"
          className={
            location.pathname === "/products"
              ? "sidebar-active"
              : ""
          }
        >
          <>
  <FiBox />
  Products
</>
        </Link>

        <Link
          to="/customers"
          className={
            location.pathname === "/customers"
              ? "sidebar-active"
              : ""
          }
        >
        <>
  <FiUsers />
  Customers
</>
        </Link>

        <Link
          to="/orders"
          className={
            location.pathname === "/orders"
              ? "sidebar-active"
              : ""
          }
        >
         <>
  <FiShoppingCart />
  Orders
</>
        </Link>

      </div>

    </div>
  );
}

export default Navbar;