import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import OrderModal from "../components/OrderModal";
import OrderTable from "../components/OrderTable";
import SearchBar from "../components/SearchBar";
import OrderStats from "../components/OrderStats";
import OrderInsights from "../components/OrderInsights";
import ConfirmModal from "../components/ConfirmModal";
import RevenueCard from "../components/RevenueCard";
import OrderDetailsModal from "../components/OrderDetailsModal";
import {
  getOrders,
  createOrder,
  cancelOrder,
} from "../services/orderService";

import { getCustomers } from "../services/customerService";
import { getProducts } from "../services/productService";

import {
  showSuccess,
  showError,
} from "../utils/toast";

function Orders() {
  const [selectedOrder,
  setSelectedOrder] =
  useState(null);
  const [search, setSearch] =
    useState("");

  const [orders, setOrders] =
    useState([]);

  const [customers, setCustomers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);
  const [cancelOrderId, setCancelOrderId] =
  useState(null);

  const filteredOrders =
    orders.filter((order) =>
      order.id
        .toString()
        .includes(search)
    );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        ordersData,
        customersData,
        productsData,
      ] = await Promise.all([
        getOrders(),
        getCustomers(),
        getProducts(),
      ]);

     setOrders(ordersData);

console.log(
  "Orders From API:",
  ordersData
);
      setCustomers(customersData);
      setProducts(productsData);
    } catch (error) {
      console.error(error);

      showError(
        "Failed to load orders"
      );
    }
  };

  const handleCreate = async (
    orderData
  ) => {
    try {
      await createOrder(orderData);

      await loadData();

      showSuccess(
        "Order created successfully"
      );

      setShowModal(false);
    } catch (error) {
      showError(
        error.response?.data
          ?.detail ||
          "Failed to create order"
      );
    }
  };

  const handleCancel = async (
    orderId
  ) => {
    try {
      await cancelOrder(orderId);

      await loadData();

      showSuccess(
        "Order cancelled successfully"
      );
    } catch (error) {
      showError(
        error.response?.data
          ?.detail ||
          "Failed to cancel order"
      );
    }
  };

  return (
    <div className="container">
      <PageHeader
        title="Orders"
        subtitle="Manage customer orders"
        buttonText="+ Create Order"
        onButtonClick={() =>
          setShowModal(true)
        }
      />

     <OrderInsights
  orders={orders}
/>

<RevenueCard
  orders={orders}
/>

<OrderStats
  orders={orders}
/>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search orders..."
        count={filteredOrders.length}
      />

      <OrderTable
  orders={filteredOrders}
  customers={customers}
  onCancel={(id) =>
    setCancelOrderId(id)
  }
  onView={(order) =>
    setSelectedOrder(order)
  }
/>

      <OrderModal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
        onSubmit={handleCreate}
        customers={customers}
        products={products}
      />
      <ConfirmModal
  isOpen={!!cancelOrderId}
  title="Cancel Order"
  message="Are you sure you want to cancel this order?"
  onConfirm={() => {
    handleCancel(cancelOrderId);
    setCancelOrderId(null);
  }}
  onCancel={() =>
    setCancelOrderId(null)
  }
/>
<OrderDetailsModal
  isOpen={!!selectedOrder}
  order={selectedOrder}
  customers={customers}
  products={products}
  onClose={() =>
    setSelectedOrder(null)
  }
/>
    </div>
  );
}

export default Orders;