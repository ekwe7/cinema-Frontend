import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faShield, faBuilding, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal";

export default function ManageAdmins({ admins, setAdmins, theaters }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", theaterId: theaters[0]?.id ?? "" });
  const [error, setError] = useState("");
  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const handleAdd = () => {
    setError("");
    if (!form.name || !form.email || !form.password || !form.theaterId) { setError("All fields are required."); return; }
    if (admins.find(a => a.email === form.email)) { setError("Email already in use."); return; }
    setAdmins([...admins, { id: `a${Date.now()}`, ...form, role: "admin", createdAt: new Date().toISOString().split("T")[0] }]);
    setForm({ name: "", email: "", password: "", theaterId: theaters[0]?.id ?? "" });
    setOpen(false);
  };

  return (
    <div className="page">
      <div className="page-title">Manage Admins</div>
      <div className="page-sub">Create theater admins and assign them to locations</div>

      <div className="section-header mb-4">
        <div />
        <button className="btn btn-gold" onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faPlus} /> Create Admin
        </button>
      </div>

      <div className="three-col">
        {admins.map(admin => {
          const theater = theaters.find(t => t.id === admin.theaterId);
          return (
            <div className="admin-card" key={admin.id}>
              <div className="admin-card-header">
                <div className="admin-avatar"><FontAwesomeIcon icon={faShield} /></div>
                <div>
                  <div className="admin-name">{admin.name}</div>
                  <div className="admin-theater">
                    <FontAwesomeIcon icon={faBuilding} style={{ fontSize: 10 }} />
                    {theater?.name ?? "Unassigned"}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6 }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 11 }} />
                {admin.email}
              </div>
              <div className="admin-card-footer">
                <span className="text-xs text-secondary">Created {admin.createdAt}</span>
                <button className="btn btn-danger btn-sm" onClick={() => setAdmins(admins.filter(a => a.id !== admin.id))}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          );
        })}

        {admins.length === 0 && (
          <div className="empty-state" style={{ gridColumn: "1/-1" }}>
            <div className="empty-icon"><FontAwesomeIcon icon={faShield} /></div>
            <p>No admins created yet.</p>
          </div>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Theater Admin">
        <div className="form-group"><label className="form-label">Full Name</label>
          <input className="form-input" placeholder="Admin full name" value={form.name} onChange={set("name")} />
        </div>
        <div className="form-group"><label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="admin@cinebook.com" value={form.email} onChange={set("email")} />
        </div>
        <div className="form-group"><label className="form-label">Temporary Password</label>
          <input className="form-input" type="password" placeholder="Set a temporary password" value={form.password} onChange={set("password")} />
        </div>
        <div className="form-group"><label className="form-label">Assign Theater</label>
          <select className="form-input" value={form.theaterId} onChange={set("theaterId")}>
            {theaters.map(t => (
              <option key={t.id} value={t.id}>{t.name} — {t.city}</option>
            ))}
          </select>
        </div>
        {error && <div className="error-msg">{error}</div>}
        <div className="flex gap-2 mt-4">
          <button className="btn btn-gold btn-full" onClick={handleAdd}>Create Admin</button>
          <button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}