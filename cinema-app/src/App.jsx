import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
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
  // ── Shared booking context for user routes ─────────────────────────────
  const [bookingContext, setBookingContext] = useState({
    movie: null, show: null, seats: [], total: "0.00", guestEmail: "",
  });

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

        {/* Guest user routes — shared booking context */}
        <Route
          path="/user/*"
          element={<UserApp bookingContext={bookingContext} setBookingContext={setBookingContext} />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
