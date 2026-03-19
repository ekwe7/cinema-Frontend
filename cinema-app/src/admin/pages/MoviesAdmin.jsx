import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash, faMagnifyingGlass, faFilm } from "@fortawesome/free-solid-svg-icons";
import { MOVIES } from "../../data/mockData";
import Modal from "../../components/Modal";
import ImageUpload from "../../components/ImageUpload";
import DataTable from "../../components/DataTable";

const GENRES = ["Action","Crime","Drama","Horror","Sci-Fi","Thriller","Comedy","Animation"];
const blank = { title: "", description: "", duration: "", rating: "", genre: "Action", posterUrl: null };

export default function MoviesAdmin() {
  const [movies, setMovies] = useState(MOVIES);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [search, setSearch] = useState("");

  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const handleAdd = () => {
    if (!form.title || !form.duration) return;
    setMovies([...movies, { id: `m${Date.now()}`, ...form, rating: parseInt(form.rating) || 7 }]);
    setForm(blank); setOpen(false);
  };

  const filtered = movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      key: "poster", label: "Poster",
      render: r => (
        <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {r.posterUrl ? <img src={r.posterUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <FontAwesomeIcon icon={faFilm} style={{ color: "var(--text-muted)" }} />}
        </div>
      ),
    },
    { key: "title",    label: "Title",    render: r => <strong>{r.title}</strong> },
    { key: "genre",    label: "Genre",    render: r => <span className="badge badge-gold">{r.genre}</span> },
    { key: "duration", label: "Duration" },
    { key: "rating",   label: "Rating",   render: r => `⭐ ${r.rating}/10` },
  ];

  return (
    <div className="page">
      <div className="page-title">Movies</div>
      <div className="page-sub">Manage your movie catalogue</div>

      <div className="section-header mb-4">
        <div className="search-bar" style={{ width: 300 }}>
          <span className="search-icon-wrap"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
          <input className="form-input" placeholder="Search movies..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-gold" onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faPlus} /> Add Movie
        </button>
      </div>

      <div className="card">
        <DataTable
          columns={columns}
          rows={filtered}
          onAction={row => (
            <div className="flex gap-2">
              <button className="btn btn-ghost btn-sm"><FontAwesomeIcon icon={faPen} /></button>
              <button className="btn btn-danger btn-sm" onClick={() => setMovies(movies.filter(m => m.id !== row.id))}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add New Movie">
        <ImageUpload label="Movie Poster" value={form.posterUrl} onChange={v => setForm({ ...form, posterUrl: v })} height={180} />
        <div style={{ marginTop: 16 }}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" placeholder="Movie title" value={form.title} onChange={set("title")} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={3} placeholder="Short description…" value={form.description} onChange={set("description")} style={{ resize: "vertical" }} />
          </div>
          <div className="input-row">
            <div className="form-group">
              <label className="form-label">Duration</label>
              <input className="form-input" placeholder="e.g. 120 min" value={form.duration} onChange={set("duration")} />
            </div>
            <div className="form-group">
              <label className="form-label">Rating (1–10)</label>
              <input className="form-input" type="number" min={1} max={10} value={form.rating} onChange={set("rating")} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Genre</label>
            <select className="form-input" value={form.genre} onChange={set("genre")}>
              {GENRES.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="btn btn-gold btn-full" onClick={handleAdd}>Add Movie</button>
          <button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
