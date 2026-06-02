import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import ConfirmModal from "../components/ConfirmModal";

import CustomerTable from "../components/CustomerTable";
import CustomerModal from "../components/CustomerModal";
import CustomerStats from "../components/CustomerStats";
import CustomerInsights from "../components/CustomerInsights";

import {
  getCustomers,
  createCustomer,
  deleteCustomer,
} from "../services/customerService";

import {
  showSuccess,
  showError,
} from "../utils/toast";

function Customers() {
  const [customers, setCustomers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data =
        await getCustomers();

      setCustomers(data);
    } catch {
      showError(
        "Failed to load customers"
      );
    }
  };

  const handleCreate = async (
    customerData
  ) => {
    try {
      await createCustomer(
        customerData
      );

      showSuccess(
        "Customer created successfully"
      );

      setShowModal(false);

      loadCustomers();
    } catch {
      showError(
        "Failed to create customer"
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCustomer(deleteId);

      showSuccess(
        "Customer deleted successfully"
      );

      setDeleteId(null);

      loadCustomers();
    } catch {
      showError(
        "Failed to delete customer"
      );
    }
  };

  const filteredCustomers =
    customers.filter((customer) =>
      `${customer.full_name}
       ${customer.email}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="container">
      <PageHeader
        title="Customers"
        subtitle="Manage customer records"
        buttonText="+ Add Customer"
        onButtonClick={() =>
          setShowModal(true)
        }
      />

      <CustomerInsights
        customers={customers}
      />

      <CustomerStats
        customers={customers}
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search customers..."
        count={
          filteredCustomers.length
        }
      />

      {filteredCustomers.length ===
      0 ? (
        <EmptyState
          title="No customers found"
          message="Create your first customer record."
          buttonText="Add Customer"
          onButtonClick={() =>
            setShowModal(true)
          }
        />
      ) : (
        <CustomerTable
          customers={
            filteredCustomers
          }
          onDelete={(id) =>
            setDeleteId(id)
          }
        />
      )}

      <CustomerModal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
        onSubmit={handleCreate}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Customer"
        message="Are you sure you want to delete this customer?"
        onConfirm={handleDelete}
        onCancel={() =>
          setDeleteId(null)
        }
      />
    </div>
  );
}

export default Customers;