
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm, faChair, faCreditCard, faTicket,
  faArrowRight, faPlay, faStar, faChevronRight
} from "@fortawesome/free-solid-svg-icons";


const HERO_IMAGE   = "";
const MOVIE_IMAGES = [
    {
    id: 1,
    image: "",
    genre: "Sci-Fi",
    title: "Movie Title",
    duration: "165 min",
    rating: "9.0",
  },
  {
    id: 2,
    image: "",
    genre: "Thriller",
    title: "Movie Title",
    duration: "128 min",
    rating: "8.2",
  },
  {
    id: 3,
    image: "",
    genre: "Action",
    title: "Movie Title",
    duration: "142 min",
    rating: "8.5",
  },
  {
    id: 4,
    image: "",
    genre: "Drama",
    title: "Movie Title",
    duration: "156 min",
    rating: "9.1",
  },
  
  
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <style>{css}</style>
      <div className="lp">

        {/* ── Navbar ── */}
        <nav className="lp-nav">
          <Link to="/" className="lp-logo">
            <div className="lp-logo-icon">
              <FontAwesomeIcon icon={faFilm} />
            </div>
            <span className="lp-logo-text">CineBook</span>
          </Link>

          <div className="lp-nav-links">
            <a href="#movies" className="lp-nav-link">Movies</a>
            <a href="#how"    className="lp-nav-link">How it works</a>
          </div>

          <div className="lp-nav-right">
            <Link to="/login" className="lp-nav-signin">Sign In</Link>
            <Link to="/login" className="lp-nav-cta">
              Get Started <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 12 }} />
            </Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="lp-hero">
          <img src={HERO_IMAGE} alt="" className="lp-hero-img" />
          <div className="lp-hero-overlay" />

          <div className="lp-hero-content">
            <div className="lp-pill">
              <span className="lp-pill-dot" />
              <FontAwesomeIcon icon={faTicket} style={{ fontSize: 12 }} />
              Now Showing — Book Instantly
            </div>

            <h1 className="lp-hero-title">
              Your Cinema.<br />
              <em>Your Seats.</em>
            </h1>

            <p className="lp-hero-sub">
              Browse the latest blockbusters, pick your perfect seats in real-time,
              and check out in seconds. Cinema booking, reimagined.
            </p>

            <div className="lp-hero-btns">
              <button className="lp-btn-primary" onClick={() => navigate("/login")}>
                <FontAwesomeIcon icon={faPlay} />
                Browse Movies
              </button>
              <button className="lp-btn-ghost" onClick={() => navigate("/login")}>
                My Bookings
                <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 12 }} />
              </button>
            </div>

            <div className="lp-stats">
              {[
                { num: "50+",  label: "Movies" },
                { num: "12",   label: "Theaters" },
                { num: "10k+", label: "Happy Guests" },
              ].map((s, i) => (
                <>
                  {i > 0 && <div className="lp-stat-div" key={`div-${i}`} />}
                  <div className="lp-stat" key={s.label}>
                    <span className="lp-stat-num">{s.num}</span>
                    <span className="lp-stat-label">{s.label}</span>
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="lp-scroll-hint">
            <div className="lp-scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        {/* ── Featured Movies ── */}
        <section className="lp-section" id="movies">
          <div className="lp-section-head">
            <div>
              <div className="lp-label">On Screen Now</div>
              <h2 className="lp-section-title">Featured Films</h2>
            </div>
            <Link to="/login" className="lp-see-all">
              View all films <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 12 }} />
            </Link>
          </div>

          <div className="lp-movies">
            {MOVIE_IMAGES.map((m, i) => (
              <div key={i} className="lp-movie-card" style={{ animationDelay: `${i * 0.1}s` }} onClick={() => navigate("/login")}>
                <div className="lp-movie-img-wrap">
                  {/* Replace src with your own image variable e.g. src={movie1} */}
                  <img src={m.src} alt={m.title} className="lp-movie-img" />
                  <div className="lp-movie-grad" />
                  <span className="lp-movie-genre">{m.genre}</span>
                  <div className="lp-movie-book-btn">
                    <FontAwesomeIcon icon={faTicket} /> Book Now
                  </div>
                </div>
                <div className="lp-movie-info">
                  <div className="lp-movie-title">{m.title}</div>
                  <div className="lp-movie-meta">
                    <span>{m.duration}</span>
                    <span className="lp-dot">·</span>
                    <span className="lp-rating">
                      <FontAwesomeIcon icon={faStar} style={{ fontSize: 11 }} /> {m.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="lp-how" id="how">
          <div className="lp-how-inner">
            <div className="lp-label" style={{ textAlign: "center" }}>Simple Process</div>
            <h2 className="lp-section-title" style={{ textAlign: "center", marginBottom: 56 }}>
              Three steps to your seat
            </h2>

            <div className="lp-steps">
              {[
                { num: "01", icon: faFilm,       title: "Browse & Choose",  desc: "Explore what's showing at theaters near you. Filter by genre, rating, or showtime to find your perfect film." },
                { num: "02", icon: faChair,       title: "Pick Your Seat",   desc: "See the live seat map and choose exactly where you want to sit — aisle, centre, front row. Your choice." },
                { num: "03", icon: faCreditCard,  title: "Pay & Enjoy",      desc: "Secure checkout in seconds. Your e-ticket arrives instantly. Just show up, sit back, and enjoy the show." },
              ].map((s, i) => (
                <div key={s.num} className="lp-step" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="lp-step-num">{s.num}</div>
                  <div className="lp-step-icon-wrap">
                    <FontAwesomeIcon icon={s.icon} />
                  </div>
                  <div className="lp-step-title">{s.title}</div>
                  <div className="lp-step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="lp-cta">
          <img src={HERO_IMAGE} alt="" className="lp-cta-img" />
          <div className="lp-cta-overlay" />
          <div className="lp-cta-content">
            <div className="lp-label" style={{ color: "rgba(232,201,122,0.6)", textAlign: "center" }}>Start Today</div>
            <h2 className="lp-cta-title">Ready for your next movie night?</h2>
            <p className="lp-cta-sub">Join thousands of cinema lovers who book smarter with CineBook.</p>
            <button className="lp-btn-primary" onClick={() => navigate("/login")}>
              <FontAwesomeIcon icon={faTicket} />
              Create Free Account
            </button>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="lp-footer">
          <div className="lp-footer-top">
            <Link to="/" className="lp-logo">
              <div className="lp-logo-icon"><FontAwesomeIcon icon={faFilm} /></div>
              <span className="lp-logo-text">CineBook</span>
            </Link>
            <p className="lp-footer-tag">The modern way to book cinema tickets.</p>
          </div>
          <div className="lp-footer-line" />
          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">© 2026 CineBook. All rights reserved.</span>
            <div className="lp-footer-links">
              {["About","Privacy","Terms","Contact"].map(l => <span key={l}>{l}</span>)}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
  .lp { font-family:'DM Sans',sans-serif; background:#080b10; color:#f0ede8; min-height:100vh; overflow-x:hidden; }

  /* Navbar */
  .lp-nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:18px 60px; background:rgba(8,11,16,0.8); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.05); }
  .lp-logo { display:flex; align-items:center; gap:10px; text-decoration:none; transition:opacity 0.2s; }
  .lp-logo:hover { opacity:0.8; }
  .lp-logo-icon { width:36px; height:36px; background:rgba(232,201,122,0.12); border:1px solid rgba(232,201,122,0.25); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#e8c97a; font-size:15px; }
  .lp-logo-text { font-family:'Syne',sans-serif; font-size:19px; font-weight:800; color:#f0ede8; letter-spacing:-0.3px; }
  .lp-nav-links { display:flex; gap:32px; }
  .lp-nav-link { font-size:14px; font-weight:500; color:rgba(240,237,232,0.55); text-decoration:none; transition:color 0.2s; }
  .lp-nav-link:hover { color:#f0ede8; }
  .lp-nav-right { display:flex; align-items:center; gap:16px; }
  .lp-nav-signin { font-size:14px; font-weight:500; color:rgba(240,237,232,0.6); text-decoration:none; transition:color 0.2s; }
  .lp-nav-signin:hover { color:#f0ede8; }
  .lp-nav-cta { display:inline-flex; align-items:center; gap:8px; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; color:#080b10; background:#e8c97a; padding:9px 20px; border-radius:100px; text-decoration:none; transition:all 0.2s; }
  .lp-nav-cta:hover { background:#f0d98a; transform:translateY(-1px); box-shadow:0 4px 16px rgba(232,201,122,0.3); }

  /* Hero */
  .lp-hero { position:relative; min-height:100vh; display:flex; align-items:center; padding:120px 60px 80px; overflow:hidden; }
  .lp-hero-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.3; filter:saturate(0.5); }
  .lp-hero-overlay { position:absolute; inset:0; background:linear-gradient(135deg,rgba(8,11,16,0.97) 0%,rgba(8,11,16,0.75) 50%,rgba(8,11,16,0.5) 100%); }
  .lp-hero-content { position:relative; z-index:1; max-width:660px; animation:fadeUp 0.8s ease both; }
  .lp-pill { display:inline-flex; align-items:center; gap:8px; background:rgba(232,201,122,0.08); border:1px solid rgba(232,201,122,0.25); color:#e8c97a; padding:7px 16px; border-radius:100px; font-size:13px; font-weight:500; margin-bottom:28px; }
  .lp-pill-dot { width:6px; height:6px; border-radius:50%; background:#e8c97a; animation:pulse 2s infinite; }
  .lp-hero-title { font-family:'Syne',sans-serif; font-size:clamp(44px,7vw,78px); font-weight:800; line-height:1.05; letter-spacing:-2px; margin-bottom:22px; color:#f0ede8; }
  .lp-hero-title em { font-style:italic; font-family:'DM Sans',sans-serif; font-weight:300; color:#e8c97a; }
  .lp-hero-sub { font-size:16px; color:rgba(240,237,232,0.55); line-height:1.75; margin-bottom:36px; max-width:480px; font-weight:300; }
  .lp-hero-btns { display:flex; gap:12px; margin-bottom:48px; flex-wrap:wrap; }
  .lp-btn-primary { display:inline-flex; align-items:center; gap:10px; background:#e8c97a; color:#080b10; border:none; border-radius:100px; padding:13px 26px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700; cursor:pointer; transition:all 0.2s; }
  .lp-btn-primary:hover { background:#f0d98a; transform:translateY(-2px); box-shadow:0 8px 24px rgba(232,201,122,0.35); }
  .lp-btn-ghost { display:inline-flex; align-items:center; gap:10px; background:transparent; color:rgba(240,237,232,0.7); border:1px solid rgba(240,237,232,0.15); border-radius:100px; padding:13px 26px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500; cursor:pointer; transition:all 0.2s; }
  .lp-btn-ghost:hover { border-color:rgba(240,237,232,0.35); color:#f0ede8; }
  .lp-stats { display:flex; align-items:center; gap:24px; }
  .lp-stat { display:flex; flex-direction:column; gap:2px; }
  .lp-stat-num { font-family:'Syne',sans-serif; font-size:22px; font-weight:700; color:#f0ede8; letter-spacing:-0.5px; }
  .lp-stat-label { font-size:11px; color:rgba(240,237,232,0.35); text-transform:uppercase; letter-spacing:2px; }
  .lp-stat-div { width:1px; height:36px; background:rgba(240,237,232,0.1); }
  .lp-scroll-hint { position:absolute; bottom:40px; left:60px; z-index:1; display:flex; align-items:center; gap:12px; color:rgba(240,237,232,0.25); font-size:10px; text-transform:uppercase; letter-spacing:2px; }
  .lp-scroll-line { width:40px; height:1px; background:rgba(240,237,232,0.15); }

  /* Sections */
  .lp-section { padding:100px 60px; max-width:1280px; margin:0 auto; }
  .lp-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:3px; color:#e8c97a; margin-bottom:10px; }
  .lp-section-title { font-family:'Syne',sans-serif; font-size:clamp(26px,4vw,38px); font-weight:800; letter-spacing:-1px; color:#f0ede8; line-height:1.1; }
  .lp-section-head { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:44px; }
  .lp-see-all { display:inline-flex; align-items:center; gap:8px; font-size:13px; font-weight:500; color:rgba(240,237,232,0.4); text-decoration:none; border-bottom:1px solid rgba(240,237,232,0.1); padding-bottom:2px; transition:all 0.2s; }
  .lp-see-all:hover { color:#e8c97a; border-color:#e8c97a; }

  /* Movies */
  .lp-movies { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .lp-movie-card { cursor:pointer; border-radius:16px; overflow:hidden; background:#0f1318; border:1px solid rgba(255,255,255,0.06); transition:all 0.25s; animation:fadeUp 0.6s ease both; }
  .lp-movie-card:hover { transform:translateY(-6px); box-shadow:0 20px 40px rgba(0,0,0,0.5); border-color:rgba(232,201,122,0.2); }
  .lp-movie-img-wrap { position:relative; height:260px; overflow:hidden; }
  .lp-movie-img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s; }
  .lp-movie-card:hover .lp-movie-img { transform:scale(1.05); }
  .lp-movie-grad { position:absolute; inset:0; background:linear-gradient(to top,rgba(8,11,16,0.9) 0%,transparent 60%); }
  .lp-movie-genre { position:absolute; top:14px; left:14px; background:rgba(232,201,122,0.12); border:1px solid rgba(232,201,122,0.3); color:#e8c97a; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:4px 10px; border-radius:100px; }
  .lp-movie-book-btn { position:absolute; bottom:16px; right:16px; background:#e8c97a; color:#080b10; font-size:12px; font-weight:700; padding:8px 16px; border-radius:100px; display:flex; align-items:center; gap:6px; opacity:0; transform:translateY(8px); transition:all 0.25s; }
  .lp-movie-card:hover .lp-movie-book-btn { opacity:1; transform:translateY(0); }
  .lp-movie-info { padding:16px 18px 18px; }
  .lp-movie-title { font-family:'Syne',sans-serif; font-size:16px; font-weight:700; color:#f0ede8; margin-bottom:6px; letter-spacing:-0.2px; }
  .lp-movie-meta { display:flex; align-items:center; gap:8px; font-size:13px; color:rgba(240,237,232,0.4); }
  .lp-dot { opacity:0.3; }
  .lp-rating { color:#e8c97a; font-weight:600; display:flex; align-items:center; gap:4px; }

  /* How it works */
  .lp-how { background:#0a0d12; border-top:1px solid rgba(255,255,255,0.04); border-bottom:1px solid rgba(255,255,255,0.04); padding:100px 60px; }
  .lp-how-inner { max-width:1280px; margin:0 auto; }
  .lp-steps { display:grid; grid-template-columns:repeat(3,1fr); gap:0; }
  .lp-step { padding:32px 40px 32px 0; animation:fadeUp 0.6s ease both; }
  .lp-step:not(:last-child) { border-right:1px solid rgba(255,255,255,0.05); margin-right:40px; }
  .lp-step-num { font-family:'Syne',sans-serif; font-size:10px; font-weight:700; color:rgba(232,201,122,0.35); letter-spacing:3px; margin-bottom:18px; }
  .lp-step-icon-wrap { width:48px; height:48px; border-radius:14px; background:rgba(232,201,122,0.08); border:1px solid rgba(232,201,122,0.15); display:flex; align-items:center; justify-content:center; color:#e8c97a; font-size:18px; margin-bottom:16px; }
  .lp-step-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:700; color:#f0ede8; margin-bottom:10px; letter-spacing:-0.3px; }
  .lp-step-desc { font-size:14px; color:rgba(240,237,232,0.45); line-height:1.75; font-weight:300; max-width:280px; }

  /* CTA */
  .lp-cta { position:relative; padding:120px 60px; text-align:center; overflow:hidden; }
  .lp-cta-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.15; filter:saturate(0.3); }
  .lp-cta-overlay { position:absolute; inset:0; background:linear-gradient(135deg,rgba(8,11,16,0.95),rgba(8,11,16,0.85)); }
  .lp-cta-content { position:relative; z-index:1; max-width:560px; margin:0 auto; }
  .lp-cta-title { font-family:'Syne',sans-serif; font-size:clamp(28px,5vw,48px); font-weight:800; color:#f0ede8; letter-spacing:-1.5px; line-height:1.05; margin-bottom:14px; }
  .lp-cta-sub { font-size:15px; color:rgba(240,237,232,0.5); margin-bottom:32px; font-weight:300; line-height:1.6; }

  /* Footer */
  .lp-footer { background:#050709; padding:44px 60px 28px; border-top:1px solid rgba(255,255,255,0.05); }
  .lp-footer-top { display:flex; align-items:center; gap:24px; margin-bottom:28px; }
  .lp-footer-tag { font-size:13px; color:rgba(240,237,232,0.25); font-weight:300; }
  .lp-footer-line { height:1px; background:rgba(255,255,255,0.05); margin-bottom:20px; }
  .lp-footer-bottom { display:flex; align-items:center; justify-content:space-between; }
  .lp-footer-copy { font-size:12px; color:rgba(240,237,232,0.2); }
  .lp-footer-links { display:flex; gap:24px; }
  .lp-footer-links span { font-size:13px; color:rgba(240,237,232,0.3); cursor:pointer; transition:color 0.2s; }
  .lp-footer-links span:hover { color:rgba(240,237,232,0.7); }

  /* Animations */
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }

  /* Responsive */
  @media(max-width:900px){
    .lp-nav{padding:16px 20px}
    .lp-nav-links{display:none}
    .lp-hero{padding:100px 20px 60px}
    .lp-section{padding:60px 20px}
    .lp-how{padding:60px 20px}
    .lp-cta{padding:80px 20px}
    .lp-footer{padding:36px 20px 20px}
    .lp-movies{grid-template-columns:1fr}
    .lp-steps{grid-template-columns:1fr}
    .lp-step:not(:last-child){border-right:none;border-bottom:1px solid rgba(255,255,255,0.05);margin-right:0;padding-right:0;margin-bottom:32px;padding-bottom:32px}
    .lp-footer-bottom{flex-direction:column;gap:16px;text-align:center}
    .lp-scroll-hint{display:none}
  }
`;
