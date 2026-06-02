import {
  FiPackage,
  FiTrendingUp,
  FiAlertTriangle,
  FiActivity,
} from "react-icons/fi";

function ProductStats({ products }) {
  const healthy = products.filter(
    (p) => p.stock_quantity > 10
  ).length;

  const low = products.filter(
    (p) =>
      p.stock_quantity >= 5 &&
      p.stock_quantity <= 10
  ).length;

  const critical = products.filter(
    (p) => p.stock_quantity < 5
  ).length;

  return (
    <div className="product-stats-grid">
      <div className="mini-stat-card total">
        <FiPackage />

        <div>
          <h3>{products.length}</h3>
          <p>Total Products</p>
        </div>
      </div>

      <div className="mini-stat-card healthy">
        <FiTrendingUp />

        <div>
          <h3>{healthy}</h3>
          <p>Healthy Stock</p>
        </div>
      </div>

      <div className="mini-stat-card low">
        <FiActivity />

        <div>
          <h3>{low}</h3>
          <p>Low Stock</p>
        </div>
      </div>

      <div className="mini-stat-card critical">
        <FiAlertTriangle />

        <div>
          <h3>{critical}</h3>
          <p>Critical Stock</p>
        </div>
      </div>
    </div>
  );
}

export default ProductStats;