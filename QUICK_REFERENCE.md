# Quick Implementation Reference

## Key Code Examples

### 1. Using the Shop Context

```javascript
import { useShop } from "../context/ShopContext";

export default function MyComponent() {
  const {
    cart,                    // Array of {id, quantity}
    wishlist,               // Array of product IDs
    cartItemCount,          // Total items in cart (quantity sum)
    cartTotal,              // Total price of cart
    
    // Functions
    addToCart,              // Add item to cart
    removeFromCart,         // Remove item from cart
    updateCartQuantity,     // Update quantity (auto-removes if 0)
    toggleWishlist,         // Add/remove from wishlist
    removeFromWishlist,     // Remove from wishlist
    moveToCart,             // Add to cart & remove from wishlist
    isInWishlist            // Check if product is in wishlist
  } = useShop();

  return (
    <button onClick={() => addToCart(productId, 1)}>
      Add to Cart
    </button>
  );
}
```

### 2. Cart Item Structure

```javascript
// Cart item structure
const cartItem = {
  id: 1,              // Product ID
  quantity: 2         // Quantity purchased
};

// When combined with product data:
const enrichedItem = {
  ...product,         // All product fields
  quantity: 2         // Added quantity
};
```

### 3. Shopping Cart Logic

```javascript
// Calculate totals
const subtotal = cartItems.reduce(
  (acc, item) => acc + parsePrice(item.price) * item.quantity,
  0
);

const tax = subtotal * 0.05;
const shipping = subtotal > 0 ? 500 : 0;
const total = subtotal + tax + shipping;
```

### 4. Wishlist Item Display

```javascript
// Get wishlist products
const savedProducts = products.filter((product) =>
  wishlist.includes(product.id)
);

// Display in grid
{savedProducts.map((product) => (
  <div key={product.id}>
    {/* Product display */}
    <button onClick={() => moveToCart(product.id)}>
      Move to Cart
    </button>
    <button onClick={() => removeFromWishlist(product.id)}>
      Remove
    </button>
  </div>
))}
```

### 5. Navbar Counts

```javascript
import { useShop } from "../context/ShopContext";

export default function Navbar() {
  const { wishlist, cartItemCount } = useShop();

  return (
    <div>
      {/* Wishlist Badge */}
      <Link to="/wishlist">
        <HeartIcon />
        {wishlist.length > 0 && (
          <span className="badge">{wishlist.length}</span>
        )}
      </Link>

      {/* Cart Badge */}
      <Link to="/cart">
        <CartIcon />
        {cartItemCount > 0 && (
          <span className="badge">{cartItemCount}</span>
        )}
      </Link>
    </div>
  );
}
```

---

## Feature Checklist

### Shopping Cart Page Features:
- [x] Display cart items with image and details
- [x] Quantity increment/decrement buttons
- [x] Remove from cart button
- [x] Add to wishlist button (heart icon)
- [x] Calculate subtotal
- [x] Calculate tax (5%)
- [x] Calculate shipping (₹500)
- [x] Calculate total
- [x] Order summary sidebar
- [x] Empty cart state
- [x] Product links
- [x] Responsive on mobile/tablet/desktop
- [x] Sticky order summary

### Wishlist Page Features:
- [x] Display wishlist items in grid
- [x] Product image with hover effect
- [x] Product rating stars
- [x] Product category badge
- [x] Price display (original + current)
- [x] Move to cart button
- [x] Remove from wishlist button
- [x] Item count display
- [x] Empty wishlist state
- [x] Product links
- [x] Responsive grid layout
- [x] Smooth transitions and hover effects

### Navbar Integration:
- [x] Wishlist icon with count badge
- [x] Cart icon with item count badge
- [x] Live updates on item changes
- [x] Mobile menu integration
- [x] Hide badges when count is 0
- [x] Links to both pages

---

## Responsive Breakpoints

### Mobile (< 640px)
- Cart: Single column layout
- Wishlist: 1-column grid
- Images: Full width
- Navigation: Hamburger menu

