import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";

const ProductContext = createContext();

const emitProductChange = () => {
  window.dispatchEvent(new CustomEvent("admin-data-changed", { detail: { table: "products" } }));
};

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    // Exclude id to let Supabase generate it
    const { id, ...newProduct } = product;
    const { data, error } = await supabase
      .from("products")
      .insert([newProduct])
      .select();
      
    if (error) {
      console.error("Error adding product:", error);
      return { success: false, error };
    } else if (data) {
      setProducts((prev) => [...prev, data[0]]);
      emitProductChange();
      return { success: true, data: data[0] };
    }
    return { success: true };
  };

  const updateProduct = async (id, updates) => {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating product:", error);
      return { success: false, error };
    } else if (data) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? data[0] : p))
      );
      emitProductChange();
      return { success: true, data: data[0] };
    }
    return { success: true };
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      return { success: false, error };
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      emitProductChange();
      return { success: true };
    }
  };

  const getProductById = useCallback(
    (id) => products.find((p) => p.id == id),
    [products]
  );

  const searchProducts = useCallback(
    (query, category = "All") => {
      const term = query.trim().toLowerCase();
      return products.filter((p) => {
        const matchesCategory =
          category === "All" || p.tag === category || p.category === category;
        const matchesSearch =
          !term ||
          p.name?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term) ||
          p.tag?.toLowerCase().includes(term);
        return matchesCategory && matchesSearch;
      });
    },
    [products]
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        searchProducts,
        refreshProducts: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
