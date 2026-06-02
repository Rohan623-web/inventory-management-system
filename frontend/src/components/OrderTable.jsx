import {
  FiEye,
  FiXCircle,
  FiShoppingCart,
} from "react-icons/fi";

function OrderTable({
  orders,
  customers,
  onCancel,
  onView,
}) {
  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="table-title">
          Orders Management
        </h2>

        <span className="product-count">
          {orders.length} Orders
        </span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5">
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="product-cell">
                      <div className="product-icon">
                        <FiShoppingCart />
                      </div>

                      <div>
                        <div className="product-name">
                          Order #{order.id}
                        </div>

                        <div className="product-subtitle">
                          Sales Order
                        </div>
                      </div>
                    </div>
                  </td>

                 <td>
  {
    customers.find(
      (customer) =>
        customer.id ===
        order.customer_id
    )?.full_name || "Unknown"
  }
</td>

                  <td>
                    ₹
                    {Number(
                      order.total_amount
                    ).toLocaleString()}
                  </td>

                  <td>
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
                  </td>

                  <td>
                    <div className="action-buttons">
                     <button
  className="view-btn"
  onClick={() =>
    onView(order)
  }
>
  <FiEye />
</button>

                      {order.status !==
                        "CANCELLED" && (
                        <button
                          className="delete-btn"
                          onClick={() =>
                            onCancel(
                              order.id
                            )
                          }
                        >
                          <FiXCircle />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;