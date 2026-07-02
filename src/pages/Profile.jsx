import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, displayName, firstLetter, signOut } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-center">
          <p className="text-champagne/60 font-body mb-4">You are not signed in.</p>
          <Link to="/login" className="bg-gold text-obsidian text-xs tracking-widest uppercase px-8 py-3 font-body font-medium hover:bg-gold-light transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
    : "—";

  return (
    <div className="min-h-screen bg-mist pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-widest3 text-gold uppercase font-body font-light mb-3 flex items-center justify-center gap-3">
            <span className="w-6 h-px bg-gold" />
            My Account
            <span className="w-6 h-px bg-gold" />
          </p>
          <h1 className="font-display text-4xl font-light text-obsidian">Profile</h1>
        </div>

        {/* Avatar Card */}
        <div className="bg-obsidian p-8 mb-6 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center text-obsidian text-3xl font-display font-medium flex-shrink-0">
            {firstLetter}
          </div>
          <div>
            <h2 className="font-display text-2xl font-light text-ivory mb-1">{displayName}</h2>
            <p className="text-champagne/50 font-body text-sm">{user.email}</p>
            <p className="text-champagne/30 font-body text-[10px] tracking-widest uppercase mt-1">
              Member since {joinedDate}
            </p>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white border border-gold/10 shadow-sm p-8 mb-6">
          <h3 className="font-display text-lg font-light text-obsidian mb-6 pb-4 border-b border-gold/10">
            Account Details
          </h3>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] tracking-widest uppercase text-slate/50 font-body">Full Name</span>
              <span className="text-obsidian font-body text-sm">{displayName || "—"}</span>
            </div>
            <div className="flex justify-between items-center border-t border-gold/5 pt-5">
              <span className="text-[10px] tracking-widest uppercase text-slate/50 font-body">Email</span>
              <span className="text-obsidian font-body text-sm">{user.email}</span>
            </div>
            <div className="flex justify-between items-center border-t border-gold/5 pt-5">
              <span className="text-[10px] tracking-widest uppercase text-slate/50 font-body">Member Since</span>
              <span className="text-obsidian font-body text-sm">{joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link to="/wishlist" className="bg-white border border-gold/10 shadow-sm p-6 text-center hover:border-gold transition-colors group">
            <svg className="w-5 h-5 mx-auto mb-2 text-gold group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-[10px] tracking-widest uppercase font-body text-slate">My Wishlist</p>
          </Link>
          <Link to="/cart" className="bg-white border border-gold/10 shadow-sm p-6 text-center hover:border-gold transition-colors group">
            <svg className="w-5 h-5 mx-auto mb-2 text-gold group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-[10px] tracking-widest uppercase font-body text-slate">My Cart</p>
          </Link>
        </div>

        {/* Logout */}
        <button
          id="profile-logout"
          onClick={signOut}
          className="w-full border border-red-300 text-red-500 text-xs tracking-widest uppercase py-4 font-body hover:bg-red-50 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
