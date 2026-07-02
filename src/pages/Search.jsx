import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/common/PageHeader";
import ProductCard from "../components/common/ProductCard";
import { useProducts } from "../context/ProductContext";
import { useShop } from "../context/ShopContext";
import { CATEGORIES } from "../data/products";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchProducts } = useProducts();
  const { addToCart } = useShop();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const results = searchProducts(query, category);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (query.trim()) params.q = query;
    if (category !== "All") params.category = category;
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen flex flex-col bg-mist">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        <PageHeader eyebrow="Discover" title="Search" />

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
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
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                const params = {};
                if (e.target.value.trim()) params.q = e.target.value;
                if (category !== "All") params.category = category;
                setSearchParams(params);
              }}
              placeholder="Search jewellery by name or category..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gold/20 text-obsidian font-body text-sm outline-none focus:border-gold transition-colors"
            />
          </div>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              const params = {};
              if (query.trim()) params.q = query;
              if (e.target.value !== "All") params.category = e.target.value;
              setSearchParams(params);
            }}
            className="px-4 py-4 bg-white border border-gold/20 text-obsidian font-body text-sm outline-none focus:border-gold transition-colors min-w-[160px]"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </form>

        <p className="text-sm text-slate font-body mb-8">
          {query.trim()
            ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
            : category !== "All"
              ? `${results.length} products in ${category}`
              : "Enter a search term or select a category"}
        </p>

        {results.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-display text-xl text-obsidian mb-2">No products found</p>
            <p className="text-slate font-body text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
