import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { BOOKINGS, MOVIES, SHOWS } from "../../data/mockData";
import DataTable from "../../components/DataTable";

export default function BookingsAdmin() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("All");

  const bookings = BOOKINGS
    .filter(b => b.theaterId === user?.theaterId)
    .map(b => ({ ...b, movieTitle: MOVIES.find(m => m.id === b.movieId)?.title, showTime: SHOWS.find(s => s.id === b.showId)?.startTime }));

  const filtered = filter === "All" ? bookings : bookings.filter(b => b.status === filter);

  const cols = [
    { key: "id",         label: "ID",       render: r => <span className="mono text-xs text-gold">{r.id}</span> },
    { key: "movieTitle", label: "Movie",     render: r => <strong>{r.movieTitle}</strong> },
    { key: "seats",      label: "Seats",     render: r => <span className="mono text-xs">{r.seats.join(", ")}</span> },
    { key: "date",       label: "Date" },
    { key: "showTime",   label: "Time",      render: r => <span className="badge badge-blue">{r.showTime}</span> },
    { key: "total",      label: "Total",     render: r => <strong className="text-gold">${r.total.toFixed(2)}</strong> },
    { key: "status",     label: "Status",    render: r => <span className={`badge ${r.status === "Confirmed" ? "badge-green" : r.status === "Pending" ? "badge-yellow" : "badge-red"}`}>{r.status}</span> },
  ];

  return (
    <div className="page">
      <div className="page-title">Bookings</div>
      <div className="page-sub">All reservations for your theater</div>
      <div className="tabs mb-4" style={{ maxWidth: 380, marginBottom: 20 }}>
        {["All","Confirmed","Pending","Cancelled"].map(f => (
          <button key={f} className={`tab${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="card">
        <DataTable columns={cols} rows={filtered} />
      </div>
    </div>
  );
}
