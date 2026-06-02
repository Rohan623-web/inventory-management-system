import { useState } from "react";

function CustomerForm({ onCreate }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(formData);

    setFormData({
      full_name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="table-container" style={{ marginBottom: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>
        Add Customer
      </h2>

      <form
        className="form-grid"
        onSubmit={handleSubmit}
      >
        <input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Customer
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;