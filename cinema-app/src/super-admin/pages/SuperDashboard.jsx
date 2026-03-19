import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUsers, faFilm, faTicket, faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { BOOKINGS, MOVIES } from "../../data/mockData";

export default function SuperDashboard({ theaters, admins }) {
  const revenue = BOOKINGS
    .filter(b => b.status === "Confirmed")
    .reduce((s, b) => s + b.total, 0);

  return (
    <div className="page">
      <div className="page-title">System Overview</div>
      <div className="page-sub">Complete view of all cinema operations</div>

      <div className="stats-grid">
        {[
          { icon: faBuilding, label: "Theaters",     value: theaters.length,       iconClass: "stat-icon-gold"   },
          { icon: faUsers,    label: "Admins",        value: admins.length,         iconClass: "stat-icon-purple" },
          { icon: faFilm,     label: "Movies",        value: MOVIES.length,         iconClass: "stat-icon-blue"   },
          { icon: faTicket,   label: "Total Revenue", value: `$${revenue.toFixed(0)}`, iconClass: "stat-icon-green" },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon-wrap ${s.iconClass}`}><FontAwesomeIcon icon={s.icon} /></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-change stat-up">
              <FontAwesomeIcon icon={faArrowTrendUp} /> Live
            </div>
          </div>
        ))}
      </div>

      <div className="two-col">
        {/* Theaters table */}
        <div className="card">
          <div className="section-header">
            <div className="section-title">Theaters</div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Theater</th><th>City</th><th>Admin</th><th>Status</th></tr>
              </thead>
              <tbody>
                {theaters.map(t => {
                  const admin = admins.find(a => a.theaterId === t.id);
                  return (
                    <tr key={t.id}>
                      <td className="font-semibold">{t.name}</td>
                      <td>{t.city}</td>
                      <td>
                        {admin
                          ? admin.name
                          : <span className="text-secondary text-sm">Unassigned</span>
                        }
                      </td>
                      <td>
                        <span className={`badge ${t.status === "Active" ? "badge-green" : "badge-yellow"}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admins table */}
        <div className="card">
          <div className="section-header">
            <div className="section-title">Theater Admins</div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Name</th><th>Theater</th><th>Since</th></tr>
              </thead>
              <tbody>
                {admins.map(a => {
                  const t = theaters.find(t => t.id === a.theaterId);
                  return (
                    <tr key={a.id}>
                      <td className="font-semibold">{a.name}</td>
                      <td>{t?.name ?? <span className="text-secondary">Unassigned</span>}</td>
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