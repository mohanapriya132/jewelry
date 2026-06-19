import { useState } from "react";
import { Link } from "react-router-dom";
import ringSolitaire   from "../assets/ring_solitaire.png";
import ringEternity    from "../assets/ring_eternity.png";
import ringEmerald     from "../assets/ring_emerald.png";
import necklaceDiamond from "../assets/necklace_diamond.png";
import earringsBridal  from "../assets/earrings_bridal.png";
import braceletDiamond from "../assets/bracelet_diamond.png";

/* ─── Data ──────────────────────────────────────────────────── */
const TABS = [
  { id: "engagement", label: "Engagement Rings", count: 3 },
  { id: "bands",      label: "Wedding Bands",    count: 3 },
  { id: "luxury",     label: "Luxury Jewelry",   count: 3 },
];

const PRODUCTS = {
  engagement: [
    {
      id: 1,
      name: "Eternal Solitaire",
      sub: "Platinum · 2.0 ct Diamond",
      price: "₹3,45,000", orig: "₹3,99,000",
      badge: "Bestseller", rating: 5, reviews: 214,
      image: ringSolitaire,
      metal: "Platinum", carats: "2.0 ct",
    },
    {
      id: 2,
      name: "Celeste Halo",
      sub: "18K Gold · Emerald Cut",
      price: "₹2,85,000", orig: null,
      badge: "Exclusive", rating: 5, reviews: 167,
      image: ringEmerald,
      metal: "18K Yellow Gold", carats: "1.8 ct",
    },
    {
      id: 3,
      name: "Aurora Cluster",
      sub: "Platinum · Multi-Stone",
      price: "₹1,95,000", orig: "₹2,25,000",
      badge: "Sale", rating: 4, reviews: 43,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&auto=format&fit=crop&q=80",
      metal: "Platinum", carats: "2.2 ct tw",
    },
  ],
  bands: [
    {
      id: 4,
      name: "Rose Eternity Band",
      sub: "18K Rose Gold · Full Pavé",
      price: "₹1,65,000", orig: "₹1,95,000",
      badge: "Sale", rating: 5, reviews: 189,
      image: ringEternity,
      metal: "18K Rose Gold", carats: "1.2 ct tw",
    },
    {
      id: 5,
      name: "Marquise Pavé Band",
      sub: "18K Yellow Gold · Pavé Set",
      price: "₹98,000", orig: null,
      badge: "New", rating: 5, reviews: 55,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80",
      metal: "18K Yellow Gold", carats: "0.8 ct tw",
    },
    {
      id: 6,
      name: "Whisper Platinum",
      sub: "Platinum · Comfort Fit",
      price: "₹75,000", orig: null,
      badge: "New", rating: 4, reviews: 32,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80",
      metal: "Platinum", carats: "0.5 ct tw",
    },
  ],
  luxury: [
    {
      id: 7,
      name: "Lumière Cascade",
      sub: "Diamond & Pearl Necklace",
      price: "₹4,20,000", orig: null,
      badge: "New", rating: 5, reviews: 92,
      image: necklaceDiamond,
      metal: "18K White Gold", carats: "3.5 ct tw",
    },
    {
      id: 8,
      name: "Twilight Drop Earrings",
      sub: "Sapphire Bridal Earrings",
      price: "₹1,12,000", orig: "₹1,35,000",
      badge: "Sale", rating: 4, reviews: 78,
      image: earringsBridal,
      metal: "Platinum", carats: "1.4 ct tw",
    },
    {
      id: 9,
      name: "Infinity Tennis",
      sub: "Diamond Tennis Bracelet",
      price: "₹2,48,000", orig: null,
      badge: "Bestseller", rating: 5, reviews: 134,
      image: braceletDiamond,
      metal: "18K White Gold", carats: "5.0 ct tw",
    },
  ],
};

const BADGE_CLS = {
  Bestseller: "bg-gold text-obsidian",
  New:        "bg-obsidian text-ivory",
  Sale:       "bg-red-900 text-ivory",
  Exclusive:  "bg-gold-dark text-ivory",
};

const PROMISES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "GIA Certified",
    desc:  "Every diamond is independently certified — guaranteeing cut, clarity, colour and carat.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Lifetime Care",
    desc:  "Free polishing, resizing and inspection for the lifetime of every piece you own.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
      </svg>
    ),
    title: "Free Engraving",
    desc:  "Add a secret date, name or message — hand-engraved at no extra charge.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "White Glove Delivery",
    desc:  "Delivered in our signature velvet box with tracked, insured and discreet shipping.",
  },
];

/* ─── ProductCard ───────────────────────────────────────────── */
function ProductCard({ product, wishlisted, onWishlist }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/product/${product.id}`}
      id={`jewel-${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white relative flex flex-col cursor-pointer"
      style={{
        transform:  hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow:  hovered
          ? "0 24px 56px rgba(201,168,76,0.16), 0 4px 18px rgba(0,0,0,0.1)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "all 0.42s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* ── Image wrapper ── */}
      <div className="relative overflow-hidden bg-obsidian" style={{ aspectRatio: "3/4" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{
            transform:  hovered ? "scale(1.09)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {/* dark bottom gradient on hover */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 55%)",
            opacity:    hovered ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />

        {/* Badge */}
        <span className={`absolute top-3 left-3 text-[9px] tracking-widest uppercase px-2.5 py-1 font-body font-medium ${BADGE_CLS[product.badge]}`}>
          {product.badge}
        </span>

        {/* Wishlist button */}
        <button
          id={`wish-${product.id}`}
          onClick={(e) => { e.stopPropagation(); onWishlist(product.id); }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
          style={{
            opacity:    hovered ? 1 : 0.7,
            transform:  hovered ? "scale(1)" : "scale(0.88)",
            transition: "all 0.3s",
          }}
        >
          <svg
            className={`w-4 h-4 transition-colors ${wishlisted ? "fill-gold text-gold" : "fill-none text-slate"}`}
            stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Add to Cart slide-up */}
        <div
          className="absolute bottom-0 left-0 right-0 py-3.5 text-center bg-obsidian/92"
          style={{
            transform:  hovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.38s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span className="text-[10px] tracking-widest uppercase text-gold-light font-body">
            Add to Cart
          </span>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[9px] tracking-widest uppercase text-gold/70 font-body mb-1">
          {product.sub}
        </p>
        <h3 className="font-display text-xl font-light text-obsidian leading-tight mb-3">
          {product.name}
        </h3>

        {/* Spec chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[9px] tracking-wider uppercase bg-mist text-slate font-body px-2 py-0.5">
            {product.carats}
          </span>
          <span className="text-[9px] tracking-wider uppercase bg-mist text-slate font-body px-2 py-0.5">
            {product.metal}
          </span>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${i < product.rating ? "fill-gold text-gold" : "fill-none text-slate/30"}`}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span className="text-[9px] text-slate/50 font-body ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="font-body font-medium text-obsidian">{product.price}</span>
          {product.orig && (
            <span className="font-body text-xs text-slate/40 line-through">{product.orig}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─── PromiseCard ───────────────────────────────────────────── */
function PromiseCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-8 text-center"
      style={{
        background:  hovered ? "#fff" : "transparent",
        border:      `1px solid ${hovered ? "rgba(201,168,76,0.3)" : "rgba(58,58,58,0.1)"}`,
        transform:   hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow:   hovered ? "0 14px 40px rgba(201,168,76,0.1)" : "none",
        transition:  "all 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="text-gold flex justify-center mb-5">{icon}</div>
      <h4 className="font-display text-xl font-light text-obsidian mb-3">{title}</h4>
      <p className="font-body text-sm font-light text-slate/70 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function WeddingCollection() {
  const [activeTab, setActiveTab] = useState("engagement");
  const [wishlist,  setWishlist]  = useState([]);

  const toggleWish = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const heading =
    activeTab === "engagement" ? "Engagement Rings"
    : activeTab === "bands"   ? "Wedding Bands"
    :                            "Luxury Jewelry";

  return (
    <div className="bg-ivory">

      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section className="relative flex items-center justify-center overflow-hidden bg-obsidian"
        style={{ minHeight: "78vh" }}>

        {/* Blurred collage background */}
        <div className="absolute inset-0 grid grid-cols-3 opacity-[0.18]">
          {[ringSolitaire, ringEternity, necklaceDiamond].map((img, i) => (
            <div key={i} className="overflow-hidden">
              <img src={img} alt="" className="w-full h-full object-cover" style={{ filter: "grayscale(40%)" }} />
            </div>
          ))}
        </div>
        {/* Left-to-right scrim */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(13,13,13,0.97) 30%, rgba(13,13,13,0.75) 60%, rgba(13,13,13,0.97) 100%)" }} />

        {/* Ambient gold glow */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full pointer-events-none float-anim"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(229,201,122,0.08) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite 2s" }} />

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-gold/25" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-gold/25" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-gold/25" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-gold/25" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto" style={{ paddingTop: "96px" }}>

          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 mb-8" aria-label="Breadcrumb">
            <Link to="/"
              className="text-[9px] tracking-widest uppercase text-champagne/40 hover:text-gold font-body transition-colors duration-300">
              Home
            </Link>
            <span className="text-champagne/20 text-[10px]">›</span>
            <span className="text-[9px] tracking-widest uppercase text-champagne/30 font-body">Collections</span>
            <span className="text-champagne/20 text-[10px]">›</span>
            <span className="text-[9px] tracking-widest uppercase text-gold font-body">Wedding</span>
          </nav>

          {/* Eyebrow rule */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-10 block" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.6))" }} />
            <p className="text-[10px] tracking-widest3 text-gold uppercase font-body font-light">Aurelia Bridal</p>
            <span className="h-px w-10 block" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.6))" }} />
          </div>

          {/* Main heading */}
          <h1 className="font-display font-light text-ivory leading-[1.06] mb-6"
            style={{ fontSize: "clamp(44px, 8vw, 82px)" }}>
            The Wedding<br />
            <em className="gold-shimmer not-italic">Collection</em>
          </h1>

          <p className="font-body font-light text-champagne/55 leading-relaxed mb-10 max-w-lg mx-auto"
            style={{ fontSize: "clamp(13px, 1.8vw, 16px)" }}>
            From the moment of the proposal to the altar and beyond — every piece crafted to honour your forever.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              id="hero-explore-btn"
              onClick={() => document.getElementById("wedding-grid")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gold hover:bg-gold-light text-obsidian text-[10px] tracking-widest uppercase px-10 py-4 font-body font-medium transition-all duration-300 hover:shadow-[0_0_32px_rgba(201,168,76,0.45)]"
            >
              Explore Pieces
            </button>
            <button
              id="hero-consult-btn"
              className="border border-champagne/30 text-champagne hover:border-gold/60 hover:text-gold-light text-[10px] tracking-widest uppercase px-10 py-4 font-body font-light transition-all duration-300"
            >
              Book Consultation
            </button>
          </div>

          {/* Scroll cue */}
          <div className="mt-14 flex flex-col items-center gap-2">
            <span className="text-[9px] tracking-widest2 text-champagne/30 uppercase font-body">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PRODUCT GRID
      ════════════════════════════════════════════════════ */}
      <section id="wedding-grid" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section heading */}
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-widest3 text-gold uppercase font-body font-light mb-3">
              Handcrafted for Your Day
            </p>
            <h2 className="font-display font-light text-obsidian mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 54px)" }}>
              {heading}
            </h2>
            <div className="divider-gold" />
          </div>

          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[10px] tracking-widest uppercase px-6 py-3 transition-all duration-300 font-body flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-obsidian text-ivory border border-obsidian"
                    : "border border-obsidian/20 text-slate hover:border-gold hover:text-gold"
                }`}
              >
                {tab.label}
                <span className={`text-[8px] px-1.5 py-0.5 rounded-sm font-medium ${
                  activeTab === tab.id ? "bg-gold text-obsidian" : "bg-mist text-slate/50"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS[activeTab].map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlisted={wishlist.includes(product.id)}
                onWishlist={toggleWish}
              />
            ))}
          </div>

          {/* View all CTA */}
          <div className="text-center mt-14">
            <button
              id="view-all-btn"
              className="border border-obsidian/25 text-obsidian text-[10px] tracking-widest uppercase px-12 py-4 hover:bg-obsidian hover:text-ivory transition-all duration-300 font-body"
            >
              View All {heading}
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURE BANNER — Bespoke
      ════════════════════════════════════════════════════ */}
      <section className="bg-obsidian overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">

          {/* Image side */}
          <div className="relative overflow-hidden" style={{ minHeight: 440 }}>
            <img
              src={ringSolitaire}
              alt="Bespoke ring crafting"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "grayscale(25%)", transform: "scale(1.04)" }}
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to right, transparent 30%, rgba(13,13,13,0.85) 100%)" }} />
          </div>

          {/* Text side */}
          <div className="flex flex-col justify-center px-10 md:px-14 py-16 md:py-20">
            <p className="text-[10px] tracking-widest3 text-gold uppercase font-body font-light mb-4">
              Bespoke Service
            </p>
            <h2 className="font-display font-light text-ivory leading-tight mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 46px)" }}>
              Design the Ring<br />of Her Dreams
            </h2>
            <p className="font-body font-light text-champagne/55 text-sm leading-relaxed mb-8 max-w-sm">
              Work one-on-one with our master goldsmiths to create a completely unique piece — from selecting the stone to perfecting the setting.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                id="bespoke-cta-btn"
                className="bg-gold hover:bg-gold-light text-obsidian text-[10px] tracking-widest uppercase px-8 py-3.5 font-body font-medium transition-all duration-300"
              >
                Start Bespoke Journey
              </button>
              <button
                id="consult-btn"
                className="border border-champagne/30 text-champagne hover:border-gold/60 hover:text-gold-light text-[10px] tracking-widest uppercase px-8 py-3.5 font-body font-light transition-all duration-300"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          THE AURELIA PROMISE
      ════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-widest3 text-gold uppercase font-body font-light mb-3">
              Our Commitment
            </p>
            <h2 className="font-display font-light text-obsidian mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>
              The Aurelia Promise
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROMISES.map((p) => (
              <PromiseCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-obsidian py-28 px-6 text-center">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.09) 0%, transparent 65%)" }} />

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 w-10 h-10 border-l border-t border-gold/20" />
        <div className="absolute top-8 right-8 w-10 h-10 border-r border-t border-gold/20" />
        <div className="absolute bottom-8 left-8 w-10 h-10 border-l border-b border-gold/20" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-r border-b border-gold/20" />

        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 block" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5))" }} />
            <p className="text-[10px] tracking-widest3 text-gold uppercase font-body font-light">Begin Your Story</p>
            <span className="h-px w-8 block" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.5))" }} />
          </div>

          <h2 className="font-display font-light text-ivory leading-tight mb-5"
            style={{ fontSize: "clamp(30px, 5vw, 56px)" }}>
            A Love This Special<br />Deserves a Ring to Match
          </h2>
          <p className="font-body font-light text-champagne/45 text-sm leading-relaxed mb-10 max-w-md mx-auto">
            Visit our showroom or speak with a bridal specialist — we'll help you find the piece that perfectly tells your story.
          </p>

          <div className="flex justify-center flex-wrap gap-4">
            <button
              id="final-shop-btn"
              onClick={() => document.getElementById("wedding-grid")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gold hover:bg-gold-light text-obsidian text-[10px] tracking-widest uppercase px-10 py-4 font-body font-medium transition-all duration-300 hover:shadow-[0_0_32px_rgba(201,168,76,0.45)]"
            >
              Shop the Collection
            </button>
            <button
              id="final-showroom-btn"
              className="border border-champagne/25 text-champagne hover:border-gold/50 hover:text-gold-light text-[10px] tracking-widest uppercase px-10 py-4 font-body font-light transition-all duration-300"
            >
              Visit Showroom
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
