import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faCoins, faCalendar, faChair, faArrowTrendUp, faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/AuthContext";
import { BOOKINGS, MOVIES, SHOWS, THEATERS } from "../../data/mockData";

const ACTIVITY = [
  { text: "New booking #BK1024 by Tom Wright",        time: "2 min ago",  color: "#cc0056" },
  { text: "Seat G7 marked as occupied",               time: "18 min ago", color: "#ff3389" },
  { text: "Show 'Dune: Part Three 10AM' sold out",    time: "1 hr ago",   color: "#ef4444" },
  { text: "Payment processed for booking #BK1021",    time: "5 hr ago",   color: "#22c55e" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const theater = THEATERS.find(t => t.id === user?.theaterId);
  const myBookings = BOOKINGS.filter(b => b.theaterId === user?.theaterId);
  const myShows = SHOWS.filter(s => s.theaterId === user?.theaterId);
  const revenue = myBookings.filter(b => b.status === "Confirmed").reduce((s, b) => s + b.total, 0);

  return (
    <div className="page">
      <div className="page-title">{theater ? `${theater.name}` : "Dashboard"}</div>
      <div className="page-sub">{theater?.city} · Today's overview</div>

      <div className="stats-grid">
        {[
          { icon: faTicket,   label: "Bookings",   value: myBookings.length, iconClass: "stat-icon-purple", change: "+4 today", up: true },
          { icon: faCoins,    label: "Revenue",    value: `$${revenue.toFixed(0)}`, iconClass: "stat-icon-gold", change: "+$120 today", up: true },
          { icon: faCalendar, label: "Shows",      value: myShows.length,    iconClass: "stat-icon-blue",   change: "2 today", up: true },
          { icon: faChair,    label: "Seats Sold", value: myBookings.reduce((s, b) => s + b.seats.length, 0), iconClass: "stat-icon-green", change: "+8 today", up: true },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon-wrap ${s.iconClass}`}><FontAwesomeIcon icon={s.icon} /></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-change ${s.up ? "stat-up" : "stat-down"}`}>
              <FontAwesomeIcon icon={s.up ? faArrowTrendUp : faArrowTrendDown} /> {s.change}
            </div>
          </div>
        ))}
      </div>

      <div className="two-col">
        <div className="card">
          <div className="section-header">
            <div className="section-title">Recent Bookings</div>
            <span className="badge badge-blue">Today</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Movie</th><th>Seats</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {myBookings.slice(0, 5).map(b => {
                  const movie = MOVIES.find(m => m.id === b.movieId);
                  return (
                    <tr key={b.id}>
                      <td><span className="mono text-xs text-gold">{b.id}</span></td>
                      <td className="font-semibold">{movie?.title}</td>
                      <td>{b.seats.join(", ")}</td>
                      <td className="font-bold">${b.total}</td>
                      <td><span className={`badge ${b.status === "Confirmed" ? "badge-green" : b.status === "Pending" ? "badge-yellow" : "badge-red"}`}>{b.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="section-header"><div className="section-title">Activity Log</div></div>
          {ACTIVITY.map((a, i) => (
            <div className="activity-item" key={i}>
              <div className="activity-dot" style={{ background: a.color }} />
              <div className="activity-text">{a.text}</div>
              <div className="activity-time">{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
