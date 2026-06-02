function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  customers,
  products,
}){
  if (!isOpen || !order) {
    return null;
  }
  const customer =
  customers?.find(
    (c) =>
      c.id ===
      order?.customer_id
  );

  return (
    <div className="modal-overlay">
      <div className="order-details-modal">
        <div className="modal-header">
          <h2>Order Details</h2>

          <p>
            View complete order
            information
          </p>
        </div>

        <div className="order-details-content">
          <div className="detail-row">
            <span>Order ID</span>
            <strong>{order.id}</strong>
          </div>

          <div className="detail-row">
            <span>Customer ID</span>
            <strong>
  {customer?.full_name ||
    "Unknown Customer"}
</strong>
          </div>

          <div className="detail-row">
            <span>Status</span>

            <span
              className={
                order.status ===
                "COMPLETED"
                  ? "status-completed"
                  : "status-cancelled"
              }
            >
              {order.status}
            </span>
          </div>

          <div className="detail-row">
            <span>Total Amount</span>

            <strong>
              ₹
              {Number(
                order.total_amount
              ).toLocaleString()}
            </strong>
          </div>

          <div className="items-section">
            <h3>Items</h3>

            {order.items?.map(
              (item, index) => (
                <div
                  key={index}
                  className="item-card"
                >
                  <p>
  Product:
  {
    products.find(
      (product) =>
        product.id ===
        item.product_id
    )?.name ||
      "Unknown Product"
  }
</p>

                  <p>
                    Quantity:
                    {" "}
                    {
                      item.quantity
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;