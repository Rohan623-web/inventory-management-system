import {
  FiEdit2,
  FiTrash2,
  FiPackage,
} from "react-icons/fi";

function ProductTable({
  products,
  onDelete,
  onEdit,
}) {
  const getStockStatus = (stock) => {
    if (stock < 5) {
      return {
        label: "Critical",
        className: "stock-critical",
      };
    }

    if (stock <= 10) {
      return {
        label: "Low",
        className: "stock-low",
      };
    }

    return {
      label: "Healthy",
      className: "stock-healthy",
    };
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="table-title">
          Product Inventory
        </h2>

        <span className="product-count">
          {products.length} Products
        </span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const status =
                getStockStatus(
                  product.stock_quantity
                );

              return (
                <tr key={product.id}>
                  <td>
                    <div className="product-cell">
                      <div className="product-icon">
                        <FiPackage />
                      </div>

                      <div>
                        <div>
  <div className="product-name">
    {product.name}
  </div>

  <div className="product-subtitle">
    Product Inventory Item
  </div>
</div>
                      </div>
                    </div>
                  </td>

                  <td>{product.sku}</td>

                  <td>
                    ₹
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </td>

                  <td>
                    {
                      product.stock_quantity
                    }
                  </td>

                  <td>
                    <span
                      className={
                        status.className
                      }
                    >
                      {status.label}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          onEdit(product)
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          onDelete(
                            product.id
                          )
                        }
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;