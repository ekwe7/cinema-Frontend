import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair, faCircleInfo, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/AuthContext";
import { generateSeats, BOOKINGS } from "../../data/mockData";

const STATUS_CYCLE = { available: "occupied", occupied: "reserved", reserved: "available" };
const STATUS_LABEL = { available: "Available", occupied: "Occupied", reserved: "Reserved" };

export default function SeatManager() {
  const { user } = useAuth();
  const initial = generateSeats(user?.theaterId);

  const [seatMap, setSeatMap] = useState(() => {
    const map = {};
    initial.forEach(row => row.seats.forEach(s => { map[s.id] = s.status === "booked" ? "occupied" : "available"; }));
    return map;
  });

  const [selected, setSelected] = useState(null);

  const toggle = seat => {
    setSeatMap(prev => ({ ...prev, [seat.id]: STATUS_CYCLE[prev[seat.id]] ?? "available" }));
  };

  const reset = () => {
    const map = {};
    initial.forEach(row => row.seats.forEach(s => { map[s.id] = s.status === "booked" ? "occupied" : "available"; }));
    setSeatMap(map);
  };

  const counts = Object.values(seatMap).reduce((acc, s) => { acc[s] = (acc[s] || 0) + 1; return acc; }, {});
  const bookedBy = id => BOOKINGS.find(b => b.seats.includes(id));

  return (
    <div className="page">
      <div className="page-title">Seat Manager</div>
      <div className="page-sub">Click a seat to cycle its status: Available → Occupied → Reserved</div>

      <div className="seat-manager-grid">
        {/* Seat Map */}
        <div className="seat-manager-map">
          <div className="seat-screen" style={{ marginBottom: 28 }}>Screen</div>
          <div className="seat-rows">
            {initial.map(row => (
              <div className="seat-row" key={row.row}>
                <div className="row-label">{row.row}</div>
                {row.seats.map((seat, i) => {
                  const status = seatMap[seat.id] ?? "available";
                  return (
                    <>
                      {i === 5 && <div className="seat-gap" key={`gap-${row.row}`} />}
                      <div
                        key={seat.id}
                        className={`admin-seat ${status}`}
                        onClick={() => { toggle(seat); setSelected(seat.id); }}
                        title={`${seat.id} — ${STATUS_LABEL[status]}`}
                        style={{ position: "relative" }}
                      >
                        {seat.number}
                      </div>
                    </>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="seat-legend" style={{ marginTop: 24 }}>
            {Object.entries(STATUS_LABEL).map(([k, v]) => (
              <div className="legend-item" key={k}>
                <div className={`seat-status-dot seat-dot-${k}`} 
                style={{ width: 14, height: 12, borderRadius: "3px 3px 2px 2px", 
                border: "1.5px solid transparent", ...(k === "available" ? { background: "var(--surface2)", 
                borderColor: "var(--border2)" } : k === "occupied" ? { background: "var(--danger)" } : { background: "var(--warning)" }) }} />
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="seat-manager-panel">
          {/* Stats */}
          <div className="seat-status-legend">
            <div className="section-title mb-3">Seat Overview</div>
            {[
              { label: "Available", key: "available", color: "var(--success)" },
              { label: "Occupied",  key: "occupied",  color: "var(--danger)"  },
              { label: "Reserved",  key: "reserved",  color: "var(--warning)" },
            ].map(s => (
              <div className="seat-status-item" key={s.key}>
                <div className="flex items-center gap-2">
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
                  <span>{s.label}</span>
                </div>
                <span className="font-bold">{counts[s.key] ?? 0}</span>
              </div>
            ))}
          </div>

          {/* Selected seat info */}
          {selected && (
            <div className="card" style={{ padding: 16 }}>
              <div className="flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faChair} style={{ color: "var(--gold)" }} />
                <span className="font-bold">Seat {selected}</span>
                <span className={`badge ${seatMap[selected] === "available" ? "badge-green" : seatMap[selected] === "occupied" ? "badge-red" : "badge-yellow"}`}>
                  {STATUS_LABEL[seatMap[selected]]}
                </span>
              </div>
              {bookedBy(selected) && (
                <div style={{ fontSize: 12, color: "var(--text-secondary)", background: "var(--surface2)", borderRadius: 8, padding: "8px 12px" }}>
                  <div><FontAwesomeIcon icon={faCircleInfo} style={{ marginRight: 4 }} />Booked by user</div>
                  <div className="mono text-gold" style={{ marginTop: 4 }}>{bookedBy(selected)?.id}</div>
                </div>
              )}
            </div>
          )}

          <button className="btn btn-ghost btn-full" onClick={reset}>
            <FontAwesomeIcon icon={faRotateLeft} /> Reset All Seats
          </button>
        </div>
      </div>
    </div>
  );
}
