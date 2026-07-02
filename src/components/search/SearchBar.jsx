import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { CATEGORIES } from "../../data/products";

export default function SearchBar({ variant = "navbar", autoFocus = false, onClose }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [isOpen, setIsOpen] = useState(variant === "page");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { searchProducts } = useProducts();

  const results = query.trim() ? searchProducts(query, category) : [];

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}&category=${category}`);
      setIsOpen(false);
      onClose?.();
    }
  };

  const handleViewAll = () => {
    navigate(`/search?q=${encodeURIComponent(query)}&category=${category}`);
    setIsOpen(false);
    onClose?.();
  };

  if (variant === "page") {
    return (
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/40"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jewellery by name or category..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gold/20 text-obsidian font-body text-sm outline-none focus:border-gold transition-colors"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-4 bg-white border border-gold/20 text-obsidian font-body text-sm outline-none focus:border-gold transition-colors min-w-[160px]"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-obsidian text-ivory text-xs tracking-widest uppercase px-8 py-4 hover:bg-gold hover:text-obsidian transition-colors font-body"
          >
            Search
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-champagne/70 hover:text-gold-light transition-colors"
        aria-label="Search"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setIsOpen(false);
              onClose?.();
            }}
          />
          <div className="absolute right-0 top-full mt-3 w-80 md:w-96 bg-white border border-gold/20 shadow-xl z-50 p-4">
            <form onSubmit={handleSubmit}>
              <div className="relative mb-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="w-full px-4 py-3 border border-gold/20 text-obsidian font-body text-sm outline-none focus:border-gold"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 mb-3 border border-gold/20 text-obsidian font-body text-sm outline-none focus:border-gold"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </form>

            {query.trim() && (
              <div className="max-h-64 overflow-y-auto border-t border-gold/10 pt-3">
                {results.length === 0 ? (
                  <p className="text-sm text-slate/60 font-body py-4 text-center">
                    No products found
                  </p>
                ) : (
                  <>
                    {results.slice(0, 5).map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={() => {
                          setIsOpen(false);
                          onClose?.();
                        }}
                        className="flex items-center gap-3 py-2 hover:bg-mist px-2 transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover"
                        />
                        <div>
                          <p className="text-sm text-obsidian font-body">{product.name}</p>
                          <p className="text-xs text-gold font-body">{product.price}</p>
                        </div>
                      </Link>
                    ))}
                    {results.length > 5 && (
                      <button
                        onClick={handleViewAll}
                        className="w-full text-center text-xs tracking-widest uppercase text-gold py-3 hover:underline font-body"
                      >
                        View all {results.length} results
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
