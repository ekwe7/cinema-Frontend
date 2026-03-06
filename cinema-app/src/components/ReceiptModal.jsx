import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faEnvelope, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

export default function ReceiptModal({ open, onClose, bookingId, userEmail }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    

    // fetch when ready from backend
    // await fetch("/api/receipts/send", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    //   body: JSON.stringify({ bookingId, email: userEmail }),
    // });
    


    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  const handleClose = () => {
    setSent(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="" maxWidth={420}>
      <div className="receipt-modal">
        {!sent ? (
          <>
            <div className="receipt-icon">
              <FontAwesomeIcon icon={faReceipt} />
            </div>
            <div className="receipt-title">Get Your Receipt</div>
            <div className="receipt-sub">
              Would you like us to send you booking receipt
              <strong style={{ color: "var(--gold)", display: "block", marginTop: 4 }}>{bookingId}</strong>
              to your email address?
            </div>
            <div style={{ background: "var(--surface2)", border: "1px solid var(--border2)", borderRadius: 10, padding: "10px 14px", marginBottom: 24, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ color: "var(--text-muted)" }} />
              <span style={{ color: "var(--text-secondary)" }}>{userEmail || "your@email.com"}</span>
            </div>
            <div className="receipt-actions">
              <button
                className="btn btn-gold btn-full btn-lg"
                onClick={handleSend}
                disabled={loading}
              >
                {loading
                  ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Sending...</>
                  : <><FontAwesomeIcon icon={faEnvelope} /> Yes, send me a receipt</>
                }
              </button>
              <button className="btn btn-ghost btn-full" onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} /> No thanks
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="receipt-icon" style={{ background: "var(--success-light)", color: "var(--success)", borderColor: "rgba(34,197,94,0.3)" }}>
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className="receipt-title">Receipt Sent!</div>
            <div className="receipt-sub">
              Your receipt has been sent to<br />
              <strong style={{ color: "var(--text)" }}>{userEmail || "your@email.com"}</strong>
              <br />Check your inbox (and spam folder).
            </div>
            <button className="btn btn-secondary btn-full" onClick={handleClose}>
              Done
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
