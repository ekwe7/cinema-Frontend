import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function UserLogin() {
  const { loginUser, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (mode === "login") {
        const result = loginUser(form.email, form.password);
        if (result.success) {
          navigate("/browse");
        } else {
          setError(result.error);
        }
      } else {
        if (form.password !== form.confirm) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        if (form.password.length < 6) {
          setError("Password must be at least 6 characters.");
          setLoading(false);
          return;
        }
        const result = register(form.name, form.email, form.password);
        if (result.success) {
          navigate("/browse");
        } else {
          setError(result.error);
        }
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <Link to="/" style={styles.logoLink}>
          <div style={styles.logo}>🎬 CineBook</div>
        </Link>
        <p style={styles.tagline}>
          {mode === "login" ? "Welcome back! Sign in to continue." : "Create your account to get started."}
        </p>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{ ...styles.tab, ...(mode === "login" ? styles.tabActive : {}) }}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Sign In
          </button>
          <button
            style={{ ...styles.tab, ...(mode === "register" ? styles.tabActive : {}) }}
            onClick={() => { setMode("register"); setError(""); }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="Your full name" value={form.name} onChange={set("name")} required />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} required />
          </div>
          {mode === "register" && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input className="form-input" type="password" placeholder="••••••••" value={form.confirm} onChange={set("confirm")} required />
            </div>
          )}

          {error && <div style={styles.error}>{error}</div>}

          <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {mode === "login" && (
          <div style={styles.hint}>
            <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>Demo: </span>
            <code style={styles.code}>alice@email.com / user123</code>
          </div>
        )}

        <div style={styles.backLink}>
          <Link to="/" style={styles.link}>← Back to home</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f0f4ff 0%, #f5f5f3 100%)",
    padding: 24,
  },
  card: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "40px 36px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "var(--shadow-lg)",
  },
  logoLink: { textDecoration: "none" },
  logo: {
    fontSize: 24,
    fontWeight: 800,
    color: "var(--accent)",
    marginBottom: 6,
  },
  tagline: {
    fontSize: 14,
    color: "var(--text-secondary)",
    marginBottom: 24,
  },
  tabs: {
    display: "flex",
    background: "var(--surface2)",
    borderRadius: 10,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    padding: "8px 16px",
    border: "none",
    background: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    color: "var(--text-secondary)",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  tabActive: {
    background: "var(--surface)",
    color: "var(--text)",
    boxShadow: "var(--shadow)",
  },
  error: {
    background: "var(--danger-light)",
    color: "var(--danger)",
    border: "1px solid #fca5a5",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    marginBottom: 12,
    fontWeight: 500,
  },
  hint: {
    marginTop: 16,
    padding: "10px 14px",
    background: "var(--surface2)",
    borderRadius: 8,
    fontSize: 13,
  },
  code: {
    fontFamily: "monospace",
    fontSize: 12,
    background: "var(--border)",
    padding: "2px 6px",
    borderRadius: 4,
  },
  backLink: {
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    color: "var(--text-secondary)",
    fontSize: 13,
    textDecoration: "none",
  },
};
