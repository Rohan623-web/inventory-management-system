function ProductHealthCard({
  products,
}) {
  const healthy =
    products.filter(
      (p) => p.stock_quantity > 10
    ).length;

  const percentage =
    products.length === 0
      ? 0
      : Math.round(
          (healthy /
            products.length) *
            100
        );

  return (
    <div className="health-card">
      <h3>
        Inventory Health
      </h3>

      <div className="health-score">
        {percentage}%
      </div>

      <p>
        Products are well stocked
      </p>
    </div>
  );
}

export default ProductHealthCard;