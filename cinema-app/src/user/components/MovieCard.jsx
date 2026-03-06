import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faStar, faClock, faTicket } from "@fortawesome/free-solid-svg-icons";

export default function MovieCard({ movie, onBook }) {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.posterUrl
          ? <img src={movie.posterUrl} alt={movie.title} />
          : <FontAwesomeIcon icon={faFilm} className="movie-poster-placeholder" />
        }
        <div className="movie-poster-overlay" />
        <span className="movie-genre-tag">{movie.genre}</span>
      </div>
      <div className="movie-info">
        <div className="movie-title">{movie.title}</div>
        <div className="movie-meta">
          <span className="movie-rating">
            <FontAwesomeIcon icon={faStar} /> {movie.rating}
          </span>
          <span className="text-sm text-secondary" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <FontAwesomeIcon icon={faClock} style={{ fontSize: 11 }} /> {movie.duration}
          </span>
        </div>
        <div className="movie-desc">{movie.description}</div>
        <button className="btn btn-gold btn-full" onClick={() => onBook(movie)}>
          <FontAwesomeIcon icon={faTicket} /> Book Now
        </button>
      </div>
    </div>
  );
}