### Tablet (640px - 1024px)
- Cart: 2-column layout (items + sidebar)
- Wishlist: 2-column grid
- Proper spacing maintained
- Touch-friendly buttons

### Desktop (> 1024px)
- Cart: 2/3 + 1/3 column split
- Wishlist: 3-column grid
- Sticky order summary
- Full navigation visible

---

## Color System

| Color | Usage | Tailwind |
|-------|-------|----------|
| Gold | Accents, badges | `text-gold`, `bg-gold` |
| Obsidian | Text, backgrounds | `text-obsidian`, `bg-obsidian` |
| Mist | Light backgrounds | `bg-mist` |
| Champagne | Secondary text | `text-champagne` |
| Ivory | On dark backgrounds | `text-ivory` |

---

## Common Tasks

### Add Item to Cart
```javascript
const { addToCart } = useShop();

<button onClick={() => addToCart(productId, 1)}>
  Add to Cart
</button>
```

### Remove Item from Cart
```javascript
const { removeFromCart } = useShop();

<button onClick={() => removeFromCart(productId)}>
  Remove
</button>
```

### Update Quantity
```javascript
const { updateCartQuantity } = useShop();

<button onClick={() => updateCartQuantity(productId, quantity + 1)}>
  +
</button>
```

### Toggle Wishlist
```javascript
const { toggleWishlist } = useShop();

<button onClick={() => toggleWishlist(productId)}>
  <HeartIcon />
</button>
```

### Check if in Wishlist
```javascript
const { isInWishlist } = useShop();

if (isInWishlist(productId)) {
  // Show filled heart
}
```

### Move to Cart
```javascript
const { moveToCart } = useShop();

<button onClick={() => moveToCart(productId)}>
  Move to Cart
</button>
```

---

## Utility Functions

### Format Price
```javascript
import { formatPrice, parsePrice } from "../utils/formatPrice";

// Format price for display
const displayPrice = formatPrice(1000); // "₹1,000"

// Parse price string to number
const numPrice = parsePrice("₹1,000"); // 1000
```

### Storage
```javascript
import { loadFromStorage, saveToStorage } from "../utils/storage";

// Load from localStorage
const data = loadFromStorage("key", defaultValue);

// Save to localStorage
saveToStorage("key", data);
```

---

## Performance Optimizations

1. **useMemo** - Used for `cartTotal` and `cartItemCount`
2. **useCallback** - Product search functions are memoized
3. **Lazy Loading** - Images lazy load with hover effects
4. **CSS Transitions** - Smooth animations without JavaScript
5. **LocalStorage** - Persistent state without server calls

---

## Troubleshooting

### Items not persisting after refresh?
- Check if `storage.js` utilities are working
- Verify localStorage is enabled in browser
- Check browser console for errors

### Counts not updating?
- Verify `useShop()` hook is being used
- Check ShopContext is providing all functions
- Ensure parent component wraps children with `ShopProvider`

### Layout breaking on mobile?
- Check Tailwind responsive classes (`sm:`, `md:`, `lg:`)
- Verify CSS Grid/Flex properties
- Test on actual mobile device

### Price calculations wrong?
- Verify `formatPrice()` and `parsePrice()` utilities
- Check tax rate (set to 5%)
- Verify shipping logic (₹500 if subtotal > 0)

---

## Environment Setup

The project uses:
- **React** 18+ with React Router
- **Tailwind CSS** for styling
- **Vite** as build tool
- **Context API** for state management

No additional dependencies needed for cart/wishlist functionality!

---

## Files Modified/Created

- ✅ `src/pages/Cart.jsx` - Enhanced with move-to-wishlist
- ✅ `src/pages/Wishlist.jsx` - Redesigned with better layout
- ✅ `src/components/Navbar.jsx` - Already has counts (no changes needed)
- ✅ `src/context/ShopContext.jsx` - Already complete (no changes needed)

All features are ready to use!
