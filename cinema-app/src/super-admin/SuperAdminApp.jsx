import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faBuilding, faUsers, faCalendar, faBookmark, faRightFromBracket, faCrown } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../auth/AuthContext";
import { THEATERS, THEATER_ADMINS, BOOKINGS, MOVIES, SHOWS, MOCK_USERS } from "../data/mockData";
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

function SuperDashboard() {
  const revenue = BOOKINGS.filter(b => b.status === "Confirmed").reduce((s, b) => s + b.total, 0);
  return (
    <div className="page">
      <div className="page-title">System Overview</div>
      <div className="page-sub">All theaters · All time</div>
      <div className="stats-grid">
        {[
          { label: "Theaters",  value: THEATERS.length },
          { label: "Admins",    value: THEATER_ADMINS.length },
          { label: "Users",     value: MOCK_USERS.length },
          { label: "Bookings",  value: BOOKINGS.length },
          { label: "Movies",    value: MOVIES.length },
          { label: "Revenue",   value: `₦${revenue.toFixed(0)}` },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TheatersPage() {
  return (
    <div className="page">
      <div className="page-title">Theaters</div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>City</th><th>Status</th></tr></thead>
            <tbody>
              {THEATERS.map(t => (
                <tr key={t.id}>
                  <td><span className="mono text-xs">{t.id}</span></td>
                  <td className="font-semibold">{t.name}</td>
                  <td>{t.city}</td>
                  <td><span className={`badge ${t.status === "Active" ? "badge-green" : "badge-yellow"}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminsPage() {
  return (
    <div className="page">
      <div className="page-title">Theater Admins</div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Theater</th><th>Created</th></tr></thead>
            <tbody>
              {THEATER_ADMINS.map(a => {
                const theater = THEATERS.find(t => t.id === a.theaterId);
                return (
                  <tr key={a.id}>
                    <td className="font-semibold">{a.name}</td>
                    <td>{a.email}</td>
                    <td>{theater?.name ?? a.theaterId}</td>
                    <td>{a.createdDate}</td>
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

function ShowsPage() {
  return (
    <div className="page">
      <div className="page-title">All Shows</div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Movie</th><th>Theater</th><th>Date</th><th>Time</th><th>Price</th></tr></thead>
            <tbody>
              {SHOWS.map(s => {
                const movie = MOVIES.find(m => m.id === s.movieId);
                const theater = THEATERS.find(t => t.id === s.theaterId);
                return (
                  <tr key={s.id}>
                    <td><span className="mono text-xs">{s.id}</span></td>
                    <td className="font-semibold">{movie?.title}</td>
                    <td>{theater?.name}</td>
                    <td>{s.date}</td>
                    <td>{s.startTime}</td>
                    <td>₦{s.price}</td>
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
            <thead><tr><th>ID</th><th>Movie</th><th>Seats</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {BOOKINGS.map(b => {
                const movie = MOVIES.find(m => m.id === b.movieId);
                return (
                  <tr key={b.id}>
                    <td><span className="mono text-xs">{b.id}</span></td>
                    <td className="font-semibold">{movie?.title}</td>
                    <td>{b.seats.join(", ")}</td>
                    <td>₦{b.total}</td>
                    <td><span className={`badge ${b.status === "Confirmed" ? "badge-green" : b.status === "Pending" ? "badge-yellow" : "badge-red"}`}>{b.status}</span></td>
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

export default function SuperAdminApp() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const title = Object.entries(TITLES).find(([k]) => location.pathname.startsWith(k))?.[1] ?? "Super Admin";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <a href="/" className="logo-wrap">
            <div className="logo-icon" style={{ color: "#e8c97a" }}><FontAwesomeIcon icon={faCrown} /></div>
            <span className="logo-text">ZeeShow</span>
            <span className="logo-badge" style={{ background: "rgba(232,201,122,0.15)", color: "#e8c97a" }}>Root</span>
          </a>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">System</div>
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
            <div className="user-role">Super Admin</div>
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
            <div className="avatar" style={{ background: "rgba(232,201,122,0.2)", color: "#e8c97a" }}>{user?.name?.[0]?.toUpperCase()}</div>
          </div>
        </header>
        <Routes>
          <Route path="/dashboard" element={<SuperDashboard />} />
          <Route path="/theaters"  element={<TheatersPage />} />
          <Route path="/admins"    element={<AdminsPage />} />
          <Route path="/shows"     element={<ShowsPage />} />
          <Route path="/bookings"  element={<BookingsPage />} />
          <Route path="*"          element={<SuperDashboard />} />
        </Routes>
      </div>
    </div>
  );
}
