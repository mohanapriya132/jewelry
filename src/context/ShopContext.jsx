import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { parsePrice } from "../utils/formatPrice";
import { useProducts } from "./ProductContext";

const ShopContext = createContext();

export function useShop() {
  return useContext(ShopContext);
}

export function ShopProvider({ children }) {
  const { products } = useProducts();

  const [wishlist, setWishlist] = useState(() =>
    loadFromStorage("wishlist", [])
  );

  const [cart, setCart] = useState(() => loadFromStorage("cart", []));

  useEffect(() => {
    saveToStorage("wishlist", wishlist);
  }, [wishlist]);

  useEffect(() => {
    saveToStorage("cart", cart);
  }, [cart]);

  const isInWishlist = (productId) => wishlist.includes(productId);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const addToCart = (productId, quantity = 1) => {
    if (quantity <= 0) return;
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: productId, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const moveToCart = (productId) => {
    addToCart(productId, 1);
    removeFromWishlist(productId);
  };

  const clearCart = () => setCart([]);

  const cartItemCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return acc;
      return acc + parsePrice(product.price) * item.quantity;
    }, 0);
  }, [cart, products]);

  return (
    <ShopContext.Provider
      value={{
        wishlist,
        cart,
        cartItemCount,
        cartTotal,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        moveToCart,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
