export default function PageHeader({ eyebrow, title }) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <p className="text-[10px] tracking-widest3 text-gold uppercase font-body font-light mb-3">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-4xl md:text-5xl font-light text-obsidian mb-4">
        {title}
      </h1>
      <div className="divider-gold mx-auto" />
    </div>
  );
}
