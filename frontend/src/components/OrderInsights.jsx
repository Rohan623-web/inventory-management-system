function OrderInsights({ orders }) {
  const completed = orders.filter(
    (order) =>
      order.status === "COMPLETED"
  ).length;

  const cancelled = orders.filter(
    (order) =>
      order.status === "CANCELLED"
  ).length;

  return (
    <div className="insights-banner">
      <div>
        <h2>Order Overview</h2>

        <p>
          {orders.length} Orders •{" "}
          {completed} Completed •{" "}
          {cancelled} Cancelled
        </p>
      </div>

      <div className="health-status">
        Order Processing Active
      </div>
    </div>
  );
}

export default OrderInsights;