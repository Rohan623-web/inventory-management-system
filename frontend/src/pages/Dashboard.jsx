import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboardData } from "../services/dashboardService";

import {
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiPlus,
} from "react-icons/fi";

function Dashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data =
        await getDashboardData();

      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <h2>
            Loading Dashboard...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">

        <h1 className="dashboard-title">
          Dashboard
        </h1>

        <p className="dashboard-subtitle">
          Monitor products,
          customers, orders and
          inventory from one place.
        </p>

        <div className="welcome-banner">
          <h2>
            Welcome Back 👋
          </h2>

          <p>
            Here's a quick overview
            of your inventory system.
          </p>
        </div>

      </div>

      {/* Stats Cards */}

      <div className="stats-grid">

        <div className="stat-card products-card">

          <div className="stat-icon">
            <FiBox />
          </div>

          <div className="stat-label">
            Total Products
          </div>

          <div className="stat-value">
            {
              dashboard.total_products
            }
          </div>

        </div>

        <div className="stat-card customers-card">

          <div className="stat-icon">
            <FiUsers />
          </div>

          <div className="stat-label">
            Total Customers
          </div>

          <div className="stat-value">
            {
              dashboard.total_customers
            }
          </div>

        </div>

        <div className="stat-card orders-card">

          <div className="stat-icon">
            <FiShoppingCart />
          </div>

          <div className="stat-label">
            Total Orders
          </div>

          <div className="stat-value">
            {
              dashboard.total_orders
            }
          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="quick-actions">

        <button
          onClick={() =>
            navigate("/products")
          }
        >
          <FiPlus />
          Add Product
        </button>

        <button
          onClick={() =>
            navigate("/customers")
          }
        >
          <FiPlus />
          Add Customer
        </button>

        <button
          onClick={() =>
            navigate("/orders")
          }
        >
          <FiPlus />
          Create Order
        </button>

      </div>

      {/* Inventory Insights */}

      <div className="dashboard-section">

        <div className="section-header">

          <h2>
            Inventory Insights
          </h2>

          <p>
            Products that may
            require replenishment.
          </p>

        </div>

        <div className="table-container">

          <h3 className="table-title">
            Low Stock Products
          </h3>

          <table>

            <thead>
              <tr>
                <th>
                  Product Name
                </th>

                <th>SKU</th>

                <th>
                  Stock Quantity
                </th>
              </tr>
            </thead>

            <tbody>

              {dashboard
                .low_stock_products
                .length === 0 ? (
                <tr>
                  <td colSpan="3">
                    ✅ Inventory levels
                    are healthy.
                  </td>
                </tr>
              ) : (
                dashboard.low_stock_products.map(
                  (product) => (
                    <tr
                      key={product.id}
                    >
                      <td>
                        {
                          product.name
                        }
                      </td>

                      <td>
                        {
                          product.sku
                        }
                      </td>

                      <td>
                        <span className="stock-badge">
                          {
                            product.stock_quantity
                          }
                        </span>
                      </td>
                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;