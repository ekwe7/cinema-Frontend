import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faCalendar, faChair, faReceipt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BOOKINGS, MOVIES, SHOWS } from "../../data/mockData";
import ReceiptModal from "../../components/ReceiptModal";
import { useAuth } from "../../auth/AuthContext";

const STATUS_BADGE = { Confirmed: "badge-green", Pending: "badge-yellow", Cancelled: "badge-red" };

export default function MyBookings() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("All");
  const [receiptBooking, setReceiptBooking] = useState(null);

  const bookings = BOOKINGS.map(b => ({
    ...b,
    movie: MOVIES.find(m => m.id === b.movieId),
    show: SHOWS.find(s => s.id === b.showId),
  }));

  const filtered = filter === "All" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="page">
      <div className="page-title">My Bookings</div>
      <div className="page-sub">Your cinema booking history</div>

      <div className="tabs mb-6" style={{ maxWidth: 400, marginBottom: 24 }}>
        {["All","Confirmed","Pending","Cancelled"].map(f => (
          <button key={f} className={`tab${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {filtered.length === 0
        ? <div className="empty-state card"><div className="empty-icon"><FontAwesomeIcon icon={faFilm} /></div><p>No bookings found.</p></div>
        : (
          <div className="flex flex-col gap-4">
            {filtered.map(b => (
              <div key={b.id} className="booking-card">
                <div className="booking-poster">
                  {b.movie?.posterUrl
                    ? <img src={b.movie.posterUrl} alt="" />
                    : <FontAwesomeIcon icon={faFilm} />
                  }
                </div>
                <div className="booking-info">
                  <div className="booking-title">{b.movie?.title}</div>
                  <div className="booking-meta">
                    <span><FontAwesomeIcon icon={faCalendar} style={{ marginRight: 4, fontSize: 11 }} />{b.show?.date}</span>
                    <span>{b.show?.startTime}</span>
                    <span><FontAwesomeIcon icon={faChair} style={{ marginRight: 4, fontSize: 11 }} />{b.seats.join(", ")}</span>
                    <span className={`badge ${STATUS_BADGE[b.status]}`}>{b.status}</span>
                    <span className="font-bold text-gold">${b.total.toFixed(2)}</span>
                  </div>
                  <div className="booking-actions">
                    {b.status === "Confirmed" && (
                      <button className="btn btn-ghost btn-sm" onClick={() => setReceiptBooking(b)}>
                        <FontAwesomeIcon icon={faReceipt} /> Get Receipt
                      </button>
                    )}
                    {b.status !== "Cancelled" && (
                      <button className="btn btn-danger btn-sm">
                        <FontAwesomeIcon icon={faXmark} /> Cancel
                      </button>
                    )}
                  </div>
                </div>
                <span className="mono text-xs text-secondary" style={{ flexShrink: 0 }}>{b.id}</span>
              </div>
            ))}
          </div>
        )
      }

      <ReceiptModal
        open={!!receiptBooking}
        onClose={() => setReceiptBooking(null)}
        bookingId={receiptBooking?.id}
        userEmail={user?.email}
      />
    </div>
  );
}
