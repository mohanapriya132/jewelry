import { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useProducts } from "../context/ProductContext";
import { parsePrice, formatPrice } from "../utils/formatPrice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import { initializePayment } from "../utils/paymentService";

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, toggleWishlist, clearCart } = useShop();
  const { products } = useProducts();
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = cart
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      return product ? { ...product, quantity: cartItem.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );

  const tax = subtotal * 0.05;
  const shipping = subtotal > 0 ? 500 : 0;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    setIsProcessing(true);
    initializePayment({
      amount: total,
      currency: "INR", // Adjust based on your currency
      onSuccess: (data) => {
        setIsProcessing(false);
        console.log("Payment Success:", data);
        alert("Payment Successful! Your order has been placed.");
        // clearCart(); // Implement clearCart in your context if you want to clear on success
      },
      onFailure: (error) => {
        setIsProcessing(false);
        console.error("Payment Error:", error);
        alert("Payment Failed: " + (error.description || error.message || "Unknown error"));
      }
    });
  };

  return (
    <div className="min-h-screen bg-mist flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        <PageHeader eyebrow="Your Selection" title="Shopping Cart" />

        {cartItems.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-16 h-16 text-slate/30 mb-6" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            }
            title="Your cart is empty"
            description="You haven't added any items to your shopping cart yet. Discover our collections and find something you love."
            actionLabel="Continue Shopping"
            actionTo="/"
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
            <div className="lg:w-2/3 flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row bg-white border border-gold/10 p-4 gap-6 items-center shadow-sm relative group"
                >
                  <Link
                    to={`/product/${item.id}`}
                    className="block w-full sm:w-32 shrink-0 aspect-square overflow-hidden bg-mist"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <p className="text-[9px] tracking-widest uppercase text-gold/70 font-body">
                          {item.category}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleWishlist(item.id)}
                            className="text-slate/40 hover:text-gold transition-colors"
                            title="Add to wishlist"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate/40 hover:text-red-800 transition-colors"
                            title="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-display text-xl font-light text-obsidian hover:text-gold transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
                      <div className="flex items-center border border-obsidian/20">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-slate hover:text-obsidian hover:bg-mist transition-colors"
                        >
                          -
                        </button>
                        <span className="font-body text-sm text-obsidian w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-slate hover:text-obsidian hover:bg-mist transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-body font-medium text-obsidian">
                          {formatPrice(parsePrice(item.price) * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-xs text-slate/50 font-body mt-1">
                            {item.price} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white border border-gold/10 p-8 shadow-sm sticky top-32">
                <h3 className="font-display text-2xl font-light text-obsidian mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 font-body text-sm border-b border-gold/20 pb-6">
                  <div className="flex justify-between text-slate">
                    <span>Subtotal</span>
                    <span className="text-obsidian">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate">
                    <span>Estimated Tax (5%)</span>
                    <span className="text-obsidian">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-slate">
                    <span>Shipping</span>
                    <span className="text-obsidian">{formatPrice(shipping)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="font-display text-xl text-obsidian">Total</span>
                  <span className="font-body font-medium text-2xl text-gold-dark">
                    {formatPrice(total)}
                  </span>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-obsidian text-ivory text-xs tracking-widest uppercase py-4 hover:bg-gold hover:text-obsidian transition-colors font-body font-medium flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                  {!isProcessing && (
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}
                </button>

                <p className="text-center text-[10px] text-slate/50 mt-4 uppercase tracking-widest font-body">
                  Secure Checkout via Razorpay
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
