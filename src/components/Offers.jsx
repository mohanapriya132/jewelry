import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Offers() {
  const [timeLeft, setTimeLeft] = useState({ h: 11, m: 47, s: 23 });
  const [offers, setOffers] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [
        { data: offersData },
        { data: featuresData }
      ] = await Promise.all([
        supabase.from("offers").select("*").order("id"),
        supabase.from("features").select("*").order("id")
      ]);

      if (offersData) setOffers(offersData);
      if (featuresData) setFeatures(featuresData);
    };

    fetchData();
    const handleAdminChange = (event) => {
      if (["offers", "features"].includes(event.detail?.table)) fetchData();
    };

    window.addEventListener("admin-data-changed", handleAdminChange);
    return () => window.removeEventListener("admin-data-changed", handleAdminChange);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 11; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <>
      {/* Flash Sale Banner */}
      <section className="relative bg-obsidian overflow-hidden py-20 px-6">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
        />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="text-[10px] tracking-widest3 text-gold uppercase font-body font-light mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-gold" />
              Limited Time Offer
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-ivory mb-4">
              Up to <span className="gold-shimmer">30% Off</span><br />
              Diamond Collection
            </h2>
            <p className="text-champagne/60 font-body font-light text-sm leading-relaxed mb-8 max-w-md">
              Our most coveted diamond pieces, available at exceptional prices. Each purchase includes complimentary engraving and gift packaging.
            </p>

            {/* Countdown */}
            <div className="flex items-center gap-4 mb-10">
              {[
                { label: "Hours", val: pad(timeLeft.h) },
                { label: "Mins", val: pad(timeLeft.m) },
                { label: "Secs", val: pad(timeLeft.s) },
              ].map((t, i) => (
                <div key={t.label} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="font-display text-4xl font-light text-gold-light w-16 h-16 flex items-center justify-center border border-gold/30">
                      {t.val}
                    </div>
                    <div className="text-[8px] tracking-widest uppercase text-champagne/40 font-body mt-1">{t.label}</div>
                  </div>
                  {i < 2 && <span className="font-display text-2xl text-gold/50 -mt-4">:</span>}
                </div>
              ))}
            </div>

            <button className="bg-gold hover:bg-gold-light text-obsidian text-xs tracking-widest uppercase px-10 py-4 font-body font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.5)]">
              Shop the Sale
            </button>
          </div>

          {/* Right — Offer cards */}
          <div className="grid grid-cols-2 gap-4">
            {offers.map((c) => (
              <div key={c.title} className="group relative overflow-hidden cursor-pointer" style={{ aspectRatio: "1" }}>
                <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-obsidian/20" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-gold text-xs font-body tracking-widest font-medium">{c.off}</div>
                  <div className="font-display text-base text-ivory font-light">{c.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <div className="bg-gold py-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {features.map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-1">
              <span className="text-xl">{f.icon}</span>
              <span className="text-[10px] tracking-widest uppercase font-body font-semibold text-obsidian">{f.label}</span>
              <span className="text-[9px] text-obsidian/60 font-body">{f.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
