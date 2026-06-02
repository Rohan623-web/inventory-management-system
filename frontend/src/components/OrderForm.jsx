import { useState } from "react";

function OrderForm({
  customers,
  products,
  onCreate,
}) {
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
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
  };

  return (
    <div
      className="table-container"
      style={{ marginBottom: "20px" }}
    >
      <h2 style={{ marginBottom: "15px" }}>
        Create Order
      </h2>

      <form
        className="form-grid"
        onSubmit={handleSubmit}
      >

        <select
          value={customerId}
          onChange={(e) =>
            setCustomerId(e.target.value)
          }
          required
        >
          <option value="">
            Select Customer
          </option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.full_name}
            </option>
          ))}
        </select>

        <select
          value={productId}
          onChange={(e) =>
            setProductId(e.target.value)
          }
          required
        >
          <option value="">
            Select Product
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name} (Stock: {product.stock_quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
          required
        />

        <button type="submit">
          Create Order
        </button>

      </form>
    </div>
  );
}

export default OrderForm;