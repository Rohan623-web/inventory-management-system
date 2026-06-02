import { useState } from "react";

function ProductForm({ onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock_quantity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      ...formData,
      price: Number(formData.price),
      stock_quantity: Number(formData.stock_quantity),
    });

    setFormData({
      name: "",
      sku: "",
      price: "",
      stock_quantity: "",
    });
  };

  return (
    <div className="table-container" style={{ marginBottom: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>
        Add Product
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "10px",
        }}
      >
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          name="stock_quantity"
          type="number"
          placeholder="Stock Quantity"
          value={formData.stock_quantity}
          onChange={handleChange}
        />

        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;