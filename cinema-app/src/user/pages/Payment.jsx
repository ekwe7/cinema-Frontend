import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal, faApple } from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faLock, faArrowLeft, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
// import { useAuth } from "../../auth/AuthContext";

export default function Payment({ bookingContext, setBookingContext }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const [form, setForm] = useState({ name: "", number: "", expiry: "", cvv: "", email: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { movie, show, seats, total } = bookingContext;

  if (!movie || !show || seats.length === 0) { navigate("../book"); return null; }

  const grandTotal = (parseFloat(total) + 1.5).toFixed(2);
  const set = f => e => { setForm({ ...form, [f]: e.target.value }); setErrors({ ...errors, [f]: "" }); };
  const formatCard = v => v.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);

  const validate = () => {
    const e = {};
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Enter a valid email address";
    if (method === "card") {
      if (!form.name.trim()) e.name = "Name is required";
      if (form.number.replace(/\s/g, "").length < 16) e.number = "Enter a valid 16-digit card number";
      if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = "Use MM/YY format";
      if (form.cvv.length < 3) e.cvv = "Enter a valid CVV";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    setLoading(true);
    setBookingContext(prev => ({ ...prev, guestEmail: form.email }));
    setTimeout(() => { navigate("../success"); }, 1800);
  };

  const methods = [
    { id: "card",   icon: faCreditCard, label: "Card" },
    { id: "paypal", icon: faPaypal,     label: "PayPal" },
    { id: "apple",  icon: faApple,      label: "Apple Pay" },
  ];

  return (
    <div className="page">
      <button className="btn btn-ghost btn-sm mb-4" onClick={() => navigate("../book")}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Seats
      </button>
      <div className="page-title">Payment</div>
      <div className="page-sub">Complete your booking securely</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        <div className="card">
          <div className="section-title mb-4">Payment Method</div>
          <div className="form-group">
            <label className="form-label">Email address — receipt will be sent here</label>
            <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} />
            {errors.email && <div className="text-danger text-sm mt-2">{errors.email}</div>}
          </div>
          <div className="payment-methods">
            {methods.map(m => (
              <div key={m.id} className={`pay-method${method === m.id ? " active" : ""}`} onClick={() => setMethod(m.id)}>
                <div className="pay-icon"><FontAwesomeIcon icon={m.icon} /></div>
                <div className="pay-label">{m.label}</div>
              </div>
            ))}
          </div>

          {method === "card" && (
            <>
              <div className="card-visual">
                <FontAwesomeIcon icon={faCreditCard} style={{ fontSize: 20, opacity: 0.7 }} />
                <div className="card-number-display">{form.number || "•••• •••• •••• ••••"}</div>
                <div className="card-meta-row">
                  <div><div className="card-meta-label">Cardholder</div><div className="card-meta-value">{form.name || "YOUR NAME"}</div></div>
                  <div><div className="card-meta-label">Expires</div><div className="card-meta-value">{form.expiry || "MM/YY"}</div></div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Cardholder Name</label>
                <input className="form-input" placeholder="Full name on card" value={form.name} onChange={set("name")} />
                {errors.name && <div className="text-danger text-sm mt-2">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input className="form-input" placeholder="1234 5678 9012 3456" value={form.number} onChange={e => { setForm({ ...form, number: formatCard(e.target.value) }); setErrors({ ...errors, number: "" }); }} maxLength={19} />
                {errors.number && <div className="text-danger text-sm mt-2">{errors.number}</div>}
              </div>
              <div className="input-row">
                {/* <div className="form-group">
                  <label className="form-label">Expiry</label>
                  <input className="form-input" placeholder="MM/YY" value={form.expiry} onChange={set("expiry")} maxLength={5} />
                  {errors.expiry && <div className="text-danger text-sm mt-2">{errors.expiry}</div>}
                </div> */}

                  <div className="form-group">
                    <label className="form-label">Expiry</label>
                    <input
                      className="form-input"
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ""); // remove non-digits
                        if (value.length >= 3) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4); // auto insert /
                        }
                        set("expiry")({ target: { value } });
                      }}
                      maxLength={5}
                    />
                    {errors.expiry && <div className="text-danger text-sm mt-2">{errors.expiry}</div>}
                  </div>

                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input className="form-input" type="password" placeholder="•••" value={form.cvv} onChange={set("cvv")} maxLength={3} />
                  {errors.cvv && <div className="text-danger text-sm mt-2">{errors.cvv}</div>}
                </div>
              </div>
            </>
          )}
          {method !== "card" && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <FontAwesomeIcon icon={method === "paypal" ? faPaypal : faApple} style={{ fontSize: 52, color: "var(--text-muted)", marginBottom: 16 }} />
              <div className="font-bold mb-3">Redirecting to {method === "paypal" ? "PayPal" : "Apple Pay"}</div>
              <p className="text-secondary text-sm">You'll complete payment securely on their platform.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="booking-summary">
          <div className="summary-title">Order Summary</div>
          {[
            ["Movie",    movie.title],
            ["Show",     show.startTime],
            ["Date",     show.date],
            ["Seats",    seats.join(", ")],
            ["Subtotal", `$${total}`],
            ["Booking fee", "$1.50"],
          ].map(([k, v]) => (
            <div className="summary-row" key={k}><span>{k}</span><span className="summary-val">{v}</span></div>
          ))}
          <div className="summary-total"><span>Total</span><span className="text-gold">${grandTotal}</span></div>
          <button className="btn btn-gold btn-full btn-lg" style={{ marginTop: 20 }} onClick={handlePay} disabled={loading}>
            {loading
              ? <><FontAwesomeIcon icon={faCircleCheck} style={{ animation: "spin 1s linear infinite" }} /> Processing...</>
              : <><FontAwesomeIcon icon={faLock} /> Pay ${grandTotal}</>
            }
          </button>
          <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <FontAwesomeIcon icon={faLock} /> 
            256-bit SSL secured
          </div>
        </div>
      </div>
    </div>
  );
}
