import { useState } from "react";

function OrderModal({
  isOpen,
  onClose,
  onSubmit,
  customers,
  products,
}) {
  const [customerId, setCustomerId] =
    useState("");

  const [productId, setProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      customer_id: customerId,
      items: [
        {
          product_id: productId,
          quantity: Number(quantity),
        },
      ],
    });

    setCustomerId("");
    setProductId("");
    setQuantity("");

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        <div className="modal-header">
          <h2>Create Order</h2>

          <p>
            Create and manage customer
            orders
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="product-form-grid"
        >
          <div>
            <label>Customer</label>

            <select
              value={customerId}
              onChange={(e) =>
                setCustomerId(
                  e.target.value
                )
              }
              required
            >
              <option value="">
                Select Customer
              </option>

              {customers.map(
                (customer) => (
                  <option
                    key={customer.id}
                    value={
                      customer.id
                    }
                  >
                    {
                      customer.full_name
                    }
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label>Product</label>

            <select
              value={productId}
              onChange={(e) =>
                setProductId(
                  e.target.value
                )
              }
              required
            >
              <option value="">
                Select Product
              </option>

              {products.map(
                (product) => (
                  <option
                    key={product.id}
                    value={
                      product.id
                    }
                  >
                    {product.name}
                    {" "}
                    (
                    Stock:
                    {" "}
                    {
                      product.stock_quantity
                    }
                    )
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label>Quantity</label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderModal;