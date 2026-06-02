function RevenueCard({ orders }) {
  const revenue = orders
    .filter(
      (order) =>
        order.status ===
        "COMPLETED"
    )
    .reduce(
      (total, order) =>
        total +
        Number(order.total_amount),
      0
    );

  return (
    <div className="revenue-card">
      <div className="revenue-label">
        Total Revenue
      </div>

      <div className="revenue-value">
        ₹
        {revenue.toLocaleString()}
      </div>

      <div className="revenue-subtitle">
        From completed orders
      </div>
    </div>
  );
}

export default RevenueCard;