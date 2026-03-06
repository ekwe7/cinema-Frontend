import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faBookmark, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../auth/AuthContext";
import BrowseMovies from "./pages/BrowseMovies";
import BookingFlow from "./pages/BookingFlow";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";
import "../styles/user.css";

const NAV = [
  { path: "/browse",      icon: faFilm,     label: "Browse Movies" },
  { path: "/my-bookings", icon: faBookmark,  label: "My Bookings"   },
];

const TITLES = {
  "/browse":       "Now Showing",
  "/book":         "Book Tickets",
  "/payment":      "Payment",
  "/success":      "Booking Confirmed",
  "/my-bookings":  "My Bookings",
};

export default function UserApp() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [bookingContext, setBookingContext] = useState({
    movie: null, show: null, seats: [], total: "0.00",
  });

  const title = Object.entries(TITLES).find(([k]) => location.pathname.startsWith(k))?.[1] ?? "ZeeShow";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <a href="/" className="logo-wrap">
            <div className="logo-icon"><FontAwesomeIcon icon={faFilm} /></div>
            <span className="logo-text">ZeeShow</span>
          </a>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">Menu</div>
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
            <div className="user-role">{user?.email}</div>
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
            <div className="avatar avatar-gold">{user?.name?.[0]?.toUpperCase()}</div>
          </div>
        </header>
        <Routes>
          <Route path="/browse"      element={<BrowseMovies setBookingContext={setBookingContext} />} />
          <Route path="/book"        element={<BookingFlow bookingContext={bookingContext} setBookingContext={setBookingContext} />} />
          <Route path="/payment"     element={<Payment bookingContext={bookingContext} />} />
          <Route path="/success"     element={<BookingSuccess bookingContext={bookingContext} />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="*"            element={<BrowseMovies setBookingContext={setBookingContext} />} />
        </Routes>
      </div>
    </div>
  );
}
