import { Link } from "react-router-dom";

export default function EmptyState({ icon, title, description, actionLabel, actionTo }) {
  return (
    <div className="text-center py-20 flex flex-col items-center bg-white border border-gold/10 shadow-sm">
      {icon}
      <h2 className="font-display text-2xl text-obsidian mb-4">{title}</h2>
      <p className="text-slate mb-8 font-body font-light max-w-md">{description}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="border border-obsidian/30 text-obsidian text-xs tracking-widest uppercase px-12 py-4 hover:bg-obsidian hover:text-ivory transition-all duration-300 font-body"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
