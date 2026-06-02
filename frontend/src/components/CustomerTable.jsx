import {
  FiTrash2,
} from "react-icons/fi";

function CustomerTable({
  customers,
  onDelete,
}) {
  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="table-title">
          Customer Directory
        </h2>

        <span className="product-count">
          {customers.length}
          {" "}Customers
        </span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map(
              (customer) => (
                <tr
                  key={
                    customer.id
                  }
                >
                  <td>
                    <div className="product-cell">
                      <div className="customer-avatar">
                        {
                          customer.full_name?.[0]
                        }
                      </div>

                      <div>
                        <div className="product-name">
                          {
                            customer.full_name
                          }
                        </div>

                        <div className="product-subtitle">
                          Customer
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    {
                      customer.email
                    }
                  </td>

                  <td>
                    {
                      customer.phone
                    }
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        onDelete(
                          customer.id
                        )
                      }
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerTable;