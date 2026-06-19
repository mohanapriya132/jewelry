import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Collections",   to: "/collections/wedding" },
  { label: "Rings",         to: "/collections/wedding" },
  { label: "Necklaces",     to: "/" },
  { label: "Earrings",      to: "/" },
  { label: "Bracelets",     to: "/" },
  { label: "Contact",       to: "/contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-obsidian/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-light tracking-widest2 text-gold-light">AURELIA</span>
          <span className="text-[9px] tracking-widest3 text-champagne uppercase font-body font-light">Fine Jewellery</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`text-xs tracking-widest uppercase font-body transition-colors duration-300 relative group ${
                    isActive ? "text-gold-light" : "text-champagne/80 hover:text-gold-light"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Icon row */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Search */}
          <button id="nav-search" className="text-champagne/70 hover:text-gold-light transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
            </svg>
          </button>
          {/* Wishlist */}
          <button id="nav-wishlist" className="text-champagne/70 hover:text-gold-light transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          {/* Cart */}
          <button id="nav-cart" className="relative text-champagne/70 hover:text-gold-light transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-obsidian text-[8px] flex items-center justify-center font-bold">3</span>
          </button>
          <button
            id="nav-signin"
            className="border border-gold/50 text-gold-light text-xs tracking-widest uppercase px-5 py-2 hover:bg-gold hover:text-obsidian transition-all duration-300 font-body"
          >
            Sign In
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          id="nav-hamburger"
          className="lg:hidden text-champagne"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-gold-light transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px bg-gold-light transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-gold-light transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-obsidian/98 px-6 py-6 mt-2 border-t border-gold/20">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="block py-3 text-sm tracking-widest uppercase text-champagne/80 hover:text-gold-light border-b border-gold/10 transition-colors font-body"
            >
              {link.label}
            </Link>
          ))}
          <button className="mt-4 w-full border border-gold/50 text-gold-light text-xs tracking-widest uppercase py-3 hover:bg-gold hover:text-obsidian transition-all duration-300 font-body">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
}
