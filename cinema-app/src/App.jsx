import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, RequireUser, RequireAdmin, RequireSuperAdmin } from "./auth/AuthContext";

// Public
import LandingPage     from "./pages/LandingPage";
import UserLogin       from "./auth/UserLogin";
import AdminLogin      from "./auth/AdminLogin";
import SuperAdminLogin from "./auth/SuperAdminLogin";

// Protected apps
import UserApp       from "./user/UserApp";
import AdminApp      from "./admin/AdminApp";
import SuperAdminApp from "./super-admin/SuperAdminApp";

export default function App() {
  return (
    <AuthProvider>
      <Routes>

        <Route path="/"          element={<LandingPage />} />
        <Route path="/login"     element={<UserLogin />} />

        <Route path="/backstage" element={<AdminLogin />} />
        <Route path="/root"      element={<SuperAdminLogin />} />

        <Route
          path="/super/*"
          element={
            <RequireSuperAdmin>
              <SuperAdminApp />
            </RequireSuperAdmin>
          }
        />

        <Route
          path="/admin/*"
          element={
            <RequireAdmin>
              <AdminApp />
            </RequireAdmin>
          }
        />

        <Route
          path="/*"
          element={
            <RequireUser>
              <UserApp />
            </RequireUser>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
