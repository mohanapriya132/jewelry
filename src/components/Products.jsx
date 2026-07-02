import { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useProducts } from "../context/ProductContext";
import { CATEGORIES } from "../data/products";
import ProductCard from "./common/ProductCard";

export default function Products() {
  const [active, setActive] = useState("All");
  const { products } = useProducts();
  const { addToCart } = useShop();

  const filtered =
    active === "All" ? products : products.filter((p) => p.tag === active);

  return (
    <section className="bg-mist py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-widest3 text-gold uppercase font-body font-light mb-3">
            Handpicked
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-obsidian mb-4">
            Featured Pieces
          </h2>
          <div className="divider-gold" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`text-[10px] tracking-widest uppercase px-6 py-2.5 transition-all duration-300 font-body ${
                active === f
                  ? "bg-obsidian text-ivory border border-obsidian"
                  : "border border-obsidian/20 text-slate hover:border-gold hover:text-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/search"
            className="inline-block border border-obsidian/30 text-obsidian text-xs tracking-widest uppercase px-12 py-4 hover:bg-obsidian hover:text-ivory transition-all duration-300 font-body"
          >
            View All Pieces
          </Link>
        </div>
      </div>
    </section>
  );
}
