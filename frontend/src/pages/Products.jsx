import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";
import EmptyState from "../components/EmptyState";
import ConfirmModal from "../components/ConfirmModal";
import ProductStats from "../components/ProductStats";
import ProductInsights from "../components/ProductInsights";
import ProductHealthCard
from "../components/ProductHealthCard";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/productService";

import {
  showSuccess,
  showError,
} from "../utils/toast";

function Products() {
  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingProduct,
    setEditingProduct] =
    useState(null);

  const [deleteId, setDeleteId] =
    useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      showError(
        "Failed to load products"
      );
    }
  };

  const handleCreate = async (
    productData
  ) => {
    try {
      await createProduct(productData);

      showSuccess(
        "Product created successfully"
      );

      setShowModal(false);

      loadProducts();
    } catch {
      showError(
        "Failed to create product"
      );
    }
  };

  const handleUpdate = async (
    productData
  ) => {
    try {
      await updateProduct(
        editingProduct.id,
        productData
      );

      showSuccess(
        "Product updated successfully"
      );

      setEditingProduct(null);

      loadProducts();
    } catch {
      showError(
        "Failed to update product"
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId);

      showSuccess(
        "Product deleted successfully"
      );

      setDeleteId(null);

      loadProducts();
    } catch {
      showError(
        "Failed to delete product"
      );
    }
  };

  const filteredProducts =
    products.filter((product) =>
      `${product.name} ${product.sku}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="container">
      <PageHeader
  title="Products"
  subtitle="Manage inventory and stock levels"
  buttonText="+ Add Product"
  onButtonClick={() =>
    setShowModal(true)
  }
/>

<ProductInsights
  products={products}
/>

<ProductHealthCard
  products={products}
/>

<ProductStats
  products={products}
/>

<SearchBar
  value={search}
  onChange={setSearch}
  placeholder="Search products..."
  count={filteredProducts.length}
/>

      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          message="Start by adding your first product."
          buttonText="Add Product"
          onButtonClick={() =>
            setShowModal(true)
          }
        />
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={(product) =>
            setEditingProduct(product)
          }
          onDelete={(id) =>
            setDeleteId(id)
          }
        />
      )}

      <ProductModal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
        onSubmit={handleCreate}
      />

      <ProductModal
        isOpen={!!editingProduct}
        onClose={() =>
          setEditingProduct(null)
        }
        onSubmit={handleUpdate}
        product={editingProduct}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onConfirm={handleDelete}
        onCancel={() =>
          setDeleteId(null)
        }
      />
    </div>
  );
}

export default Products;