import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faEnvelope, faLock, faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./AuthContext";

export default function UserLogin() {
  const { loginUser, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (mode === "login") {
        const r = loginUser(form.email, form.password);
        if (r.success) navigate("/user/browse");
        else setError(r.error);
      } else {
        if (form.password !== form.confirm) { setError("Passwords do not match."); setLoading(false); return; }
        if (form.password.length < 6) { setError("Password must be at least 6 characters."); setLoading(false); return; }
        const r = register(form.name, form.email, form.password);
        if (r.success) navigate("/user/browse");
        else setError(r.error);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <Link to="/" style={S.logo}>
          <FontAwesomeIcon icon={faFilm} style={{ color: "#e8c97a", fontSize: 20 }} />
          <span style={S.logoText}>ZeeShow</span>
        </Link>
        <p style={S.tagline}>{mode === "login" ? "Welcome back. Sign in to continue." : "Create your account to get started."}</p>

        <div style={S.tabs}>
          {["login","register"].map(m => (
            <button key={m} style={{ ...S.tab, ...(mode === m ? S.tabActive : {}) }} onClick={() => { setMode(m); setError(""); }}>
              {m === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={S.inputWrap}>
                <FontAwesomeIcon icon={faUser} style={S.inputIcon} />
                <input className="form-input" style={{ paddingLeft: 38 }} placeholder="Your full name" value={form.name} onChange={set("name")} required />
              </div>
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <div style={S.inputWrap}>
              <FontAwesomeIcon icon={faEnvelope} style={S.inputIcon} />
              <input className="form-input" style={{ paddingLeft: 38 }} type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={S.inputWrap}>
              <FontAwesomeIcon icon={faLock} style={S.inputIcon} />
              <input className="form-input" style={{ paddingLeft: 38, paddingRight: 40 }} type={showPass ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={set("password")} required />
              <button type="button" style={S.eyeBtn} onClick={() => setShowPass(!showPass)}>
                <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          {mode === "register" && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={S.inputWrap}>
                <FontAwesomeIcon icon={faLock} style={S.inputIcon} />
                <input className="form-input" style={{ paddingLeft: 38 }} type="password" placeholder="••••••••" value={form.confirm} onChange={set("confirm")} required />
              </div>
            </div>
          )}
          {error && <div className="error-msg">{error}</div>}
          <button className="btn btn-gold btn-full btn-lg" type="submit" disabled={loading} style={{ marginTop: 4 }}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {mode === "login" && (
          <div style={S.hint}>
            <span style={{ color: "var(--text-muted)", fontSize: 12 }}>Demo: </span>
            <code style={S.code}>dotun@gmail.com / user123</code>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/" style={{ color: "var(--text-muted)", fontSize: 13, textDecoration: "none" }}>← Back to home</Link>
        </div>
      </div>
    </div>
  );
}

const S = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 24 },
  card: { background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 420, boxShadow: "var(--shadow-lg)" },
  logo: { display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 6 },
  logoText: { fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)" },
  tagline: { fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 },
  tabs: { display: "flex", background: "var(--surface2)", borderRadius: 10, padding: 4, marginBottom: 24 },
  tab: { flex: 1, padding: "8px 16px", border: "none", background: "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", color: "var(--text-secondary)", fontFamily: "inherit", transition: "all 0.15s" },
  tabActive: { background: "var(--surface)", color: "var(--text)", boxShadow: "var(--shadow)" },
  inputWrap: { position: "relative" },
  inputIcon: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: 13, pointerEvents: "none" },
  eyeBtn: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2 },
  hint: { marginTop: 16, padding: "10px 14px", background: "var(--surface2)", borderRadius: 8, fontSize: 13 },
  code: { fontFamily: "monospace", fontSize: 11, background: "var(--bg2)", padding: "2px 6px", borderRadius: 4, color: "var(--gold)" },
};
