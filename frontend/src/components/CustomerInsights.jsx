function CustomerInsights({
  customers,
}) {
  return (
    <div className="insights-banner">
      <div>
        <h2>
          Customer Overview
        </h2>

        <p>
          Managing{" "}
          {customers.length}
          {" "}customer records
        </p>
      </div>

      <div className="health-status">
        Active Customer Base
      </div>
    </div>
  );
}

export default CustomerInsights;