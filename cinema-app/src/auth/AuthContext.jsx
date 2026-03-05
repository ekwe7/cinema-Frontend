import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { MOCK_USERS, ADMIN_CREDENTIALS } from "../data/mockData";

// ── Context ───────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email, role }

  // User login
  const loginUser = (email, password) => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const { password: _pw, ...safe } = found;
      setUser(safe);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password." };
  };

  // Admin login — credentials are checked here, never in the UI
  const loginAdmin = (email, password) => {
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setUser({ name: ADMIN_CREDENTIALS.name, email, role: "admin" });
      return { success: true };
    }
    return { success: false, error: "Invalid admin credentials." };
  };

  // Register new user
  const register = (name, email, password) => {
    const exists = MOCK_USERS.find((u) => u.email === email);
    if (exists) return { success: false, error: "Email already registered." };
    const newUser = { id: `u${Date.now()}`, name, email, role: "user" };
    MOCK_USERS.push({ ...newUser, password });
    setUser(newUser);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginUser, loginAdmin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthContext);
}

// ── Route Guards ──────────────────────────────────────────────────────────────
export function RequireUser({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "user") return <Navigate to="/login" replace />;
  return children;
}

export function RequireAdmin({ children }) {
  const { user } = useAuth();
  // Admin trying to access user routes → redirect to admin dashboard
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}
