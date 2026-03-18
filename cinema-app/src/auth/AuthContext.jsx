import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { MOCK_USERS, THEATER_ADMINS, SUPER_ADMIN } from "../data/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  //  User login
  const loginUser = (email, password) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _pw, ...safe } = found;
      setUser(safe);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password." };
  };

  // Theater Admin login
  const loginAdmin = (email, password) => {
    const found = THEATER_ADMINS.find(a => a.email === email && a.password === password);
    if (found) {
      const { password: _pw, ...safe } = found;
      setUser(safe);
      return { success: true };
    }
    return { success: false, error: "Invalid admin credentials." };
  };

  // Super Admin login
  const loginSuperAdmin = (email, password) => {
    if (email === SUPER_ADMIN.email && password === SUPER_ADMIN.password) {
      setUser({ name: SUPER_ADMIN.name, email, role: "super_admin" });
      return { success: true };
    }
    return { success: false, error: "Invalid super admin credentials." };
  };

  // Register user 
    const register = (name, email, password) => {
    const exists = MOCK_USERS.find(u => u.email === email);
    if (exists) return { success: false, error: "Email already registered." };
    const newUser = { id: `u${Date.now()}`, name, email, role: "user" };
    MOCK_USERS.push({ ...newUser, password });
    setUser(newUser);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginUser, loginAdmin, loginSuperAdmin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Route Guards 
export function RequireUser({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "user") return <Navigate to="/login" replace />;
  return children;
}



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
