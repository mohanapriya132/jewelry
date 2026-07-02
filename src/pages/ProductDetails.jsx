import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useProducts } from "../context/ProductContext";
import { useShop } from "../context/ShopContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { isInWishlist, toggleWishlist, addToCart } = useShop();

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-mist flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-24 px-6 text-center">
          <h1 className="font-display text-3xl text-obsidian mb-4">Product Not Found</h1>
          <Link to="/" className="text-gold hover:underline font-body text-sm">
            Return to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mist flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        <nav className="mb-10 text-[10px] tracking-widest uppercase font-body text-slate/60 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link to={`/search?category=${product.category}`} className="hover:text-gold transition-colors">
            {product.category}
          </Link>
          <span>›</span>
          <span className="text-gold">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col py-6">
            <h1 className="font-display text-4xl md:text-5xl font-light text-obsidian mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8 border-b border-gold/20 pb-8">
              <span className="font-body text-2xl font-medium text-obsidian">
                {product.price}
              </span>
              {product.original && (
                <span className="font-body text-lg text-slate/40 line-through">
                  {product.original}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < product.rating ? "fill-gold text-gold" : "fill-none text-slate/30"}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-slate/50 font-body">
                ({product.reviews} reviews)
              </span>
            </div>

            <p className="font-body text-slate/80 leading-relaxed mb-10 text-sm md:text-base">
              {product.description}
            </p>

            {product.features?.length > 0 && (
              <div className="mb-10">
                <h3 className="text-[10px] tracking-widest uppercase text-gold font-body mb-4">
                  Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="font-body text-sm text-slate flex items-center gap-3">
                      <span className="w-1 h-1 bg-gold rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4 mt-auto pt-8">
              <button
                onClick={() => addToCart(product.id)}
                className="flex-1 bg-obsidian text-ivory text-[10px] tracking-widest uppercase py-4 hover:bg-gold hover:text-obsidian transition-colors font-body font-medium"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 flex items-center justify-center border transition-colors ${
                  isInWishlist(product.id)
                    ? "border-gold text-gold"
                    : "border-obsidian/20 text-obsidian hover:border-gold hover:text-gold"
                }`}
              >
                <svg
                  className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-gold text-gold" : "fill-none text-current"}`}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
