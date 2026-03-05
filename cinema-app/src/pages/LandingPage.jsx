import { Link, useNavigate } from "react-router-dom";


const HERO_BG = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&q=80";

const FEATURED_MOVIES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
    genre: "Sci-Fi",
    title: "Your Movie Title",
    duration: "165 min",
    rating: "9.0",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80",
    genre: "Thriller",
    title: "Your Movie Title",
    duration: "128 min",
    rating: "8.2",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80",
    genre: "Action",
    title: "Your Movie Title",
    duration: "142 min",
    rating: "8.5",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <style>{css}</style>
      <div className="lp-root">

        {/* ── Navbar ── */}
        <nav className="lp-nav">
          <Link to="/" className="lp-logo">
            <span className="lp-logo-icon">◈</span>
            <span className="lp-logo-text">KoloApp</span>
          </Link>
          <div className="lp-nav-links">
            <a href="#how" className="lp-nav-link">How it works</a>
            <a href="#movies" className="lp-nav-link">Movies</a>
          </div>
          <div className="lp-nav-actions">
            <Link to="/login" className="lp-nav-signin">Sign In</Link>
            <Link to="/login" className="lp-nav-cta">Get Started</Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="lp-hero">
          {/* Background image with overlay */}
          <div className="lp-hero-bg">
            <img src={HERO_BG} alt="" className="lp-hero-bg-img" />
            <div className="lp-hero-overlay" />
          </div>

          <div className="lp-hero-content">
            <div className="lp-hero-pill">
              <span className="lp-pill-dot" />
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
            <div className="lp-hero-actions">
              <button className="lp-btn-primary" onClick={() => navigate("/login")}>
                Browse Movies
                <span className="lp-btn-arrow">→</span>
              </button>
              <button className="lp-btn-ghost" onClick={() => navigate("/login")}>
                View My Bookings
              </button>
            </div>

            {/* Stats row */}
            <div className="lp-hero-stats">
              <div className="lp-stat">
                <span className="lp-stat-num">50+</span>
                <span className="lp-stat-label">Movies</span>
              </div>
              <div className="lp-stat-divider" />
              <div className="lp-stat">
                <span className="lp-stat-num">12</span>
                <span className="lp-stat-label">Theaters</span>
              </div>
              <div className="lp-stat-divider" />
              <div className="lp-stat">
                <span className="lp-stat-num">10k+</span>
                <span className="lp-stat-label">Happy Guests</span>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="lp-scroll-hint">
            <div className="lp-scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        {/* ── Now Showing ── */}
        <section className="lp-section" id="movies">
          <div className="lp-section-header">
            <div>
              <div className="lp-section-label">On Screen Now</div>
              <h2 className="lp-section-title">Featured Films</h2>
            </div>
            <Link to="/login" className="lp-see-all">
              View all films <span>→</span>
            </Link>
          </div>

          <div className="lp-movies-grid">
            {FEATURED_MOVIES.map((movie, index) => (
              <div
                key={movie.id}
                className="lp-movie-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate("/login")}
              >
                <div className="lp-movie-img-wrap">
                  <img src={movie.image} alt={movie.title} className="lp-movie-img" />
                  <div className="lp-movie-img-overlay" />
                  <span className="lp-movie-genre">{movie.genre}</span>
                  <div className="lp-movie-hover-btn">Book Now →</div>
                </div>
                <div className="lp-movie-info">
                  <div className="lp-movie-title">{movie.title}</div>
                  <div className="lp-movie-meta">
                    <span>{movie.duration}</span>
                    <span className="lp-movie-dot">·</span>
                    <span className="lp-movie-rating">★★ {movie.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="lp-how" id="how">
          <div className="lp-how-inner">
            <div className="lp-section-label" style={{ textAlign: "center" }}>Simple Process</div>
            <h2 className="lp-section-title" style={{ textAlign: "center", marginBottom: 56 }}>
              Three steps to your seat
            </h2>
            <div className="lp-steps">
              {[
                {
                  num: "01",
                  icon: "🎬",
                  title: "Browse & Choose",
                  desc: "Explore what's showing at theaters near you. Filter by genre, rating, or showtime.",
                },
                {
                  num: "02",
                  icon: "💺",
                  title: "Pick Your Seat",
                  desc: "See the live seat map and choose exactly where you want to sit — aisle, middle, front row.",
                },
                {
                  num: "03",
                  icon: "✅",
                  title: "Pay & Enjoy",
                  desc: "Secure checkout in seconds. Your e-ticket is ready instantly. Just show up and enjoy.",
                },
              ].map((step, index) => (
                <div key={step.num} className="lp-step" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="lp-step-num">{step.num}</div>
                  <div className="lp-step-icon">{step.icon}</div>
                  <div className="lp-step-title">{step.title}</div>
                  <div className="lp-step-desc">{step.desc}</div>
                  {index < 2 && <div className="lp-step-connector" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="lp-cta">
          <div className="lp-cta-bg">
            <img src={HERO_BG} alt="" className="lp-cta-bg-img" />
            <div className="lp-cta-overlay" />
          </div>
          <div className="lp-cta-content">
            <div className="lp-section-label" style={{ color: "rgba(255,255,255,0.6)" }}>
              Start Today
            </div>
            <h2 className="lp-cta-title">Ready for your next movie night?</h2>
            <p className="lp-cta-sub">
              Join thousands of cinema lovers who book smarter with CineBook.
            </p>
            <button className="lp-cta-btn" onClick={() => navigate("/login")}>
              Create Free Account →
            </button>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="lp-footer">
          <div className="lp-footer-top">
            <Link to="/" className="lp-logo">
              <span className="lp-logo-icon">◈</span>
              <span className="lp-logo-text">KoloApp</span>
            </Link>
            <p className="lp-footer-tagline">
              The modern way to book cinema tickets.
            </p>
          </div>
          <div className="lp-footer-divider" />
          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">© 2026 CineBook. All rights reserved.</span>
            <div className="lp-footer-links">
              <span>About</span>
              <span>Privacy</span>
              <span>Terms</span>
              <span>Contact</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  .lp-root {
    font-family: 'DM Sans', sans-serif;
    background: #080b10;
    color: #f0ede8;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── Navbar ── */
  .lp-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 60px;
    background: rgba(8, 11, 16, 0.7);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: all 0.3s;
  }

  .lp-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .lp-logo:hover { opacity: 0.8; }
  .lp-logo-icon {
    font-size: 22px;
    color: #e8c97a;
    line-height: 1;
  }
  .lp-logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #f0ede8;
    letter-spacing: -0.3px;
  }

  .lp-nav-links {
    display: flex;
    gap: 36px;
  }
  .lp-nav-link {
    font-size: 14px;
    font-weight: 500;
    color: rgba(240,237,232,0.6);
    text-decoration: none;
    transition: color 0.2s;
    letter-spacing: 0.2px;
  }
  .lp-nav-link:hover { color: #f0ede8; }

  .lp-nav-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .lp-nav-signin {
    font-size: 14px;
    font-weight: 500;
    color: rgba(240,237,232,0.7);
    text-decoration: none;
    transition: color 0.2s;
  }
  .lp-nav-signin:hover { color: #f0ede8; }
  .lp-nav-cta {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #080b10;
    background: #e8c97a;
    padding: 9px 22px;
    border-radius: 100px;
    text-decoration: none;
    transition: all 0.2s;
    letter-spacing: 0.1px;
  }
  .lp-nav-cta:hover {
    background: #f0d98a;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(232,201,122,0.3);
  }

  /* ── Hero ── */
  .lp-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 120px 60px 80px;
    overflow: hidden;
  }
  .lp-hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .lp-hero-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.35;
    filter: saturate(0.6);
  }
  .lp-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(8,11,16,0.95) 0%,
      rgba(8,11,16,0.7) 50%,
      rgba(8,11,16,0.4) 100%
    );
  }

  .lp-hero-content {
    position: relative;
    z-index: 1;
    max-width: 680px;
    animation: fadeUp 0.8s ease both;
  }

  .lp-hero-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(232,201,122,0.1);
    border: 1px solid rgba(232,201,122,0.3);
    color: #e8c97a;
    padding: 7px 16px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 28px;
    letter-spacing: 0.3px;
  }
  .lp-pill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #e8c97a;
    animation: pulse 2s infinite;
  }

  .lp-hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(48px, 7vw, 80px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -2px;
    margin-bottom: 24px;
    color: #f0ede8;
  }
  .lp-hero-title em {
    font-style: italic;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    color: #e8c97a;
  }

  .lp-hero-sub {
    font-size: 17px;
    color: rgba(240,237,232,0.6);
    line-height: 1.75;
    margin-bottom: 40px;
    max-width: 480px;
    font-weight: 300;
  }

  .lp-hero-actions {
    display: flex;
    gap: 14px;
    margin-bottom: 52px;
    flex-wrap: wrap;
  }
  .lp-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #e8c97a;
    color: #080b10;
    border: none;
    border-radius: 100px;
    padding: 14px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.1px;
  }
  .lp-btn-primary:hover {
    background: #f0d98a;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(232,201,122,0.35);
  }
  .lp-btn-arrow { transition: transform 0.2s; }
  .lp-btn-primary:hover .lp-btn-arrow { transform: translateX(4px); }

  .lp-btn-ghost {
    display: inline-flex;
    align-items: center;
    background: transparent;
    color: rgba(240,237,232,0.75);
    border: 1px solid rgba(240,237,232,0.2);
    border-radius: 100px;
    padding: 14px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .lp-btn-ghost:hover {
    border-color: rgba(240,237,232,0.5);
    color: #f0ede8;
    background: rgba(240,237,232,0.05);
  }

  .lp-hero-stats {
    display: flex;
    align-items: center;
    gap: 28px;
  }
  .lp-stat { display: flex; flex-direction: column; gap: 2px; }
  .lp-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #f0ede8;
    letter-spacing: -0.5px;
  }
  .lp-stat-label {
    font-size: 12px;
    color: rgba(240,237,232,0.4);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 500;
  }
  .lp-stat-divider {
    width: 1px;
    height: 36px;
    background: rgba(240,237,232,0.12);
  }

  .lp-scroll-hint {
    position: absolute;
    bottom: 40px;
    left: 60px;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(240,237,232,0.35);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .lp-scroll-line {
    width: 40px;
    height: 1px;
    background: rgba(240,237,232,0.2);
    animation: scrollPulse 2s infinite;
  }

  /* ── Sections ── */
  .lp-section {
    padding: 100px 60px;
    max-width: 1280px;
    margin: 0 auto;
  }
  .lp-section-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #e8c97a;
    margin-bottom: 12px;
  }
  .lp-section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 800;
    letter-spacing: -1px;
    color: #f0ede8;
    margin-bottom: 0;
    line-height: 1.1;
  }
  .lp-section-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 48px;
  }
  .lp-see-all {
    font-size: 14px;
    font-weight: 500;
    color: rgba(240,237,232,0.5);
    text-decoration: none;
    transition: color 0.2s;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(240,237,232,0.15);
    display: flex;
    gap: 6px;
  }
  .lp-see-all:hover { color: #e8c97a; border-color: #e8c97a; }

  /* ── Movies Grid ── */
  .lp-movies-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .lp-movie-card {
    cursor: pointer;
    border-radius: 16px;
    overflow: hidden;
    background: #0f1318;
    border: 1px solid rgba(255,255,255,0.06);
    transition: transform 0.25s, box-shadow 0.25s;
    animation: fadeUp 0.6s ease both;
  }
  .lp-movie-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    border-color: rgba(232,201,122,0.2);
  }
  .lp-movie-img-wrap {
    position: relative;
    height: 260px;
    overflow: hidden;
  }
  .lp-movie-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }
  .lp-movie-card:hover .lp-movie-img { transform: scale(1.05); }
  .lp-movie-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(8,11,16,0.9) 0%, transparent 60%);
  }
  .lp-movie-genre {
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(232,201,122,0.15);
    border: 1px solid rgba(232,201,122,0.3);
    color: #e8c97a;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding: 4px 10px;
    border-radius: 100px;
  }
  .lp-movie-hover-btn {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: #e8c97a;
    color: #080b10;
    font-size: 12px;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 100px;
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.25s;
  }
  .lp-movie-card:hover .lp-movie-hover-btn {
    opacity: 1;
    transform: translateY(0);
  }
  .lp-movie-info { padding: 18px 20px 20px; }
  .lp-movie-title {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #f0ede8;
    margin-bottom: 6px;
    letter-spacing: -0.2px;
  }
  .lp-movie-meta {
    font-size: 13px;
    color: rgba(240,237,232,0.45);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .lp-movie-dot { opacity: 0.3; }
  .lp-movie-rating { color: #e8c97a; font-weight: 600; }

  /* ── How It Works ── */
  .lp-how {
    background: #0a0d12;
    border-top: 1px solid rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding: 100px 60px;
  }
  .lp-how-inner { max-width: 1280px; margin: 0 auto; }
  .lp-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    position: relative;
  }
  .lp-step {
    padding: 40px 40px 40px 0;
    position: relative;
    animation: fadeUp 0.6s ease both;
  }
  .lp-step:not(:last-child) {
    border-right: 1px solid rgba(255,255,255,0.06);
    margin-right: 40px;
  }
  .lp-step-num {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: rgba(232,201,122,0.4);
    letter-spacing: 3px;
    margin-bottom: 20px;
  }
  .lp-step-icon {
    font-size: 36px;
    margin-bottom: 16px;
    display: block;
  }
  .lp-step-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #f0ede8;
    margin-bottom: 12px;
    letter-spacing: -0.3px;
  }
  .lp-step-desc {
    font-size: 14px;
    color: rgba(240,237,232,0.5);
    line-height: 1.75;
    font-weight: 300;
    max-width: 260px;
  }

  /* ── CTA ── */
  .lp-cta {
    position: relative;
    padding: 120px 60px;
    text-align: center;
    overflow: hidden;
  }
  .lp-cta-bg {
    position: absolute;
    inset: 0;
  }
  .lp-cta-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.2;
    filter: saturate(0.4);
  }
  .lp-cta-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(8,11,16,0.9), rgba(8,11,16,0.75));
  }
  .lp-cta-content {
    position: relative;
    z-index: 1;
    max-width: 600px;
    margin: 0 auto;
  }
  .lp-cta-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 800;
    color: #f0ede8;
    letter-spacing: -1.5px;
    line-height: 1.05;
    margin-bottom: 16px;
  }
  .lp-cta-sub {
    font-size: 16px;
    color: rgba(240,237,232,0.55);
    margin-bottom: 36px;
    font-weight: 300;
    line-height: 1.6;
  }
  .lp-cta-btn {
    background: #e8c97a;
    color: #080b10;
    border: none;
    border-radius: 100px;
    padding: 16px 36px;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.2px;
  }
  .lp-cta-btn:hover {
    background: #f0d98a;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(232,201,122,0.3);
  }

  /* ── Footer ── */
  .lp-footer {
    background: #050709;
    padding: 48px 60px 32px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .lp-footer-top {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 32px;
  }
  .lp-footer-tagline {
    font-size: 13px;
    color: rgba(240,237,232,0.3);
    font-weight: 300;
  }
  .lp-footer-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin-bottom: 24px;
  }
  .lp-footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .lp-footer-copy {
    font-size: 12px;
    color: rgba(240,237,232,0.25);
  }
  .lp-footer-links {
    display: flex;
    gap: 28px;
  }
  .lp-footer-links span {
    font-size: 13px;
    color: rgba(240,237,232,0.35);
    cursor: pointer;
    transition: color 0.2s;
  }
  .lp-footer-links span:hover { color: rgba(240,237,232,0.7); }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.8); }
  }
  @keyframes scrollPulse {
    0%, 100% { transform: scaleX(1); opacity: 0.4; }
    50%       { transform: scaleX(1.5); opacity: 0.8; }
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .lp-nav { padding: 18px 24px; }
    .lp-nav-links { display: none; }
    .lp-hero { padding: 100px 24px 60px; }
    .lp-section { padding: 60px 24px; }
    .lp-how { padding: 60px 24px; }
    .lp-cta { padding: 80px 24px; }
    .lp-footer { padding: 40px 24px 24px; }
    .lp-movies-grid { grid-template-columns: 1fr; }
    .lp-steps { grid-template-columns: 1fr; }
    .lp-step:not(:last-child) { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); margin-right: 0; margin-bottom: 40px; padding-bottom: 40px; }
    .lp-footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
    .lp-scroll-hint { display: none; }
  }
`;