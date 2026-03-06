import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { MOVIES } from "../../data/mockData";
import MovieCard from "../components/MovieCard";

export default function BrowseMovies({ setBookingContext }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  const genres = ["All", ...new Set(MOVIES.map(m => m.genre))];
  const filtered = MOVIES.filter(m =>
    (genre === "All" || m.genre === genre) &&
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = movie => {
    setBookingContext(prev => ({ ...prev, movie, show: null, seats: [], total: "0.00" }));
    navigate("/book");
  };

  return (
    <div className="page">
      <div className="page-title">Now Showing</div>
      <div className="page-sub">Browse movies and book your seats</div>

      <div className="flex gap-4 mb-6" style={{ flexWrap: "wrap" }}>
        <div className="search-bar" style={{ flex: 1, minWidth: 240 }}>
          <span className="search-icon-wrap"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
          <input className="form-input" placeholder="Search movies..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-input" style={{ width: 180 }} value={genre} onChange={e => setGenre(e.target.value)}>
          {genres.map(g => <option key={g}>{g}</option>)}
        </select>
      </div>

      <div className="movies-grid">
        {filtered.map(movie => <MovieCard key={movie.id} movie={movie} onBook={handleBook} />)}
        {filtered.length === 0 && (
          <div className="empty-state" style={{ gridColumn: "1/-1" }}>
            <div className="empty-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
            <p>No movies found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
