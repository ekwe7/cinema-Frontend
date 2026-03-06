import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { THEATERS, generateSeats } from "../../data/mockData";

// ShowList 
export function ShowList({ shows, selected, onSelect }) {
  return (
    <div className="shows-list">
      {shows.map(show => {
        const theater = THEATERS.find(t => t.id === show.theaterId);
        return (
          <div
            key={show.id}
            className={`show-item${selected?.id === show.id ? " selected" : ""}`}
            onClick={() => onSelect(show)}
          >
            <div>
              <div className="show-time">{show.startTime}</div>
              <div className="show-details">
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: 4, fontSize: 11 }} />
                {theater?.name} · {theater?.city}
                <span style={{ margin: "0 6px", opacity: 0.4 }}>·</span>
                <FontAwesomeIcon icon={faCalendar} style={{ marginRight: 4, fontSize: 11 }} />
                {show.date}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="show-price">${show.price}</div>
              <div className="text-sm text-secondary">per seat</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// SeatMap
const SEAT_DATA = generateSeats();

export function SeatMap({ selectedSeats, onToggle }) {
  return (
    <div className="seat-map-wrap">
      <div className="seat-screen">Screen</div>
      <div className="seat-rows">
        {SEAT_DATA.map(row => (
          <div className="seat-row" key={row.row}>
            <div className="row-label">{row.row}</div>
            {row.seats.map((seat, i) => (
              <>
                {i === 5 && <div className="seat-gap" key={`gap-${row.row}`} />}
                <div
                  key={seat.id}
                  className={`seat ${selectedSeats.includes(seat.id) ? "selected" : seat.status}`}
                  onClick={() => onToggle(seat)}
                  title={seat.id}
                >
                  {seat.number}
                </div>
              </>
            ))}
          </div>
        ))}
      </div>
      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-swatch" style={{ background: "var(--surface2)", borderColor: "var(--border2)" }} /> Available
        </div>
        <div className="legend-item">
          <div className="legend-swatch" style={{ background: "var(--gold)", borderColor: "#c9a832" }} /> Selected
        </div>
        <div className="legend-item">
          <div className="legend-swatch" style={{ background: "var(--surface2)", borderColor: "var(--border)", opacity: 0.4 }} /> Booked
        </div>
      </div>
    </div>
  );
}

// BookingSummary 
export function BookingSummary({ movie, show, seats, onBack, onNext }) {
  const total = show ? (seats.length * parseFloat(show.price)).toFixed(2) : "0.00";
  return (
    <div className="booking-summary">
      <div className="summary-title">Booking Summary</div>
      {[
        ["Movie",    movie?.title],
        ["Show",     show?.startTime],
        ["Date",     show?.date],
        ["Seats",    seats.length > 0 ? seats.join(", ") : <span className="text-secondary">None selected</span>],
        ["Price/seat", `$${show?.price}`],
      ].map(([k, v]) => (
        <div className="summary-row" key={k}>
          <span>{k}</span><span className="summary-val">{v}</span>
        </div>
      ))}
      <div className="summary-total">
        <span>Subtotal</span>
        <span className="text-gold">${total}</span>
      </div>
      <button className="btn btn-gold btn-full btn-lg" style={{ marginTop: 20 }} disabled={seats.length === 0} onClick={onNext}>
        Proceed to Payment →
      </button>
      <button className="btn btn-ghost btn-full" style={{ marginTop: 8 }} onClick={onBack}>
        ← Change Show
      </button>
    </div>
  );
}
