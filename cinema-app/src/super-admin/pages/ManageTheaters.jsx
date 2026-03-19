import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPen, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { THEATERS, SHOWS } from "../../data/mockData";
import Modal from "../../components/Modal";
import DataTable from "../../components/DataTable";

export default function ManageTheaters() {
  const [theaters, setTheaters] = useState(THEATERS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", city: "", status: "Active", rows: 8, seatsPerRow: 10 });
  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const handleAdd = () => {
    if (!form.name || !form.city) return;
    setTheaters([...theaters, { id: `t${Date.now()}`, ...form, rows: parseInt(form.rows), seatsPerRow: parseInt(form.seatsPerRow) }]);
    setForm({ name: "", city: "", status: "Active", rows: 8, seatsPerRow: 10 });
    setOpen(false);
  };

  const cols = [
    { key: "icon",  label: "",        render: () => <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--gold-light)", border: "1px solid var(--gold-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)" }}><FontAwesomeIcon icon={faBuilding} /></div> },
    { key: "name",  label: "Theater", render: r => <strong>{r.name}</strong> },
    { key: "city",  label: "City" },
    { key: "seats", label: "Capacity", render: r => `${r.rows * r.seatsPerRow} seats` },
    { key: "shows", label: "Shows",   render: r => `${SHOWS.filter(s => s.theaterId === r.id).length}` },
    { key: "status",label: "Status",  render: r => <span className={`badge ${r.status === "Active" ? "badge-green" : "badge-yellow"}`}>{r.status}</span> },
  ];

  return (
    <div className="page">
      <div className="page-title">Theaters</div>
      <div className="page-sub">Create and manage all cinema locations</div>
      <div className="card">
        <div className="section-header">
          <div className="section-title">All Theaters ({theaters.length})</div>
          <button className="btn btn-gold" onClick={() => setOpen(true)}><FontAwesomeIcon icon={faPlus} /> Add Theater</button>
        </div>
        <DataTable columns={cols} rows={theaters} onAction={row => (
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-sm"><FontAwesomeIcon icon={faPen} /></button>
            <button className="btn btn-danger btn-sm" onClick={() => setTheaters(theaters.filter(t => t.id !== row.id))}><FontAwesomeIcon icon={faTrash} /></button>
          </div>
        )} />
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Add New Theater">
        <div className="form-group"><label className="form-label">Theater Name</label><input className="form-input" placeholder="e.g. CinePlex Central" value={form.name} onChange={set("name")} /></div>
        <div className="form-group"><label className="form-label">City</label><input className="form-input" placeholder="e.g. Chicago" value={form.city} onChange={set("city")} /></div>
        <div className="input-row">
          <div className="form-group"><label className="form-label">Rows</label><input className="form-input" type="number" min={1} max={26} value={form.rows} onChange={set("rows")} /></div>
          <div className="form-group"><label className="form-label">Seats per Row</label><input className="form-input" type="number" min={1} max={30} value={form.seatsPerRow} onChange={set("seatsPerRow")} /></div>
        </div>
        <div className="form-group"><label className="form-label">Status</label>
          <select className="form-input" value={form.status} onChange={set("status")}><option>Active</option><option>Maintenance</option></select>
        </div>
        <div className="flex gap-2 mt-4"><button className="btn btn-gold btn-full" onClick={handleAdd}>Add Theater</button><button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button></div>
      </Modal>
    </div>
  );
}
