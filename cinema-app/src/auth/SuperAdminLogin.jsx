import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faCrown } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./AuthContext";

export default function SuperAdminLogin() {
  const { loginSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (attempts >= 3) return;
    setError(""); setLoading(true);
    setTimeout(() => {
      const r = loginSuperAdmin(form.email, form.password);
      if (r.success) navigate("/super/dashboard");
      else { setAttempts(a => a + 1); setError(r.error); }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.iconWrap}>
          <FontAwesomeIcon icon={faCrown} style={{ fontSize: 28, color: "#ff3389" }} />
        </div>
        <h1 style={S.title}>Super Admin</h1>
        <p style={S.sub}>Root system access</p>

        {attempts >= 3 ? (
          <div style={S.locked}>
            <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />
            Access suspended. Contact system administrator.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ color: "#9a8a6a" }}>Email</label>
              <div style={S.inputWrap}>
                <FontAwesomeIcon icon={faEnvelope} style={S.inputIcon} />
                <input className="form-input" style={{ ...S.darkInput, paddingLeft: 38 }} type="email" placeholder="superadmin@domain.internal" value={form.email} onChange={set("email")} autoComplete="off" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" style={{ color: "#9a8a6a" }}>Password</label>
              <div style={S.inputWrap}>
                <FontAwesomeIcon icon={faLock} style={S.inputIcon} />
                <input className="form-input" style={{ ...S.darkInput, paddingLeft: 38 }} type="password" placeholder="••••••••••••" value={form.password} onChange={set("password")} autoComplete="new-password" required />
              </div>
            </div>
            {error && (
              <div style={S.error}>
                {error}
                {attempts > 0 && <div style={{ fontSize: 11, marginTop: 4, opacity: 0.8 }}>{3 - attempts} attempt(s) remaining.</div>}
              </div>
            )}
            <button className="btn btn-full btn-lg" type="submit" disabled={loading} style={S.submitBtn}>
              {loading ? "Authenticating..." : "Enter System"}
            </button>
          </form>
        )}

        <div style={S.hint}>Demo: <code style={S.code}>superadmin@zeeShow.internal / Super@Admin2026!</code></div>
        <p style={S.footer}>⚠ Highest privilege access. All actions are logged.</p>
      </div>
    </div>
  );
}

const S = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#030405", padding: 24 },
  card: { background: "#0a0805", border: "1px solid rgba(255,51,137,0.15)", borderRadius: 20, padding: "44px 40px", width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.8)" },
  iconWrap: { width: 64, height: 64, borderRadius: "50%", background: "rgba(255,51,137,0.08)", border: "1px solid rgba(255,51,137,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" },
  title: { fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#ff3389", textAlign: "center", marginBottom: 6 },
  sub: { fontSize: 11, color: "#4a4a55", textAlign: "center", marginBottom: 28, textTransform: "uppercase", letterSpacing: 3 },
  inputWrap: { position: "relative" },
  inputIcon: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4a4a55", fontSize: 12, pointerEvents: "none" },
  darkInput: { background: "#120f08", borderColor: "rgba(255,51,137,0.15)", color: "#ff3389" },
  error: { background: "#1a0e00", color: "#f59e0b", border: "1px solid #78350f", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 12 },
  locked: { background: "#1a0e00", color: "#f59e0b", border: "1px solid #78350f", borderRadius: 8, padding: 16, fontSize: 14, textAlign: "center", lineHeight: 1.6 },
  submitBtn: { background: "linear-gradient(135deg, #cc0056, #ff3389)", color: "#ffffff", border: "none", fontFamily: "inherit", fontWeight: 700, marginTop: 4 },
  hint: { marginTop: 20, padding: "10px 14px", background: "rgba(255,51,137,0.04)", borderRadius: 8, fontSize: 11, color: "#9a8a9a", textAlign: "center" },
  code: { color: "#ff3389", fontFamily: "monospace", fontSize: 10 },
  footer: { fontSize: 11, color: "#4a4a55", textAlign: "center", marginTop: 20, lineHeight: 1.5 },
};
