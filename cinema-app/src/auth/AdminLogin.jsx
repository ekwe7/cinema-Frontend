import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faShield } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./AuthContext";

export default function AdminLogin() {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (attempts >= 5) return;
    setError(""); setLoading(true);
    setTimeout(() => {
      const r = loginAdmin(form.email, form.password);
      if (r.success) navigate("/admin/dashboard");
      else { setAttempts(a => a + 1); setError(r.error); }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.iconWrap}>
          <FontAwesomeIcon icon={faShield} style={{ fontSize: 28, color: "#cc0056" }} />
        </div>
        <h1 style={S.title}>Theater Admin Access</h1>
        <p style={S.sub}>Authorised personnel only</p>

        {attempts >= 5 ? (
          <div style={S.locked}>
            <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />
            Too many failed attempts. Contact your system administrator.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ color: "#e2e8f0" }}>Admin Email</label>
              <div style={S.inputWrap}>
                <FontAwesomeIcon icon={faEnvelope} style={S.inputIcon} />
                <input className="form-input" style={{ ...S.darkInput, paddingLeft: 38 }} type="email" placeholder="admin@domain.com" value={form.email} onChange={set("email")} autoComplete="off" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" style={{ color: "#e2e8f0" }}>Password</label>
              <div style={S.inputWrap}>
                <FontAwesomeIcon icon={faLock} style={S.inputIcon} />
                <input className="form-input" style={{ ...S.darkInput, paddingLeft: 38 }} type="password" placeholder="••••••••••" value={form.password} onChange={set("password")} autoComplete="new-password" required />
              </div>
            </div>
            {error && (
              <div style={S.error}>
                {error}
                {attempts > 2 && <div style={{ fontSize: 11, opacity: 0.8 }}>{5 - attempts} attempt(s) remaining.</div>}
              </div>
            )}
            <button className="btn btn-full btn-lg" type="submit" disabled={loading} style={S.submitBtn}>
              {loading ? "Verifying..." : "Access Admin Portal"}
            </button>
          </form>
        )}

        <div style={S.hint}>Demo: <code style={S.code}>james@zeeShow.com / admin123</code></div>
        <p style={S.footer}>This is a restricted area. Unauthorised access is prohibited.</p>
      </div>
    </div>
  );
}

const S = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050709", padding: 24 },
  card: { background: "#0f1015", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 20, padding: "44px 40px", width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" },
  iconWrap: { width: 64, height: 64, borderRadius: "50%", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" },
  title: { fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#f0f0f0", textAlign: "center", marginBottom: 6 },
  sub: { fontSize: 12, color: "#4a4a55", textAlign: "center", marginBottom: 28, textTransform: "uppercase", letterSpacing: 2 },
  inputWrap: { position: "relative" },
  inputIcon: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4a4a55", fontSize: 12, pointerEvents: "none" },
  darkInput: { background: "#1a1a24", borderColor: "rgba(255,51,137,0.2)", color: "#f0f0f0" },
  error: { background: "#2d1515", color: "#f87171", border: "1px solid #7f1d1d", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 12 },
  locked: { background: "#1f1200", color: "#f59e0b", border: "1px solid #78350f", borderRadius: 8, padding: 16, fontSize: 14, textAlign: "center", lineHeight: 1.6 },
  submitBtn: { background: "#7c3aed", color: "white", border: "none", fontFamily: "inherit", marginTop: 4 },
  hint: { marginTop: 20, padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 8, fontSize: 12, color: "#4a4a55", textAlign: "center" },
  code: { color: "#ff3389", fontFamily: "monospace", fontSize: 11 },
  footer: { fontSize: 11, color: "#2a2a35", textAlign: "center", marginTop: 20, lineHeight: 1.5 },
};
