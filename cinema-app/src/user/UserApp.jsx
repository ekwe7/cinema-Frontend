import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import BrowseMovies from "./pages/BrowseMovies";
import BookingFlow  from "./pages/BookingFlow";
import Payment      from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";
import "../styles/user.css";

const TITLES = {
  "/browse":   "Now Showing",
  "/book":     "Book Tickets",
  "/payment":  "Payment",
  "/success":  "Booking Confirmed",
};

export default function UserApp() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const [bookingContext, setBookingContext] = useState({
    movie: null, show: null, seats: [], total: "0.00", guestEmail: "",
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
          <button
            className={`nav-item${location.pathname.startsWith("/browse") ? " active" : ""}`}
            onClick={() => navigate("/browse")}
          >
            <span className="nav-icon"><FontAwesomeIcon icon={faFilm} /></span>
            Browse Movies
          </button>
        </nav>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-title">{title}</div>
        </header>
        <Routes>
          <Route path="/browse"  element={<BrowseMovies setBookingContext={setBookingContext} />} />
          <Route path="/book"    element={<BookingFlow  bookingContext={bookingContext} setBookingContext={setBookingContext} />} />
          <Route path="/payment" element={<Payment      bookingContext={bookingContext} setBookingContext={setBookingContext} />} />
          <Route path="/success" element={<BookingSuccess bookingContext={bookingContext} />} />
          <Route path="*"        element={<BrowseMovies setBookingContext={setBookingContext} />} />
        </Routes>
      </div>
    </div>
  );
}
