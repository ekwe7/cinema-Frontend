import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faChair, faFilm, faCalendar, faBookmark, faRightFromBracket, faShield } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../auth/AuthContext";
import { THEATERS } from "../data/mockData";

import Dashboard from "./pages/DashBoard";
import SeatManager from "./pages/SeatManager";
import MoviesAdmin from "./pages/MoviesAdmin";
import ShowsAdmin from "./pages/ShowsAdmin";
import BookingsAdmin from "./pages/BookingsAdmin";
import "../styles/admin.css";

const NAV = [
  { path: "/admin/dashboard", icon: faGauge,    label: "Dashboard"    },
  { path: "/admin/seats",     icon: faChair,    label: "Seat Manager" },
  { path: "/admin/movies",    icon: faFilm,     label: "Movies"       },
  { path: "/admin/shows",     icon: faCalendar, label: "Shows"        },
  { path: "/admin/bookings",  icon: faBookmark, label: "Bookings"     },
];

const TITLES = {
  "/admin/dashboard": "Dashboard",
  "/admin/seats":     "Seat Manager",
  "/admin/movies":    "Movies",
  "/admin/shows":     "Shows",
  "/admin/bookings":  "Bookings",
};

export default function AdminApp() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const theater = THEATERS.find(t => t.id === user?.theaterId);
  const title = Object.entries(TITLES).find(([k]) => location.pathname.startsWith(k))?.[1] ?? "Admin";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <a href="/" className="logo-wrap">
            <div className="logo-icon" style={{ color: "#a78bfa" }}><FontAwesomeIcon icon={faShield} /></div>
            <span className="logo-text">ZeeShow</span>
            <span className="logo-badge badge-purple">Admin</span>
          </a>
        </div>

        {theater && (
          <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "var(--text-muted)", marginBottom: 4 }}>Your Theater</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{theater.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{theater.city}</div>
          </div>
        )}

        <nav className="sidebar-nav">
          <div className="nav-section-label">Management</div>
          {NAV.map(item => (
            <button
              key={item.path}
              className={`nav-item${location.pathname.startsWith(item.path) ? " active-purple" : ""}`}
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
            <div className="user-role">Theater Admin</div>
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
            <span className="badge badge-purple"><FontAwesomeIcon icon={faShield} /> Admin</span>
            <div className="avatar avatar-purple">{user?.name?.[0]?.toUpperCase()}</div>
          </div>
        </header>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/seats"     element={<SeatManager />} />
          <Route path="/movies"    element={<MoviesAdmin />} />
          <Route path="/shows"     element={<ShowsAdmin />} />
          <Route path="/bookings"  element={<BookingsAdmin />} />
          <Route path="*"          element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}
