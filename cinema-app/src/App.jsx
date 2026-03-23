import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, RequireAdmin, RequireSuperAdmin } from "./auth/AuthContext";

// Public
import LandingPage     from "./pages/LandingPage";
import AdminLogin      from "./auth/AdminLogin";
import SuperAdminLogin from "./auth/SuperAdminLogin";

// Apps
import UserApp       from "./user/UserApp";
import AdminApp      from "./admin/AdminApp";
import SuperAdminApp from "./super-admin/SuperAdminApp";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/"          element={<LandingPage />} />
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

        {/* Guest user routes — no auth required */}
        <Route path="/browse"  element={<UserApp />} />
        <Route path="/book"    element={<UserApp />} />
        <Route path="/payment" element={<UserApp />} />
        <Route path="/success" element={<UserApp />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
