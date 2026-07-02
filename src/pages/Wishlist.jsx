import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useProducts } from "../context/ProductContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart } = useShop();
  const { products } = useProducts();

  const savedProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-mist">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        <PageHeader eyebrow="Your Selection" title="Wishlist" />

        {savedProducts.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-16 h-16 text-slate/30 mb-6" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
            title="Your wishlist is empty"
            description="Explore our collections and save your favorite pieces to your wishlist."
            actionLabel="Discover Pieces"
            actionTo="/"
          />
        ) : (
          <div>
            <div className="mb-8 pb-6 border-b border-gold/20">
              <p className="text-sm text-slate font-body">
                {savedProducts.length} item{savedProducts.length !== 1 ? "s" : ""} in your wishlist
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col bg-white border border-gold/10 shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${product.id}`}
                    className="block relative overflow-hidden bg-mist"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 text-[9px] tracking-widest uppercase px-2.5 py-1 font-body font-medium bg-obsidian text-ivory">
                        {product.badge}
                      </span>
                    )}
                  </Link>

                  {/* Product Details */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[9px] tracking-widest uppercase text-gold/70 font-body mb-2">
                      {product.category}
                    </p>
                    <Link to={`/product/${product.id}`} className="hover:text-gold transition-colors mb-2">
                      <h3 className="font-display text-lg font-light text-obsidian leading-tight">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${
                            i < product.rating
                              ? "fill-gold text-gold"
                              : "fill-none text-slate/30"
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                      <span className="text-[9px] text-slate/50 font-body ml-1">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4 mt-auto">
                      <span className="font-body font-medium text-obsidian text-sm">
                        {product.price}
                      </span>
                      {product.original && (
                        <span className="font-body text-xs text-slate/40 line-through">
                          {product.original}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => moveToCart(product.id)}
                        className="flex-1 bg-obsidian text-ivory text-xs tracking-widest uppercase py-2.5 hover:bg-gold hover:text-obsidian transition-colors font-body font-medium flex items-center justify-center gap-2 group/btn"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="hidden sm:inline">Move to Cart</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="px-3 py-2.5 border border-slate/20 text-slate hover:border-red-400 hover:text-red-600 transition-colors font-body text-xs"
                        title="Remove from wishlist"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
