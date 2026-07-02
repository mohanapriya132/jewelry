import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./search/SearchBar";

const NAV_LINKS = [
  { label: "Collections", to: "/collections/wedding" },
  { label: "Rings", to: "/search?category=Rings" },
  { label: "Necklaces", to: "/search?category=Necklaces" },
  { label: "Earrings", to: "/search?category=Earrings" },
  { label: "Bracelets", to: "/search?category=Bracelets" },
  { label: "Custom Jewelry", to: "/custom-jewelry" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlist, cartItemCount } = useShop();
  const { user, signOut, displayName, firstLetter } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await signOut();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-obsidian/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-light tracking-widest2 text-gold-light">
            AURELIA
          </span>
          <span className="text-[9px] tracking-widest3 text-champagne uppercase font-body font-light">
            Fine Jewellery
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive =
              location.pathname + location.search === link.to ||
              (link.to.startsWith("/search") && location.pathname === "/search");
            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`text-xs tracking-widest uppercase font-body transition-colors duration-300 relative group ${
                    isActive ? "text-gold-light" : "text-champagne/80 hover:text-gold-light"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop right icons */}
        <div className="hidden lg:flex items-center gap-5">
          <SearchBar variant="navbar" />

          {/* Wishlist */}
          <Link to="/wishlist" id="nav-wishlist" className="relative text-champagne/70 hover:text-gold-light transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-obsidian text-[8px] flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" id="nav-cart" className="relative text-champagne/70 hover:text-gold-light transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-obsidian text-[8px] flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                id="nav-user-menu"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 group"
              >
                <span className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-obsidian text-sm font-display font-medium hover:bg-gold-light transition-colors">
                  {firstLetter}
                </span>
                <span className="text-champagne/80 text-xs tracking-widest font-body group-hover:text-gold-light transition-colors hidden xl:block max-w-[100px] truncate">
                  {displayName.split(" ")[0]}
                </span>
                <svg
                  className={`w-3 h-3 text-champagne/50 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-11 w-48 bg-obsidian border border-gold/20 shadow-xl py-1 z-50">
                  <div className="px-4 py-3 border-b border-gold/10">
                    <p className="text-[10px] tracking-widest uppercase text-champagne/40 font-body">Signed in as</p>
                    <p className="text-xs text-ivory font-body truncate mt-0.5">{displayName}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-champagne/70 hover:text-gold-light hover:bg-white/5 transition-colors font-body tracking-wider"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-champagne/70 hover:text-gold-light hover:bg-white/5 transition-colors font-body tracking-wider"
                  >
                    My Wishlist
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-champagne/70 hover:text-gold-light hover:bg-white/5 transition-colors font-body tracking-wider"
                  >
                    My Cart
                  </Link>
                  <div className="border-t border-gold/10 mt-1" />
                  <button
                    id="nav-logout"
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/10 transition-colors font-body tracking-wider"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/signup"
                id="nav-signup"
                className="border border-gold/50 text-gold-light text-xs tracking-widest uppercase px-5 py-2 hover:bg-gold hover:text-obsidian transition-all duration-300 font-body"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Admin link — small */}
          
        </div>

        {/* Hamburger */}
        <button
          id="nav-hamburger"
          className="lg:hidden text-champagne"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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
          <div className="mb-4">
            <Link
              to="/search"
              className="flex items-center gap-2 py-3 text-sm tracking-widest uppercase text-champagne/80 hover:text-gold-light border-b border-gold/10 transition-colors font-body"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
              </svg>
              Search
            </Link>
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="block py-3 text-sm tracking-widest uppercase text-champagne/80 hover:text-gold-light border-b border-gold/10 transition-colors font-body"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex gap-6 mt-4 pt-4 border-t border-gold/10">
            <Link to="/wishlist" className="relative text-champagne/80 hover:text-gold-light font-body text-sm">
              Wishlist {wishlist.length > 0 && <span className="ml-1 text-gold text-xs">({wishlist.length})</span>}
            </Link>
            <Link to="/cart" className="relative text-champagne/80 hover:text-gold-light font-body text-sm">
              Cart {cartItemCount > 0 && <span className="ml-1 text-gold text-xs">({cartItemCount})</span>}
            </Link>
          </div>

          {/* Mobile auth */}
          {user ? (
            <div className="mt-4 pt-4 border-t border-gold/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-obsidian text-sm font-display font-medium">
                  {firstLetter}
                </span>
                <div>
                  <p className="text-ivory text-sm font-body">{displayName}</p>
                  <p className="text-champagne/40 text-[10px] font-body tracking-widest uppercase">Signed in</p>
                </div>
              </div>
              <Link
                to="/profile"
                className="block w-full text-center border border-gold/30 text-champagne/80 text-xs tracking-widest uppercase py-3 hover:border-gold hover:text-gold transition-all duration-300 font-body mb-3"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-center border border-red-500/30 text-red-400 text-xs tracking-widest uppercase py-3 hover:bg-red-900/20 transition-all duration-300 font-body"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t border-gold/10">
              <Link
                to="/signup"
                className="block w-full text-center bg-gold text-obsidian text-xs tracking-widest uppercase py-3 hover:bg-gold-light transition-all duration-300 font-body font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}

          <Link
            to="/admin/login"
            className="mt-4 block w-full text-center text-champagne/30 text-[10px] tracking-widest uppercase py-2 font-body"
          >
            Admin Panel
          </Link>
        </div>
      )}
    </nav>
  );
}
