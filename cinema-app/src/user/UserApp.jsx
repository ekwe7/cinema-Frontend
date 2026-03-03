import { use, useState } from "react";
import { Routes, Route, useNavigate, useLocation} from "react-router-dom";






export default function UserApp() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [bookingContext, setBookingContext] = useState({
        movie: null,
        show: null,
        seats: [],
        total: "0.00",
    });

    const navItems = [
        {path: "/browser", label: "Browse Movies"},
        {path: "/bookings", label: "My Bookings"},
    ];

    

  return (
    <div className="app-shell">
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-mark">ZezeApp</div>
                <div className="logo-sub">movie Booking</div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section-label">Menu</div>
                {navItems.map((item) => (
                    <button 
                        key={item.path}
                        className={`nav-item${location.pathname.startsWith(item.path) ? " active" : ""}`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className="nav-item-icon">{item.icon}</span>
                        {item.label}

                    </button>
                ) )};
            </nav>

            <div className="side-footer">
                <div style={{}}></div>
                <div style={{}}></div>
                <button className="btn btn-secondary btn-sm btn-full onClick={handlelogout}">
                    Sign Out
                </button>
            </div>

        </aside>

        <div className="main-content">
            <header className="topbar">
                <div className="topbar-title">{}</div>
                <div className="topbar-actions">
                    <div className="avatar">{user?.name?.[0]?.toUpperCase()}</div>
                </div>
            </header>
        </div>
      
    </div>
  );
}