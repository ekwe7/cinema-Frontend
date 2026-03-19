import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUsers, faFilm, faTicket, faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { THEATERS, THEATER_ADMINS, MOVIES, BOOKINGS } from "../../data/mockData";

const revenue = BOOKINGS.filter(b => b.status === "Confirmed").reduce((s, b) => s + b.total, 0);

export default function SuperDashboard() {
  return (
    <div className="page">
      <div className="page-title">System Overview</div>
      <div className="page-sub">Complete view of all cinema operations</div>

      <div className="stats-grid">
        {[
          { icon: faBuilding, label: "Theaters",    value: THEATERS.length,       iconClass: "stat-icon-gold",   change: "2 active" },
          { icon: faUsers,    label: "Admins",       value: THEATER_ADMINS.length, iconClass: "stat-icon-purple", change: "All active" },
          { icon: faFilm,     label: "Movies",       value: MOVIES.length,         iconClass: "stat-icon-blue",   change: "+1 this week" },
          { icon: faTicket,   label: "Total Revenue", value: `$${revenue.toFixed(0)}`, iconClass: "stat-icon-green", change: "+$240 today" },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon-wrap ${s.iconClass}`}><FontAwesomeIcon icon={s.icon} /></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-change stat-up"><FontAwesomeIcon icon={faArrowTrendUp} /> {s.change}</div>
          </div>
        ))}
      </div>

      <div className="two-col">
        {/* Theaters status */}
        <div className="card">
          <div className="section-header"><div className="section-title">Theaters</div></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Theater</th><th>City</th><th>Admin</th><th>Status</th></tr></thead>
              <tbody>
                {THEATERS.map(t => {
                  const admin = THEATER_ADMINS.find(a => a.theaterId === t.id);
                  return (
                    <tr key={t.id}>
                      <td className="font-semibold">{t.name}</td>
                      <td>{t.city}</td>
                      <td>{admin ? admin.name : <span className="text-secondary text-sm">Unassigned</span>}</td>
                      <td><span className={`badge ${t.status === "Active" ? "badge-green" : "badge-yellow"}`}>{t.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admins */}
        <div className="card">
          <div className="section-header"><div className="section-title">Theater Admins</div></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Theater</th><th>Since</th></tr></thead>
              <tbody>
                {THEATER_ADMINS.map(a => {
                  const t = THEATERS.find(t => t.id === a.theaterId);
                  return (
                    <tr key={a.id}>
                      <td className="font-semibold">{a.name}</td>
                      <td>{t?.name}</td>
                      <td className="text-sm text-secondary">{a.createdAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
