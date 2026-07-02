import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signIn(form.email, form.password);

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex flex-col leading-none items-center">
            <span className="font-display text-3xl font-light tracking-widest2 text-gold-light">
              AURELIA
            </span>
            <span className="text-[9px] tracking-widest3 text-champagne/60 uppercase font-body font-light mt-0.5">
              Fine Jewellery
            </span>
          </Link>
        </div>

        <div className="bg-white/5 border border-gold/20 backdrop-blur-sm p-8 shadow-2xl">
          {/* Heading */}
          <div className="mb-8">
            <p className="text-[10px] tracking-widest3 text-gold uppercase font-body font-light mb-2 flex items-center gap-3">
              <span className="w-4 h-px bg-gold" />
              Welcome Back
            </p>
            <h1 className="font-display text-3xl font-light text-ivory">Sign In</h1>
          </div>

          {error && (
            <div className="mb-5 border border-red-500/30 bg-red-900/20 px-4 py-3 text-sm text-red-300 font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-champagne/50 font-body mb-1.5">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-gold/20 px-4 py-3 text-sm font-body text-ivory placeholder-champagne/20 outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest uppercase text-champagne/50 font-body mb-1.5">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-gold/20 px-4 py-3 text-sm font-body text-ivory placeholder-champagne/20 outline-none focus:border-gold transition-colors"
              />
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-light text-obsidian text-xs tracking-widest uppercase py-4 font-body font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-champagne/40 text-xs font-body">
            Don't have an account?{" "}
            <Link to="/signup" className="text-gold hover:text-gold-light transition-colors">
              Create one
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center">
          <Link to="/" className="text-champagne/30 hover:text-champagne/60 text-xs font-body tracking-widest uppercase transition-colors">
            ← Back to Store
          </Link>
        </p>
      </div>
    </div>
  );
}
