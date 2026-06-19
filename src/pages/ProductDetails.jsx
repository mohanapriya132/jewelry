import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Celestial Diamond Ring",
    category: "Rings",
    price: "₹1,24,999",
    original: "₹1,49,999",
    rating: 5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&auto=format&fit=crop&q=80",
    description: "Experience the brilliance of the Celestial Diamond Ring. This exquisite piece features a meticulously cut center diamond set in 18K white gold, surrounded by a halo of smaller diamonds that enhance its celestial sparkle. Perfect for an engagement or a breathtaking gift.",
    features: ["18K White Gold", "Center Diamond: 1.5 Carat", "Clarity: VS1", "Color: E"],
  },
  {
    id: 2,
    name: "Pearl Cascade Necklace",
    category: "Necklaces",
    price: "₹89,500",
    rating: 5,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop&q=80",
    description: "A cascade of lustrous pearls combined with delicate gold chains. This necklace embodies timeless elegance, designed to gracefully drape along the neckline.",
    features: ["18K Yellow Gold", "Freshwater Pearls", "Adjustable Length"],
  }
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id)) || {
    id,
    name: "Aurelia Signature Piece",
    category: "Fine Jewelry",
    price: "₹1,50,000",
    rating: 5,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
    description: "A stunning masterpiece crafted with precision and care. Elevate your elegance with this premium piece from Aurelia Fine Jewellery. Handcrafted by master artisans using ethically sourced materials.",
    features: ["Premium Craftsmanship", "Ethically Sourced", "Lifetime Warranty", "Complimentary Engraving"],
  };

  return (
     <div className="min-h-screen bg-[#F8F4EE] flex flex-col">
       <Navbar />
       
       <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
          {/* Breadcrumbs */}
          <nav className="mb-10 text-[10px] tracking-widest uppercase font-body text-slate/60 flex items-center gap-2">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>›</span>
            <span>{product.category}</span>
            <span>›</span>
            <span className="text-gold">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-mist">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="flex flex-col py-6">
              <h1 className="font-display text-4xl md:text-5xl font-light text-obsidian mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-8 border-b border-gold/20 pb-8">
                <span className="font-body text-2xl font-medium text-obsidian">{product.price}</span>
                {product.original && <span className="font-body text-lg text-slate/40 line-through">{product.original}</span>}
              </div>

              {/* Reviews */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < product.rating ? "fill-gold text-gold" : "fill-none text-slate/30"}`} viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-slate/50 font-body">({product.reviews} reviews)</span>
              </div>

              <p className="font-body text-slate/80 leading-relaxed mb-10 text-sm md:text-base">
                {product.description}
              </p>

              <div className="mb-10">
                <h3 className="text-[10px] tracking-widest uppercase text-gold font-body mb-4">Features</h3>
                <ul className="space-y-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="font-body text-sm text-slate flex items-center gap-3">
                      <span className="w-1 h-1 bg-gold rounded-full"></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 mt-auto pt-8">
                <button className="flex-1 bg-obsidian text-ivory text-[10px] tracking-widest uppercase py-4 hover:bg-gold hover:text-obsidian transition-colors font-body font-medium">
                  Add to Cart
                </button>
                <button className="w-14 flex items-center justify-center border border-obsidian/20 text-obsidian hover:border-gold hover:text-gold transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
