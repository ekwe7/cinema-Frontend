import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { THEATER_ADMINS, SUPER_ADMIN } from "../data/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("zeeshow_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const saveUser = (u) => {
    setUser(u);
    if (u) localStorage.setItem("zeeshow_user", JSON.stringify(u));
    else localStorage.removeItem("zeeshow_user");
  };

  // Theater Admin login
  const loginAdmin = (email, password) => {
    const found = THEATER_ADMINS.find(a => a.email === email && a.password === password);
    if (found) {
      const { password: _pw, ...safe } = found;
      saveUser(safe);
      return { success: true };
    }
    return { success: false, error: "Invalid admin credentials." };
  };

  // Super Admin login
  const loginSuperAdmin = (email, password) => {
    if (email === SUPER_ADMIN.email && password === SUPER_ADMIN.password) {
      saveUser({ name: SUPER_ADMIN.name, email, role: "super_admin" });
      return { success: true };
    }
    return { success: false, error: "Invalid super admin credentials." };
  };

  const logout = () => saveUser(null);

  return (
    <AuthContext.Provider value={{ user, loginAdmin, loginSuperAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Route Guards
export function RequireAdmin({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/backstage" replace />;
  return children;
}

export function RequireSuperAdmin({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "super_admin") return <Navigate to="/root" replace />;
  return children;
}
