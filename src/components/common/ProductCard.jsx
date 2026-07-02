import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { badgeColor } from "../../data/products";

export default function ProductCard({
  product,
  showRating = true,
  onAddToCart,
  onMoveToCart,
  overlayAction = "cart",
}) {
  const { isInWishlist, toggleWishlist } = useShop();

  const handleOverlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (overlayAction === "moveToCart" && onMoveToCart) {
      onMoveToCart(product.id);
    } else if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <div className="group bg-white relative flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-[9px] tracking-widest uppercase px-2.5 py-1 font-body font-medium ${badgeColor[product.badge] || "bg-obsidian text-ivory"}`}
            >
              {product.badge}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white transition-colors z-10"
            title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              className={`w-4 h-4 transition-colors ${isInWishlist(product.id) ? "fill-gold text-gold" : "fill-none text-slate"}`}
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
          {(onAddToCart || onMoveToCart) && (
            <div
              onClick={handleOverlayClick}
              className="absolute bottom-0 left-0 right-0 bg-obsidian/90 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-center cursor-pointer z-10"
            >
              <span className="text-[10px] tracking-widest uppercase text-gold-light font-body flex items-center justify-center gap-2">
                {overlayAction === "moveToCart" ? (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Move to Cart
                  </>
                ) : (
                  "Add to Cart"
                )}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[9px] tracking-widest uppercase text-gold/70 font-body mb-1">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`} className="hover:text-gold transition-colors">
          <h3 className="font-display text-lg font-light text-obsidian leading-tight mb-2">
            {product.name}
          </h3>
        </Link>
        {showRating && (
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < product.rating ? "fill-gold text-gold" : "fill-none text-slate/30"}`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <span className="text-[9px] text-slate/50 font-body ml-1">
              ({product.reviews})
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-body font-medium text-obsidian text-sm">{product.price}</span>
          {product.original && (
            <span className="font-body text-xs text-slate/40 line-through">
              {product.original}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
