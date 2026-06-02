import {
  FiCheckCircle,
} from "react-icons/fi";

function ProductInsights({
  products,
}) {
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

  let status = "Excellent";

  if (critical > 0) {
    status = "Needs Attention";
  } else if (low > 0) {
    status = "Good";
  }

  return (
    <div className="insights-banner">
      <div>
        <h2>
          Inventory Overview
        </h2>

        <p>
          {products.length} Products •{" "}
          {healthy} Healthy •{" "}
          {low} Low Stock •{" "}
          {critical} Critical
        </p>
      </div>

      <div className="health-status">
        <FiCheckCircle />

        Inventory Health: {status}
      </div>
    </div>
  );
}

export default ProductInsights;