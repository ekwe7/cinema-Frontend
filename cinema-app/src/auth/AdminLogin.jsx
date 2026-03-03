import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


export default function AdminLogin() {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attempts >= 5) return; // basic brute-force guard
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = loginAdmin(form.email, form.password);
      if (result.success) {
        navigate("/admin/dashboard");
      } else {
        setAttempts((a) => a + 1);
        setError(result.error);
      }
      setLoading(false);
    }, 800);
  };

  const locked = attempts >= 5;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.lockIcon}>🔐</div>
        <h1 style={styles.title}>System Access</h1>
        <p style={styles.sub}>Authorised personnel only</p>

        {locked ? (
          <div style={styles.lockedMsg}>
            ⛔ Too many failed attempts. Please contact your system administrator.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <input
                className="form-input"
                type="email"
                placeholder="admin@domain.internal"
                value={form.email}
                onChange={set("email")}
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••••"
                value={form.password}
                onChange={set("password")}
                autoComplete="new-password"
                required
              />
            </div>

            {error && (
              <div style={styles.error}>
                {error}
                {attempts > 2 && (
                  <div style={{ marginTop: 4, fontSize: 11 }}>
                    {5 - attempts} attempt(s) remaining.
                  </div>
                )}
              </div>
            )}

            <button
              className="btn btn-full btn-lg"
              type="submit"
              disabled={loading}
              style={styles.submitBtn}
            >
              {loading ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>
        )}

        <p style={styles.footer}>
          This is a restricted area. Unauthorised access is prohibited.
        </p>
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
    background: "#0f0f0f",
    padding: 24,
  },
  card: {
    background: "#1a1a1a",
    border: "1px solid #2e2e2e",
    borderRadius: "var(--radius-lg)",
    padding: "44px 40px",
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  },
  lockIcon: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: "#f0f0f0",
    textAlign: "center",
    marginBottom: 6,
  },
  sub: {
    fontSize: 13,
    color: "#6b6b65",
    textAlign: "center",
    marginBottom: 32,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
  },
  error: {
    background: "#2d1515",
    color: "#f87171",
    border: "1px solid #7f1d1d",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    marginBottom: 12,
    fontWeight: 500,
  },
  lockedMsg: {
    background: "#1f1200",
    color: "#f59e0b",
    border: "1px solid #78350f",
    borderRadius: 8,
    padding: "16px",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 1.5,
  },
  submitBtn: {
    background: "#7c3aed",
    color: "white",
    marginTop: 8,
    border: "none",
    transition: "all 0.15s",
  },
  footer: {
    fontSize: 11,
    color: "#3a3a3a",
    textAlign: "center",
    marginTop: 24,
    lineHeight: 1.5,
  },
};
