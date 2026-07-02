import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { formatPrice } from "../utils/formatPrice";

const JEWELRY_TYPES = [
  {
    id: "ring",
    label: "Ring",
    plural: "Rings",
    description: "A timeless setting, made entirely yours.",
    basePrice: 35000,
    sizes: ["5", "6", "7", "8", "9", "10"],
  },
  {
    id: "necklace",
    label: "Necklace",
    plural: "Necklaces",
    description: "An elegant piece designed to sit close to the heart.",
    basePrice: 28000,
    sizes: ['16"', '18"', '20"', '22"', '24"'],
  },
  {
    id: "bracelet",
    label: "Bracelet",
    plural: "Bracelets",
    description: "A refined silhouette tailored to your wrist.",
    basePrice: 30000,
    sizes: ['6"', '6.5"', '7"', '7.5"', '8"'],
  },
];

const MATERIALS = [
  { id: "yellow-gold", label: "18K Yellow Gold", price: 0, color: "#C9A84C" },
  { id: "white-gold", label: "18K White Gold", price: 6000, color: "#D9D9D7" },
  { id: "rose-gold", label: "18K Rose Gold", price: 4000, color: "#C98F7B" },
  { id: "platinum", label: "Platinum", price: 25000, color: "#BFC4C7" },
];

const GEMSTONES = [
  { id: "none", label: "No Gemstone", price: 0, color: "#F8F4EE" },
  { id: "diamond", label: "Diamond", price: 45000, color: "#EAF8FF" },
  { id: "sapphire", label: "Sapphire", price: 28000, color: "#315D9D" },
  { id: "emerald", label: "Emerald", price: 32000, color: "#28725B" },
  { id: "ruby", label: "Ruby", price: 30000, color: "#9E2740" },
];

const ENGRAVING_PRICE = 2500;

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
    </svg>
  );
}

function JewelryPreview({ type, material, gemstone }) {
  const metal = material.color;
  const gem = gemstone.color;
  const hasGem = gemstone.id !== "none";

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[430px] items-center justify-center">
      <div className="absolute inset-[8%] rounded-full border border-gold/10" />
      <div className="absolute inset-[18%] rounded-full border border-gold/10" />

      <svg
        className="relative z-10 h-[76%] w-[76%] drop-shadow-[0_22px_24px_rgba(13,13,13,0.14)]"
        viewBox="0 0 300 300"
        role="img"
        aria-label={`${material.label} ${type.label}${hasGem ? ` with ${gemstone.label}` : ""}`}
      >
        <defs>
          <linearGradient id="metal-shine" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".75" />
            <stop offset="32%" stopColor={metal} />
            <stop offset="68%" stopColor={metal} stopOpacity=".72" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity=".55" />
          </linearGradient>
          <radialGradient id="gem-shine" cx="35%" cy="28%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".95" />
            <stop offset="30%" stopColor={gem} stopOpacity=".82" />
            <stop offset="100%" stopColor={gem} />
          </radialGradient>
        </defs>

        {type.id === "ring" && (
          <>
            <circle cx="150" cy="171" r="72" fill="none" stroke="url(#metal-shine)" strokeWidth="18" />
            <path d="M105 122 126 86h48l21 36" fill="none" stroke={metal} strokeWidth="9" strokeLinejoin="round" />
            {hasGem && (
              <>
                <path d="m150 60 31 25-12 40h-38l-12-40Z" fill="url(#gem-shine)" stroke="#fff" strokeOpacity=".65" strokeWidth="2" />
                <path d="m119 85 31 15 31-15M150 60v40M131 125l19-25 19 25" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" />
              </>
            )}
          </>
        )}

        {type.id === "necklace" && (
          <>
            <path d="M53 67c12 112 62 164 97 164S235 179 247 67" fill="none" stroke="url(#metal-shine)" strokeWidth="8" strokeLinecap="round" />
            <path d="M149 225v-31" stroke={metal} strokeWidth="7" strokeLinecap="round" />
            {hasGem ? (
              <>
                <path d="m150 183 28 23-10 36h-36l-10-36Z" fill="url(#gem-shine)" stroke="#fff" strokeOpacity=".65" strokeWidth="2" />
                <path d="m122 206 28 13 28-13M150 183v36" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
              </>
            ) : (
              <circle cx="150" cy="226" r="14" fill="none" stroke={metal} strokeWidth="7" />
            )}
          </>
        )}

        {type.id === "bracelet" && (
          <>
            <ellipse cx="150" cy="154" rx="105" ry="66" fill="none" stroke="url(#metal-shine)" strokeWidth="16" />
            <path d="M62 188c23 32 52 49 88 49s65-17 88-49" fill="none" stroke={metal} strokeOpacity=".45" strokeWidth="5" />
            {hasGem && (
              <>
                <path d="m150 67 27 21-10 34h-34l-10-34Z" fill="url(#gem-shine)" stroke="#fff" strokeOpacity=".65" strokeWidth="2" />
                <path d="m123 88 27 13 27-13M150 67v34" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
              </>
            )}
          </>
        )}
      </svg>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] uppercase tracking-widest3 text-slate/40">
        Interactive preview
      </div>
    </div>
  );
}

