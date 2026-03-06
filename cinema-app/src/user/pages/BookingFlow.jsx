import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { SHOWS } from "../../data/mockData";
import { ShowList, SeatMap, BookingSummary } from "../components/ShowList";

const STEPS = ["Select Show", "Select Seats", "Payment"];

export default function BookingFlow({ bookingContext, setBookingContext }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const { movie, show, seats } = bookingContext;

  if (!movie) { navigate("/browse"); return null; }

  const availableShows = SHOWS.filter(s => s.movieId === movie.id);

  const selectShow = s => setBookingContext(prev => ({ ...prev, show: s, seats: [] }));

  const toggleSeat = seat => {
    if (seat.status === "booked") return;
    setBookingContext(prev => {
      const already = prev.seats.includes(seat.id);
      const newSeats = already ? prev.seats.filter(id => id !== seat.id) : [...prev.seats, seat.id];
      const total = show ? (newSeats.length * parseFloat(show.price)).toFixed(2) : "0.00";
      return { ...prev, seats: newSeats, total };
    });
  };

  return (
    <div className="page">
      <button className="btn btn-ghost btn-sm mb-4" onClick={() => navigate("/browse")}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Movies
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", background: "var(--surface2)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {movie.posterUrl ? <img src={movie.posterUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 24 }}>🎬</span>}
        </div>
        <div>
          <div className="page-title" style={{ marginBottom: 4 }}>{movie.title}</div>
          <div className="flex gap-2 items-center">
            <span className="badge badge-gold">{movie.genre}</span>
            <span className="text-sm text-secondary">{movie.duration}</span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="steps mb-6">
        {STEPS.map((label, index) => (
          <div key={label} className="flex items-center" style={{ flex: index < STEPS.length - 1 ? 1 : "none" }}>
            <div className={`step-item step-${index < step ? "done" : index === step ? "active" : "idle"}`}>
              <div className="step-num">{index < step ? <FontAwesomeIcon icon={faCheck} style={{ fontSize: 11 }} /> : index + 1}</div>
              <div className="step-label">{label}</div>
            </div>
            {index < STEPS.length - 1 && <div className={`step-line${index < step ? " step-line-done" : ""}`} style={{ flex: 1, margin: "0 12px" }} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <div className="section-title mb-4">Choose a Showtime</div>
          {availableShows.length === 0
            ? <div className="card empty-state"><div className="empty-icon">🎭</div><p>No shows available for this movie.</p></div>
            : <ShowList shows={availableShows} selected={show} onSelect={selectShow} />
          }
          <div className="mt-4">
            <button className="btn btn-gold btn-lg" disabled={!show} onClick={() => setStep(1)}>
              Continue to Seat Selection →
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
          <div className="card"><SeatMap selectedSeats={seats} onToggle={toggleSeat} /></div>
          <BookingSummary movie={movie} show={show} seats={seats} onBack={() => setStep(0)} onNext={() => navigate("/payment")} />
        </div>
      )}
    </div>
  );
}
