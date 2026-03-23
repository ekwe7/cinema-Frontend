import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faBuilding, faUsers, faCalendar, faBookmark, faRightFromBracket, faCrown } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../auth/AuthContext";
import { THEATERS, THEATER_ADMINS, BOOKINGS, MOVIES, SHOWS } from "../data/mockData";

// ── Import the FULL pages (not inline components) ─────────────────────────────
import ManageTheaters from "./pages/ManageTheaters";
import ManageAdmins   from "./pages/ManageAdmins";
import SuperDashboard from "./pages/SuperDashboard";
import "../styles/admin.css";

const NAV = [
  { path: "/super/dashboard", icon: faGauge,    label: "Dashboard" },
  { path: "/super/theaters",  icon: faBuilding, label: "Theaters"  },
  { path: "/super/admins",    icon: faUsers,    label: "Admins"    },
  { path: "/super/shows",     icon: faCalendar, label: "Shows"     },
  { path: "/super/bookings",  icon: faBookmark, label: "Bookings"  },
];

const TITLES = {
  "/super/dashboard": "Dashboard",
  "/super/theaters":  "Theaters",
  "/super/admins":    "Admins",
  "/super/shows":     "Shows",
  "/super/bookings":  "Bookings",
};

// ── Keep these simple inline pages for Shows and Bookings ─────────────────────
function ShowsPage() {
  return (
    <div className="page">
      <div className="page-title">All Shows</div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>ID</th><th>Movie</th><th>Theater</th><th>Date</th><th>Time</th><th>Price</th></tr>
            </thead>
            <tbody>
              {SHOWS.map(s => {
                const movie   = MOVIES.find(m => m.id === s.movieId);
                const theater = THEATERS.find(t => t.id === s.theaterId);
                return (
                  <tr key={s.id}>
                    <td><span className="mono text-xs">{s.id}</span></td>
                    <td className="font-semibold">{movie?.title}</td>
                    <td>{theater?.name}</td>
                    <td>{s.date}</td>
                    <td>{s.startTime}</td>
                    <td className="text-gold font-bold">₦{s.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BookingsPage() {
  return (
    <div className="page">
      <div className="page-title">All Bookings</div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>ID</th><th>Movie</th><th>Seats</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {BOOKINGS.map(b => {
                const movie = MOVIES.find(m => m.id === b.movieId);
                return (
                  <tr key={b.id}>
                    <td><span className="mono text-xs text-gold">{b.id}</span></td>
                    <td className="font-semibold">{movie?.title}</td>
                    <td>{b.seats.join(", ")}</td>
                    <td className="font-bold">₦{b.total}</td>
                    <td>
                      <span className={`badge ${b.status === "Confirmed" ? "badge-green" : b.status === "Pending" ? "badge-yellow" : "badge-red"}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function SuperAdminApp() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ── Shared state — this is what was missing ───────────────────────────────
  const [theaters, setTheaters] = useState(THEATERS);
  const [admins, setAdmins]     = useState(THEATER_ADMINS);

  const title = Object.entries(TITLES).find(([k]) => location.pathname.startsWith(k))?.[1] ?? "Super Admin";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <a href="/" className="logo-wrap">
            <div className="logo-icon" style={{ color: "#e8c97a" }}>
              <FontAwesomeIcon icon={faCrown} />
            </div>
            <span className="logo-text">ZeeShow</span>
            <span className="logo-badge" style={{ background: "rgba(232,201,122,0.15)", color: "#e8c97a" }}>Root</span>
          </a>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">System</div>
          {NAV.map(item => (
            <button
              key={item.path}
              className={`nav-item${location.pathname.startsWith(item.path) ? " active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon"><FontAwesomeIcon icon={item.icon} /></span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-name">{user?.name}</div>
            <div className="user-role" style={{ color: "#e8c97a" }}>Super Admin</div>
          </div>
          <button className="btn btn-ghost btn-sm btn-full" onClick={() => { logout(); navigate("/"); }}>
            <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-title">{title}</div>
          <div className="topbar-right">
            <span className="badge" style={{ background: "rgba(232,201,122,0.15)", color: "#e8c97a" }}>
              <FontAwesomeIcon icon={faCrown} /> Super Admin
            </span>
            <div className="avatar" style={{ background: "rgba(232,201,122,0.2)", color: "#e8c97a" }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        <Routes>
          {/* ── Pass shared state as props ── */}
          <Route path="/dashboard" element={<SuperDashboard theaters={theaters} admins={admins} />} />
          <Route path="/theaters"  element={<ManageTheaters theaters={theaters} setTheaters={setTheaters} />} />
          <Route path="/admins"    element={<ManageAdmins   admins={admins} setAdmins={setAdmins} theaters={theaters} />} />
          <Route path="/shows"     element={<ShowsPage />} />
          <Route path="/bookings"  element={<BookingsPage />} />
          <Route path="*"          element={<SuperDashboard theaters={theaters} admins={admins} />} />
        </Routes>
      </div>
    </div>
  );
}