function StepHeading({ number, title, detail }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-sm text-gold-dark">
        {number}
      </span>
      <div>
        <h2 className="font-display text-2xl font-medium text-obsidian">{title}</h2>
        <p className="mt-1 text-xs font-light text-slate/60">{detail}</p>
      </div>
    </div>
  );
}

export default function CustomJewelry() {
  const [typeId, setTypeId] = useState("ring");
  const [materialId, setMaterialId] = useState("yellow-gold");
  const [gemstoneId, setGemstoneId] = useState("diamond");
  const [size, setSize] = useState("7");
  const [engraving, setEngraving] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const type = JEWELRY_TYPES.find((item) => item.id === typeId);
  const material = MATERIALS.find((item) => item.id === materialId);
  const gemstone = GEMSTONES.find((item) => item.id === gemstoneId);

  const estimatedPrice = useMemo(
    () =>
      type.basePrice +
      material.price +
      gemstone.price +
      (engraving.trim() ? ENGRAVING_PRICE : 0),
    [type, material, gemstone, engraving]
  );

  const selectType = (nextType) => {
    setTypeId(nextType.id);
    setSize(nextType.sizes[Math.floor(nextType.sizes.length / 2)]);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-obsidian px-6 pb-20 pt-36 text-center text-ivory md:pb-24 md:pt-44">
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-champagne/5 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="mb-4 text-[10px] uppercase tracking-widest3 text-gold">Made for one</p>
            <h1 className="font-display text-5xl font-light leading-none sm:text-6xl md:text-7xl">
              Design Your Signature Piece
            </h1>
            <div className="divider-gold my-7" />
            <p className="mx-auto max-w-xl text-sm font-light leading-7 text-champagne/65 md:text-base">
              Choose every detail and watch your vision take shape. Each design is handcrafted by our artisans and made uniquely yours.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
            <div className="space-y-6">
              <div className="border border-gold/15 bg-white p-5 shadow-[0_12px_50px_rgba(13,13,13,0.05)] sm:p-8">
                <StepHeading number="01" title="Choose your piece" detail="Select the silhouette you would like to personalize." />
                <div className="grid gap-3 sm:grid-cols-3">
                  {JEWELRY_TYPES.map((item) => {
                    const selected = item.id === typeId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectType(item)}
                        className={`group relative min-h-32 border p-5 text-left transition-all duration-300 ${
                          selected
                            ? "border-gold bg-gold/[0.07] shadow-[inset_0_0_0_1px_rgba(201,168,76,0.25)]"
                            : "border-obsidian/10 hover:border-gold/50 hover:bg-ivory/60"
                        }`}
                      >
                        <div className="mb-5 flex items-center justify-between">
                          <span className={`font-display text-2xl ${selected ? "text-gold-dark" : "text-obsidian"}`}>
                            {item.label}
                          </span>
                          {selected && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-white">
                              <CheckIcon />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-light leading-5 text-slate/55">{item.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="border border-gold/15 bg-white p-5 shadow-[0_12px_50px_rgba(13,13,13,0.04)] sm:p-8">
                  <StepHeading number="02" title="Select material" detail="Precious metals, chosen for beauty and longevity." />
                  <div className="space-y-2.5">
                    {MATERIALS.map((item) => {
                      const selected = item.id === materialId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setMaterialId(item.id);
                            setSubmitted(false);
                          }}
                          className={`flex w-full items-center gap-3 border px-4 py-3 text-left transition-colors ${
                            selected ? "border-gold bg-gold/[0.06]" : "border-obsidian/10 hover:border-gold/40"
                          }`}
                        >
                          <span
                            className="h-5 w-5 shrink-0 rounded-full border border-black/10 shadow-inner"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="flex-1 text-xs font-medium text-slate">{item.label}</span>
                          <span className="text-[10px] text-slate/45">
                            {item.price ? `+ ${formatPrice(item.price)}` : "Included"}
                          </span>
                          <span className={`h-4 w-4 rounded-full border p-0.5 ${selected ? "border-gold" : "border-slate/25"}`}>
                            {selected && <span className="block h-full w-full rounded-full bg-gold" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border border-gold/15 bg-white p-5 shadow-[0_12px_50px_rgba(13,13,13,0.04)] sm:p-8">
                  <StepHeading number="03" title="Choose gemstone" detail="Add a natural stone or keep the design minimal." />
                  <div className="space-y-2.5">
                    {GEMSTONES.map((item) => {
                      const selected = item.id === gemstoneId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setGemstoneId(item.id);
                            setSubmitted(false);
                          }}
                          className={`flex w-full items-center gap-3 border px-4 py-3 text-left transition-colors ${
                            selected ? "border-gold bg-gold/[0.06]" : "border-obsidian/10 hover:border-gold/40"
                          }`}
                        >
                          <span
                            className={`h-5 w-5 shrink-0 rotate-45 border shadow-inner ${item.id === "none" ? "border-slate/25" : "border-white/80"}`}
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="flex-1 text-xs font-medium text-slate">{item.label}</span>
                          <span className="text-[10px] text-slate/45">
                            {item.price ? `+ ${formatPrice(item.price)}` : "Included"}
                          </span>
                          <span className={`h-4 w-4 rounded-full border p-0.5 ${selected ? "border-gold" : "border-slate/25"}`}>
                            {selected && <span className="block h-full w-full rounded-full bg-gold" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="border border-gold/15 bg-white p-5 shadow-[0_12px_50px_rgba(13,13,13,0.04)] sm:p-8">
                <StepHeading number="04" title="Make it personal" detail="Choose the perfect fit and add an optional hidden message." />
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-[10px] font-medium uppercase tracking-widest text-slate/60">
                      {type.id === "ring" ? "Ring size" : `${type.label} length`}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {type.sizes.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setSize(item);
                            setSubmitted(false);
                          }}
                          className={`border py-3 text-xs transition-colors ${
                            size === item
                              ? "border-obsidian bg-obsidian text-ivory"
                              : "border-obsidian/10 text-slate hover:border-gold"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-[10px] text-slate/45">Complimentary first resize is included.</p>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <label htmlFor="engraving" className="text-[10px] font-medium uppercase tracking-widest text-slate/60">
                        Engraving
                      </label>
                      <span className="text-[10px] text-slate/40">{engraving.length}/20</span>
                    </div>
                    <input
                      id="engraving"
                      type="text"
                      maxLength={20}
                      value={engraving}
                      onChange={(event) => {
                        setEngraving(event.target.value);
                        setSubmitted(false);
                      }}
                      placeholder="Forever, A + R, 12.06.26..."
                      className="w-full border border-obsidian/15 bg-ivory/50 px-4 py-3.5 text-sm text-obsidian outline-none transition-colors placeholder:text-slate/30 focus:border-gold"
                    />
                    <div className="mt-3 flex items-center justify-between text-[10px] text-slate/45">
                      <span>Up to 20 characters</span>
                      <span>+ {formatPrice(ENGRAVING_PRICE)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden border border-gold/20 bg-white shadow-[0_18px_60px_rgba(13,13,13,0.08)]">
                <div className="bg-mist/60 px-5 pt-5 sm:px-8 sm:pt-7">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-widest text-gold-dark">Your design</p>
                    <p className="text-[9px] uppercase tracking-widest text-slate/35">Live preview</p>
                  </div>
                  <JewelryPreview type={type} material={material} gemstone={gemstone} />
                </div>

                <div className="p-5 sm:p-8">
                  <h2 className="font-display text-3xl font-light text-obsidian">
                    Bespoke {type.label}
                  </h2>
                  <p className="mt-1 text-xs text-slate/50">Handcrafted to your specifications</p>

                  <dl className="mt-7 space-y-3 border-y border-gold/15 py-6 text-xs">
                    <div className="flex items-center justify-between gap-5">
                      <dt className="text-slate/50">Base {type.label.toLowerCase()}</dt>
                      <dd className="font-medium text-obsidian">{formatPrice(type.basePrice)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                      <dt className="text-slate/50">{material.label}</dt>
                      <dd className="font-medium text-obsidian">
                        {material.price ? `+ ${formatPrice(material.price)}` : "Included"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                      <dt className="text-slate/50">{gemstone.label}</dt>
                      <dd className="font-medium text-obsidian">
                        {gemstone.price ? `+ ${formatPrice(gemstone.price)}` : "Included"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                      <dt className="text-slate/50">Size / length</dt>
                      <dd className="font-medium text-obsidian">{size}</dd>
                    </div>
                    {engraving.trim() && (
                      <div className="flex items-start justify-between gap-5">
                        <dt className="text-slate/50">Engraving “{engraving.trim()}”</dt>
                        <dd className="shrink-0 font-medium text-obsidian">+ {formatPrice(ENGRAVING_PRICE)}</dd>
                      </div>
                    )}
                  </dl>

                  <div className="flex items-end justify-between gap-4 py-6">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-slate/45">Estimated price</p>
                      <p className="mt-1 font-display text-3xl font-medium text-gold-dark">{formatPrice(estimatedPrice)}</p>
                    </div>
                    <span className="pb-1 text-[9px] uppercase tracking-widest text-slate/35">Taxes included</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="group flex w-full items-center justify-center gap-3 bg-obsidian px-5 py-4 text-[10px] font-medium uppercase tracking-widest text-ivory transition-colors hover:bg-gold hover:text-obsidian"
                  >
                    Start my custom order
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m9 18 6-6-6-6" />
                    </svg>
                  </button>

                  {submitted && (
                    <div className="mt-4 flex gap-3 border border-gold/25 bg-gold/[0.07] p-4" role="status">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-white">
                        <CheckIcon />
                      </span>
                      <p className="text-[11px] leading-5 text-slate">
                        Your design is ready for review. A concierge will confirm stone details, timeline, and final pricing before production.
                      </p>
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest text-slate/40">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75M12 3l7.5 3v5.25c0 4.56-3.19 8.47-7.5 9.75-4.31-1.28-7.5-5.19-7.5-9.75V6L12 3Z" />
                    </svg>
                    Handcrafted in 4–6 weeks
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-gold/15 bg-mist px-6 py-16">
          <div className="mx-auto grid max-w-5xl gap-10 text-center md:grid-cols-3">
            {[
              ["01", "Designed by you", "Every detail reflects your story, from metal to the final inscription."],
              ["02", "Made by hand", "Our master artisans craft and finish each piece individually."],
              ["03", "Yours for a lifetime", "Lifetime care and a complimentary first resize come with every design."],
            ].map(([number, title, copy]) => (
              <div key={number}>
                <span className="font-display text-3xl italic text-gold/55">{number}</span>
                <h3 className="mt-3 font-display text-2xl text-obsidian">{title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-xs font-light leading-6 text-slate/60">{copy}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
