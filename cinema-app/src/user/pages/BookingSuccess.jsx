import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faFilm, faReceipt, faTicket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/AuthContext";
import ReceiptModal from "../../components/ReceiptModal";

export default function BookingSuccess({ bookingContext }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [receiptOpen, setReceiptOpen] = useState(false);
  const bookingId = useRef(`BK${Math.floor(Math.random() * 9000 + 1000)}`);
  const { movie, show, seats, total } = bookingContext;

  useEffect(() => { if (!movie) navigate("/browse"); }, []);
  if (!movie) return null;

  const grandTotal = (parseFloat(total || 0) + 1.5).toFixed(2);

  return (
    <div className="page">
      <div className="success-screen">
        <div className="success-icon-wrap">
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
        <div className="success-title">Booking Confirmed!</div>
        <div className="success-sub">Your tickets have been booked. See you at the cinema!</div>

        {/* Ticket */}
        <div className="ticket">
          <div className="ticket-header">
            <div style={{ width: 48, height: 48, borderRadius: 10, overflow: "hidden", background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {movie.posterUrl
                ? <img src={movie.posterUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <FontAwesomeIcon icon={faFilm} style={{ color: "var(--text-muted)" }} />
              }
            </div>
            <div>
              <div className="ticket-movie-title">{movie.title}</div>
              <div className="ticket-movie-sub">{movie.genre} · {movie.duration}</div>
            </div>
            <span className="badge badge-green" style={{ marginLeft: "auto" }}>
              <FontAwesomeIcon icon={faCircleCheck} /> Paid
            </span>
          </div>
          <hr className="ticket-divider" />
          {[
            ["Booking ID", <span className="mono" style={{ color: "var(--gold)" }}>{bookingId.current}</span>],
            ["Date",       show?.date],
            ["Showtime",   show?.startTime],
            ["Seats",      seats?.join(", ")],
          ].map(([k, v]) => (
            <div className="ticket-row" key={k}>
              <span className="ticket-key">{k}</span>
              <span className="ticket-val">{v}</span>
            </div>
          ))}
          <hr className="ticket-divider" />
          <div className="ticket-row">
            <span className="ticket-key">Total Paid</span>
            <span className="ticket-val" style={{ color: "var(--gold)", fontSize: 18 }}>${grandTotal}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center" style={{ flexWrap: "wrap" }}>
          <button className="btn btn-gold btn-lg" onClick={() => navigate("/browse")}>
            <FontAwesomeIcon icon={faTicket} /> Browse More Movies
          </button>
          
        {/* Receipt Button  */}
          <button className="btn btn-ghost btn-lg" onClick={() => setReceiptOpen(true)}>
            <FontAwesomeIcon icon={faReceipt} /> Get Receipt
          </button>
        </div>
      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        open={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        bookingId={bookingId.current}
        userEmail={user?.email}
      />
    </div>
  );
}
