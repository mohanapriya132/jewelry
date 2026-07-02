import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="font-display text-3xl font-light tracking-widest2 text-gold-light mb-2">
            AURELIA
          </p>
          <p className="text-[10px] tracking-widest3 text-champagne uppercase font-body">
            Admin Portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur border border-gold/20 p-8 space-y-6"
        >
          <h2 className="font-display text-2xl text-ivory text-center mb-2">Sign In</h2>
          <p className="text-xs text-champagne/60 text-center font-body mb-6">
            admin@aurelia.com / admin123
          </p>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 text-sm px-4 py-3 font-body">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] tracking-widest uppercase text-champagne/60 font-body mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-gold/30 text-ivory px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-widest uppercase text-champagne/60 font-body mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-gold/30 text-ivory px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold text-obsidian text-xs tracking-widest uppercase py-4 hover:bg-gold-light transition-colors font-body font-medium"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
