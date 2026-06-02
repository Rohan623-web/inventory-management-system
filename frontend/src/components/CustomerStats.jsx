import {
  FiUsers,
  FiMail,
  FiUserCheck,
} from "react-icons/fi";

function CustomerStats({
  customers,
}) {
  const total =
    customers.length;

  const withEmail =
    customers.filter(
      (c) => c.email
    ).length;

  return (
    <div className="product-stats-grid">
      <div className="mini-stat-card total">
        <FiUsers />

        <div>
          <h3>{total}</h3>
          <p>Total Customers</p>
        </div>
      </div>

      <div className="mini-stat-card healthy">
        <FiMail />

        <div>
          <h3>{withEmail}</h3>
          <p>With Email</p>
        </div>
      </div>

      <div className="mini-stat-card low">
        <FiUserCheck />

        <div>
          <h3>
            {total - withEmail}
          </h3>

          <p>No Email</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerStats;