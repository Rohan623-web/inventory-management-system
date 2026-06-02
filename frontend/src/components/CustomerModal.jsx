import { useState } from "react";

function CustomerModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] =
    useState({
      full_name: "",
      email: "",
      phone: "",
    });

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

    onSubmit(formData);

    setFormData({
      full_name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        <div className="modal-header">
          <h2>Add Customer</h2>

          <p>
            Manage customer
            information
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="product-form-grid"
        >
          <div>
            <label>
              Full Name
            </label>

            <input
              name="full_name"
              value={
                formData.full_name
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div>
            <label>
              Phone Number
            </label>

            <input
              name="phone"
              value={formData.phone}
              onChange={
                handleChange
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

            <button
              type="submit"
            >
              Create Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerModal;