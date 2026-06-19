import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#F8F4EE] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-light text-obsidian mb-6">Contact Us</h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
          <p className="mt-8 font-body text-slate/70 max-w-lg mx-auto leading-relaxed">
            We are here to assist you with any inquiries regarding our collections, bespoke services, or aftercare. Let us help you find the perfect piece.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <div className="bg-white p-8 md:p-12 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <h2 className="text-[10px] tracking-widest uppercase text-gold font-body mb-8">Send a Message</h2>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase text-slate/60 font-body">First Name</label>
                  <input type="text" className="border-b border-obsidian/20 bg-transparent py-2 text-obsidian outline-none focus:border-gold transition-colors font-body" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase text-slate/60 font-body">Last Name</label>
                  <input type="text" className="border-b border-obsidian/20 bg-transparent py-2 text-obsidian outline-none focus:border-gold transition-colors font-body" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-widest uppercase text-slate/60 font-body">Email</label>
                <input type="email" className="border-b border-obsidian/20 bg-transparent py-2 text-obsidian outline-none focus:border-gold transition-colors font-body" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-widest uppercase text-slate/60 font-body">Message</label>
                <textarea rows="4" className="border-b border-obsidian/20 bg-transparent py-2 text-obsidian outline-none focus:border-gold transition-colors font-body resize-none"></textarea>
              </div>
              <button type="submit" className="bg-obsidian text-ivory text-[10px] tracking-widest uppercase py-4 px-10 hover:bg-gold hover:text-obsidian transition-colors font-body w-full sm:w-auto mt-4 font-medium">
                Submit Inquiry
              </button>
            </form>
          </div>

          {/* Details & Map */}
          <div className="flex flex-col gap-12 justify-center">
            <div>
              <h2 className="text-[10px] tracking-widest uppercase text-gold font-body mb-6">Our Boutique</h2>
              <p className="font-body text-slate leading-relaxed mb-6">
                Aurelia Fine Jewellery<br />
                123 Luxury Avenue, Suite 400<br />
                New York, NY 10022
              </p>
              <div className="space-y-3 mb-8 border-l-2 border-gold/30 pl-4">
                <p className="font-body text-slate/80 text-sm">
                  <span className="text-[10px] tracking-widest uppercase text-slate/50 block mb-1">Phone</span>
                  +1 (555) 123-4567
                </p>
                <p className="font-body text-slate/80 text-sm">
                  <span className="text-[10px] tracking-widest uppercase text-slate/50 block mb-1">Email</span>
                  concierge@aurelia.com
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-[10px] tracking-widest uppercase text-slate/60 font-body mb-2">Opening Hours</h3>
                <p className="font-body text-sm text-slate"><strong>Mon - Fri:</strong> 10:00 AM - 7:00 PM</p>
                <p className="font-body text-sm text-slate"><strong>Sat - Sun:</strong> 11:00 AM - 5:00 PM</p>
              </div>
            </div>

            <div className="w-full h-64 bg-mist relative overflow-hidden">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80" alt="Map Location" className="w-full h-full object-cover opacity-70" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-obsidian/90 backdrop-blur text-ivory px-6 py-3 text-[10px] tracking-widest uppercase font-body cursor-pointer hover:bg-gold hover:text-obsidian transition-colors">
                   View on Maps
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
