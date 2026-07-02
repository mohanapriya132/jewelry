import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { ADMIN_CREDENTIALS } from "../data/adminData";

const AdminContext = createContext();

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("adminAuth") === "true"
  );
  
  const [tables, setTables] = useState({});
  const [loading, setLoading] = useState(false);

  // Authenticate logic
  const login = (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  // Generic CRUD
  const fetchTable = useCallback(async (tableName) => {
    setLoading(true);
    const { data, error } = await supabase.from(tableName).select("*").order("id");
    if (!error && data) {
      setTables((prev) => ({ ...prev, [tableName]: data }));
    }
    setLoading(false);
  }, []);

  const createRecord = async (tableName, payload) => {
    // Drop id if empty so Supabase can generate it
    const { id, ...rest } = payload;
    const finalPayload = (id === undefined || id === null || id === "") ? rest : { ...payload };

    // Get current user and append user_id
    const { data: authData } = await supabase.auth.getUser();
    if (authData?.user) {
      finalPayload.user_id = authData.user.id;
    }

    const { data, error } = await supabase.from(tableName).insert([finalPayload]).select();
    
    if (error) {
      console.error(`Error adding to ${tableName}:`, error);
      return { success: false, error };
    }
    
    if (data) {
      setTables((prev) => {
        const current = prev[tableName] || [];
        return { ...prev, [tableName]: [...current, data[0]] };
      });
      return { success: true, data: data[0] };
    }
  };

  const updateRecord = async (tableName, id, payload) => {
    const { data, error } = await supabase.from(tableName).update(payload).eq("id", id).select();

    if (error) {
      console.error(`Error updating ${tableName}:`, error);
      return { success: false, error };
    }
    
    if (data) {
      setTables((prev) => {
        const current = prev[tableName] || [];
        return { ...prev, [tableName]: current.map((item) => (item.id === id ? data[0] : item)) };
      });
      return { success: true, data: data[0] };
    }
  };

  const deleteRecord = async (tableName, id) => {
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    
    if (error) {
      console.error(`Error deleting from ${tableName}:`, error);
      return { success: false, error };
    }
    
    setTables((prev) => {
      const current = prev[tableName] || [];
      return { ...prev, [tableName]: current.filter((item) => item.id !== id) };
    });
    return { success: true };
  };

  // Legacy support for specific functions
  const updateOrderStatus = (id, status) => updateRecord("orders", id, { status });
  const updateReviewStatus = (id, status) => updateRecord("reviews", id, { status });
  const deleteReview = (id) => deleteRecord("reviews", id);
  
  const orders = tables.orders || [];
  const customers = tables.customers || [];
  const reviews = tables.reviews || [];

  useEffect(() => {
    if (isAuthenticated) {
      fetchTable("orders");
      fetchTable("customers");
      fetchTable("reviews");
    }
  }, [isAuthenticated, fetchTable]);

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        tables,
        fetchTable,
        createRecord,
        updateRecord,
        deleteRecord,
        loading,
        orders,
        customers,
        reviews,
        updateOrderStatus,
        updateReviewStatus,
        deleteReview,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
