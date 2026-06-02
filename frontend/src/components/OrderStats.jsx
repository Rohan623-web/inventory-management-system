import {
  FiShoppingCart,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

function OrderStats({ orders }) {
  const completed = orders.filter(
    (order) =>
      order.status === "COMPLETED"
  ).length;

  const cancelled = orders.filter(
    (order) =>
      order.status === "CANCELLED"
  ).length;

  return (
    <div className="product-stats-grid">
      <div className="mini-stat-card total">
        <FiShoppingCart />

        <div>
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </div>
      </div>

      <div className="mini-stat-card healthy">
        <FiCheckCircle />

        <div>
          <h3>{completed}</h3>
          <p>Completed</p>
        </div>
      </div>

      <div className="mini-stat-card critical">
        <FiXCircle />

        <div>
          <h3>{cancelled}</h3>
          <p>Cancelled</p>
        </div>
      </div>
    </div>
  );
}

export default OrderStats;