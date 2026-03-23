import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faBuilding, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal";

const blank = { name: "", city: "", status: "Active", rows: 8, seatsPerRow: 10 };

export default function ManageTheaters({ theaters, setTheaters }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");
  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const handleAdd = () => {
    setError("");
    if (!form.name || !form.city) { setError("Name and city are required."); return; }
    setTheaters([...theaters, { id: `t${Date.now()}`, ...form, rows: parseInt(form.rows), seatsPerRow: parseInt(form.seatsPerRow) }]);
    setForm(blank);
    setOpen(false);
  };

  return (
    <div className="page">
      <div className="page-title">Theaters</div>
      <div className="page-sub">Manage all cinema locations</div>

      <div className="section-header mb-4">
        <div />
        <button className="btn btn-gold" onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faPlus} /> Add Theater
        </button>
      </div>

      <div className="three-col">
        {theaters.map(t => (
          <div className="admin-card" key={t.id}>
            <div className="admin-card-header">
              <div className="admin-avatar"><FontAwesomeIcon icon={faBuilding} /></div>
              <div>
                <div className="admin-name">{t.name}</div>
                <div className="admin-theater">
                  <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 10 }} /> {t.city}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <span className={`badge ${t.status === "Active" ? "badge-green" : "badge-yellow"}`}>{t.status}</span>
              <span className="badge badge-blue">{t.rows} rows × {t.seatsPerRow} seats</span>
            </div>
            <div className="admin-card-footer">
              <span className="text-xs text-secondary">ID: {t.id}</span>
              <button className="btn btn-danger btn-sm" onClick={() => setTheaters(theaters.filter(x => x.id !== t.id))}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}

        {theaters.length === 0 && (
          <div className="empty-state" style={{ gridColumn: "1/-1" }}>
            <div className="empty-icon"><FontAwesomeIcon icon={faBuilding} /></div>
            <p>No theaters added yet.</p>
          </div>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Theater">
        <div className="form-group"><label className="form-label">Theater Name</label>
          <input className="form-input" placeholder="e.g. Abuja Grand Cinema" value={form.name} onChange={set("name")} />
        </div>
        <div className="form-group"><label className="form-label">City</label>
          <input className="form-input" placeholder="e.g. Abuja, FCT" value={form.city} onChange={set("city")} />
        </div>
        <div className="input-row">
          <div className="form-group"><label className="form-label">Rows</label>
            <input className="form-input" type="number" min={1} max={26} value={form.rows} onChange={set("rows")} />
          </div>
          <div className="form-group"><label className="form-label">Seats per Row</label>
            <input className="form-input" type="number" min={1} max={20} value={form.seatsPerRow} onChange={set("seatsPerRow")} />
          </div>
        </div>
        <div className="form-group"><label className="form-label">Status</label>
          <select className="form-input" value={form.status} onChange={set("status")}>
            <option>Active</option>
            <option>Maintenance</option>
            <option>Inactive</option>
          </select>
        </div>
        {error && <div className="error-msg">{error}</div>}
        <div className="flex gap-2 mt-4">
          <button className="btn btn-gold btn-full" onClick={handleAdd}>Add Theater</button>
          <button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
