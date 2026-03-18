// ShowsAdmin.jsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/AuthContext";
import { SHOWS, MOVIES, THEATERS } from "../../data/mockData";
import Modal from "../../components/Modal";
import DataTable from "../../components/DataTable";

const blank = { movieId: "m1", startTime: "", date: "", price: "" };

export function ShowsAdmin() {
  const { user } = useAuth();
  const [shows, setShows] = useState(SHOWS.filter(s => s.theaterId === user?.theaterId));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const handleAdd = () => {
    if (!form.startTime || !form.date || !form.price) return;
    setShows([...shows, { id: `s${Date.now()}`, theaterId: user?.theaterId, ...form, price: parseFloat(form.price) }]);
    setForm(blank); setOpen(false);
  };

  const cols = [
    { key: "movie",  label: "Movie",   render: r => <strong>{MOVIES.find(m => m.id === r.movieId)?.title}</strong> },
    { key: "date",   label: "Date" },
    { key: "time",   label: "Time",    render: r => <span className="badge badge-blue">{r.startTime}</span> },
    { key: "price",  label: "Price",   render: r => <strong className="text-gold">${r.price}</strong> },
  ];

  return (
    <div className="page">
      <div className="page-title">Shows</div>
      <div className="page-sub">Schedule shows for your theater</div>
      <div className="card">
        <div className="section-header">
          <div className="section-title">Scheduled Shows ({shows.length})</div>
          <button className="btn btn-gold" onClick={() => setOpen(true)}><FontAwesomeIcon icon={faPlus} /> Add Show</button>
        </div>
        <DataTable columns={cols} rows={shows} onAction={row => (
          <button className="btn btn-danger btn-sm" onClick={() => setShows(shows.filter(s => s.id !== row.id))}><FontAwesomeIcon icon={faTrash} /></button>
        )} />
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Add Show">
        <div className="form-group"><label className="form-label">Movie</label>
          <select className="form-input" value={form.movieId} onChange={set("movieId")}>
            {MOVIES.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
          </select>
        </div>
        <div className="input-row">
          <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" value={form.date} onChange={set("date")} /></div>
          <div className="form-group"><label className="form-label">Start Time</label><input className="form-input" placeholder="7:00 PM" value={form.startTime} onChange={set("startTime")} /></div>
        </div>
        <div className="form-group"><label className="form-label">Price ($)</label><input className="form-input" type="number" step="0.5" placeholder="15.00" value={form.price} onChange={set("price")} /></div>
        <div className="flex gap-2 mt-4"><button className="btn btn-gold btn-full" onClick={handleAdd}>Add Show</button><button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button></div>
      </Modal>
    </div>
  );
}

export default ShowsAdmin;
