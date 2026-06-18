import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Celestial Diamond Ring",
    category: "Rings",
    price: "₹1,24,999",
    original: "₹1,49,999",
    rating: 5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=500&auto=format&fit=crop&q=80",
    badge: "Bestseller",
    tag: "Rings",
  },
  {
    id: 2,
    name: "Pearl Cascade Necklace",
    category: "Necklaces",
    price: "₹89,500",
    original: null,
    rating: 5,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&auto=format&fit=crop&q=80",
    badge: "New",
    tag: "Necklaces",
  },
  {
    id: 3,
    name: "Ruby Drop Earrings",
    category: "Earrings",
    price: "₹67,000",
    original: "₹82,000",
    rating: 4,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=80",
    badge: "Sale",
    tag: "Earrings",
  },
  {
    id: 4,
    name: "Gold Tennis Bracelet",
    category: "Bracelets",
    price: "₹98,000",
    original: null,
    rating: 5,
    reviews: 102,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&auto=format&fit=crop&q=80",
    badge: "Bestseller",
    tag: "Bracelets",
  },
  {
    id: 5,
    name: "Sapphire Halo Ring",
    category: "Rings",
    price: "₹2,15,000",
    original: null,
    rating: 5,
    reviews: 73,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=80",
    badge: "Exclusive",
    tag: "Rings",
  },
  {
    id: 6,
    name: "Diamond Cluster Pendant",
    category: "Necklaces",
    price: "₹1,45,000",
    original: "₹1,75,000",
    rating: 4,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&auto=format&fit=crop&q=80",
    badge: "Sale",
    tag: "Necklaces",
  },
  {
    id: 7,
    name: "Emerald Stud Earrings",
    category: "Earrings",
    price: "₹78,500",
    original: null,
    rating: 5,
    reviews: 91,
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=500&auto=format&fit=crop&q=80",
    badge: "New",
    tag: "Earrings",
  },
  {
    id: 8,
    name: "Rose Gold Bangle Set",
    category: "Bracelets",
    price: "₹54,000",
    original: "₹64,000",
    rating: 4,
    reviews: 37,
    image: "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=500&auto=format&fit=crop&q=80",
    badge: "Sale",
    tag: "Bracelets",
  },
];

const filters = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];

const badgeColor = {
  Bestseller: "bg-gold text-obsidian",
  New: "bg-obsidian text-ivory",
  Sale: "bg-red-900 text-ivory",
  Exclusive: "bg-gold-dark text-ivory",
};

export default function Products() {
  const [active, setActive] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const filtered = active === "All" ? products : products.filter((p) => p.tag === active);

  const toggleWish = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <section className="bg-mist py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-widest3 text-gold uppercase font-body font-light mb-3">Handpicked</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-obsidian mb-4">Featured Pieces</h2>
          <div className="divider-gold" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
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

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="group bg-white relative flex flex-col">
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Badge */}
                <span className={`absolute top-3 left-3 text-[9px] tracking-widest uppercase px-2.5 py-1 font-body font-medium ${badgeColor[product.badge]}`}>
                  {product.badge}
                </span>
                {/* Wishlist */}
                <button
                  onClick={() => toggleWish(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
                >
                  <svg className={`w-4 h-4 transition-colors ${wishlist.includes(product.id) ? "fill-gold text-gold" : "fill-none text-slate"}`}
                    stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                {/* Add to cart overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-obsidian/90 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-center">
                  <span className="text-[10px] tracking-widest uppercase text-gold-light font-body">Add to Cart</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-[9px] tracking-widest uppercase text-gold/70 font-body mb-1">{product.category}</p>
                <h3 className="font-display text-lg font-light text-obsidian leading-tight mb-2">{product.name}</h3>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-3 h-3 ${i < product.rating ? "fill-gold text-gold" : "fill-none text-slate/30"}`} viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-[9px] text-slate/50 font-body ml-1">({product.reviews})</span>
                </div>
                {/* Price */}
                <div className="flex items-center gap-2 mt-auto">
                  <span className="font-body font-medium text-obsidian text-sm">{product.price}</span>
                  {product.original && (
                    <span className="font-body text-xs text-slate/40 line-through">{product.original}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="border border-obsidian/30 text-obsidian text-xs tracking-widest uppercase px-12 py-4 hover:bg-obsidian hover:text-ivory transition-all duration-300 font-body">
            View All Pieces
          </button>
        </div>
      </div>
    </section>
  );
}
