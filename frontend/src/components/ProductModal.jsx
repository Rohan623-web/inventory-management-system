import { useEffect, useState } from "react";

function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  product,
}) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock_quantity: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        sku: product.sku || "",
        price: product.price || "",
        stock_quantity:
          product.stock_quantity || "",
      });
    } else {
      setFormData({
        name: "",
        sku: "",
        price: "",
        stock_quantity: "",
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock_quantity: Number(
        formData.stock_quantity
      ),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        <div className="modal-header">
          <h2>
            {product
              ? "Edit Product"
              : "Add Product"}
          </h2>

          <p>
            Manage inventory and stock
            information
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="product-form-grid"
        >
          <div>
            <label>
              Product Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label>SKU</label>

            <input
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="Enter SKU"
              required
            />
          </div>

          <div>
            <label>Price</label>

            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label>
              Stock Quantity
            </label>

            <input
              name="stock_quantity"
              type="number"
              value={
                formData.stock_quantity
              }
              onChange={handleChange}
              placeholder="0"
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
              {product
                ? "Save Changes"
                : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;