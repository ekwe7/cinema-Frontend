
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm, faChair, faCreditCard, faTicket,
  faArrowRight, faPlay, faStar, faChevronRight,
  faEnvelope, faPhone, faPaperPlane
} from "@fortawesome/free-solid-svg-icons";


const HERO_IMAGE = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&q=80";
const MOVIE_IMAGES = [
  {
    id: 1,
    image: "/aw.jpeg",
    title: "Ghost",
    // genre: "Fantasy/Epic",
    duration: "150 min",
    rating: "9.0",
  },
  {
    id: 2,
    image: "/kb_.jpeg",
    title: "King of Boys",
    // genre: "Crime/Thriller",
    duration: "140 min",
    rating: "9.0",
  },
  {
    id: 3,
    image: "/gl.jpeg",
    title: "Gangs of Lagos",
    // genre: "Action/Drama",
    duration: "120 min",
    rating: "8.2",
  },
  {
    id: 4,
    image: "/Brotherhood (2022 Movie) - One Eye Symbolism [Illuminati].jpeg",
    title: "Brotherhood",
    // genre: "Action/Thriller",
    duration: "135 min",
    rating: "8.5",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({ email: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.email && contactForm.message) {
      setSubmitStatus("Message sent successfully! We'll get back to you soon.");
      setContactForm({ email: "", message: "" });
      setTimeout(() => setSubmitStatus(""), 3000);
    }
  };

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
            <span className="lp-logo-text">ZeeShow</span>
          </Link>

          <div className="lp-nav-links">
            <a href="#movies" className="lp-nav-link">Movies</a>
            <a href="#how"    className="lp-nav-link">How it works</a>
          </div>

          <div className="lp-nav-right">
            <Link to="/user/browse" className="lp-nav-cta">
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
              Your ZeeShow<br />
              <em>Your Seats</em>
            </h1>

            <p className="lp-hero-sub">
              Browse the latest blockbusters, pick your perfect seats in real-time,
              and check out in seconds. ZeeShow booking, reimagined.
            </p>

            <div className="lp-hero-btns">
              <button className="lp-btn-primary" onClick={() => navigate("/user/browse")}>
                <FontAwesomeIcon icon={faPlay} />
                Browse Movies
              </button>
            </div>

            {/* <div className="lp-stats">
              {[
                { num: "50+",  label: "Movies" },
                { num: "12",   label: "Theaters" },
                { num: "10k+", label: "Happy Guests" },
              ].map((s, index) => (
                <>
                  {index > 0 && <div className="lp-stat-div" key={`div-${index}`} />}
                  <div className="lp-stat" key={s.label}>
                    <span className="lp-stat-num">{s.num}</span>
                    <span className="lp-stat-label">{s.label}</span>
                  </div>
                </>
              ))}
            </div> */}


            <div className="lp-stats">
  {[
    { num: "50+",  label: "Movies" },
    { num: "12",   label: "Theaters" },
    { num: "10k+", label: "Happy Guests" },
  ].map((s, index) => (
    <Fragment key={s.label}>
      {index > 0 && <div className="lp-stat-div" />}
      <div className="lp-stat">
        <span className="lp-stat-num">{s.num}</span>
        <span className="lp-stat-label">{s.label}</span>
      </div>
    </Fragment>
  ))}
</div>

          </div>

          <div className="lp-hero-image">
            <img src="/aw.jpeg" alt="Now Showing" />
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
            <Link to="/user/browse" className="lp-see-all">
              View all films <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 12 }} />
            </Link>
          </div>

          <div className="lp-movies">
            {MOVIE_IMAGES.map((m, index) => (
              <div key={index} className="lp-movie-card" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => navigate("/user/browse")}>
                <div className="lp-movie-img-wrap">
                  <img src={m.image} alt={m.title} className="lp-movie-img" />
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
            <div className="lp-label" style={{ color: "rgba(255,51,137,0.6)", textAlign: "center" }}>Start Today</div>
            <h2 className="lp-cta-title">Ready for your next movie night?</h2>
            <p className="lp-cta-sub">Join thousands of cinema lovers who book smarter with ZeeShow.</p>
            <button className="lp-btn-primary" onClick={() => navigate("/user/browse")}>
              <FontAwesomeIcon icon={faTicket} />
              Book Your Tickets
            </button>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="lp-footer">
          <div className="lp-footer-main">
            {/* Left Section: Company Info & Contact Details */}
            <div className="lp-footer-left">
              <Link to="/" className="lp-logo">
                <div className="lp-logo-icon"><FontAwesomeIcon icon={faFilm} /></div>
                <span className="lp-logo-text">ZeeShow</span>
              </Link>
              <p className="lp-footer-tag">The modern way to book cinema tickets.</p>
              
              <div className="lp-footer-contact-info">
                <div className="lp-contact-item">
                  <FontAwesomeIcon icon={faEnvelope} className="lp-contact-icon" />
                  <div>
                    <p className="lp-contact-label">Email</p>
                    <a href="mailto:support@zeeshow.com">support@zeeshow.com</a>
                  </div>
                </div>
                <div className="lp-contact-item">
                  <FontAwesomeIcon icon={faPhone} className="lp-contact-icon" />
                  <div>
                    <p className="lp-contact-label">Phone</p>
                    <a href="tel:+234701234567">+234 (70) 1234-567</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section: Contact Form */}
            <div className="lp-footer-right">
              <h3 className="lp-footer-contact-title">Get In Touch</h3>
              <form className="lp-contact-form" onSubmit={handleContactSubmit}>
                <div className="lp-form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    className="lp-form-input"
                  />
                </div>
                <div className="lp-form-group">
                  <textarea
                    name="message"
                    placeholder="Your message..."
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    className="lp-form-textarea"
                    rows="4"
                  />
                </div>
                <button type="submit" className="lp-form-btn">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Send Message
                </button>
                {submitStatus && <p className="lp-form-success">{submitStatus}</p>}
              </form>
            </div>
          </div>

          <div className="lp-footer-line" />

          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">© 2026 ZeeShow. All rights reserved.</span>
            <div className="lp-footer-links">
              {["About","Privacy","Terms"].map(l => <span key={l}>{l}</span>)}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
  .lp { font-family:'DM Sans',sans-serif; background:#ffffff; color:#111111; min-height:100vh; overflow-x:hidden; }

  /* Navbar */
  .lp-nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:18px 60px; background:rgba(255,255,255,0.98); backdrop-filter:blur(8px); border-bottom:1px solid #e6e6e6; }
  .lp-logo { display:flex; align-items:center; gap:10px; text-decoration:none; transition:all 0.2s; }
  .lp-logo:hover { opacity:0.85; }
  .lp-logo-icon { width:36px; height:36px; background:#f5f5f5; border:1px solid #e6e6e6; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#cc0056; font-size:15px; }
  .lp-logo-text { font-family:'Syne',sans-serif; font-size:19px; font-weight:700; color:#111111; letter-spacing:-0.3px; }
  .lp-nav-links { display:flex; gap:32px; }
  .lp-nav-link { font-size:14px; font-weight:600; color:rgba(17,17,17,0.65); text-decoration:none; transition:all 0.2s; }
  .lp-nav-link:hover { color:#cc0056; }
  .lp-nav-right { display:flex; align-items:center; gap:16px; }
  .lp-nav-cta { display:inline-flex; align-items:center; gap:8px; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:700; color:white; background:linear-gradient(135deg, #cc0056, #ff3389); padding:10px 24px; border-radius:100px; text-decoration:none; transition:all 0.2s; border:none; cursor:pointer; }
  .lp-nav-cta:hover { transform:translateY(-2px); }

  /* Hero */
  .lp-hero { position:relative; min-height:100vh; display:flex; align-items:center; justify-content:space-between; gap:40px; padding:120px 60px 80px; overflow:hidden; background:#ffffff; }
  .lp-hero-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.05; }
  .lp-hero-overlay { position:absolute; inset:0; background:rgba(255,255,255,0.90); }
  .lp-hero-content { position:relative; z-index:2; max-width:580px; }
  .lp-hero-image { position:relative; z-index:2; flex-shrink:0; width:400px; height:500px; border-radius:16px; overflow:hidden; border:1px solid #e6e6e6; }
  .lp-hero-image img { width:100%; height:100%; object-fit:cover; }
  .lp-pill { display:inline-flex; align-items:center; gap:8px; background:#f5f5f5; border:1px solid #e6e6e6; color:#cc0056; padding:8px 16px; border-radius:100px; font-size:13px; font-weight:700; margin-bottom:28px; }
  .lp-pill-dot { width:6px; height:6px; border-radius:50%; background:#ff3389; }
  .lp-hero-title { font-family:'Syne',sans-serif; font-size:clamp(44px,7vw,78px); font-weight:800; line-height:1.05; letter-spacing:-2px; margin-bottom:22px; color:#111111; }
  .lp-hero-title em { font-style:italic; color:#ff3389; }
  .lp-hero-sub { font-size:16px; color:rgba(17,17,17,0.68); line-height:1.8; margin-bottom:36px; max-width:480px; font-weight:500; }
  .lp-hero-btns { display:flex; gap:14px; margin-bottom:48px; flex-wrap:wrap; }
  .lp-btn-primary { display:inline-flex; align-items:center; justify-content:center; gap:10px; background:linear-gradient(135deg, #cc0056, #ff3389); color:white; border:none; border-radius:100px; padding:15px 36px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700; cursor:pointer; transition:all 0.2s; }
  .lp-btn-primary:hover { transform:translateY(-3px); }
  .lp-btn-ghost { display:inline-flex; align-items:center; justify-content:center; gap:10px; background:white; color:#cc0056; border:2px solid #cc0056; border-radius:100px; padding:13px 34px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700; cursor:pointer; transition:all 0.2s; }
  .lp-btn-ghost:hover { background:#cc0056; color:white; transform:translateY(-2px); }
  .lp-stats { display:flex; align-items:center; gap:24px; }
  .lp-stat { display:flex; flex-direction:column; gap:2px; }
  .lp-stat-num { font-family:'Syne',sans-serif; font-size:24px; font-weight:700; color:#ff3389; letter-spacing:-0.5px; }
  .lp-stat-label { font-size:11px; color:rgba(17,17,17,0.55); text-transform:uppercase; letter-spacing:2px; font-weight:600; }
  .lp-stat-div { width:1px; height:40px; background:#e6e6e6; }
  .lp-scroll-hint { position:absolute; bottom:40px; left:60px; z-index:3; display:flex; align-items:center; gap:12px; color:rgba(17,17,17,0.4); font-size:10px; text-transform:uppercase; letter-spacing:2px; font-weight:600; }
  .lp-scroll-line { width:40px; height:1px; background:#e6e6e6; }

  /* Sections */
  .lp-section { padding:100px 60px; max-width:1280px; margin:0 auto; }
  .lp-label { font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:3px; color:#cc0056; margin-bottom:10px; }
  .lp-section-title { font-family:'Syne',sans-serif; font-size:clamp(26px,4vw,42px); font-weight:800; letter-spacing:-1px; color:#111111; line-height:1.1; }
  .lp-section-head { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:44px; }
  .lp-see-all { display:inline-flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:rgba(17,17,17,0.6); text-decoration:none; border-bottom:2px solid #e6e6e6; padding-bottom:2px; transition:all 0.2s; }
  .lp-see-all:hover { color:#ff3389; border-color:#ff3389; }

  /* Movies */
  .lp-movies { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
  .lp-movie-card { cursor:pointer; border-radius:12px; overflow:hidden; background:white; border:1px solid #e6e6e6; transition:all 0.2s; }
  .lp-movie-card:hover { transform:scale(1.02); border-color:#cc0056; }
  .lp-movie-img-wrap { position:relative; height:260px; overflow:hidden; background:#f5f5f5; }
  .lp-movie-img { width:100%; height:100%; object-fit:cover; transition:transform 0.2s; }
  .lp-movie-card:hover .lp-movie-img { transform:scale(1.02); }
  .lp-movie-grad { position:absolute; inset:0; background:linear-gradient(to top,rgba(255,255,255,0.92) 0%,transparent 60%); }
  .lp-movie-book-btn { position:absolute; bottom:16px; right:16px; background:linear-gradient(135deg, #cc0056, #ff3389); color:white; font-size:12px; font-weight:700; padding:11px 20px; border-radius:100px; display:flex; align-items:center; gap:6px; opacity:0; transform:translateY(20px); transition:all 0.2s; cursor:pointer; border:none; }
  .lp-movie-card:hover .lp-movie-book-btn { opacity:1; transform:translateY(0); }
  .lp-movie-info { padding:18px 18px 20px; }
  .lp-movie-title { font-family:'Syne',sans-serif; font-size:16px; font-weight:700; color:#111111; margin-bottom:8px; }
  .lp-movie-meta { display:flex; align-items:center; gap:8px; font-size:13px; color:rgba(17,17,17,0.55); font-weight:500; }
  .lp-dot { opacity:0.4; }
  .lp-rating { color:#ff3389; font-weight:700; display:flex; align-items:center; gap:4px; }

  /* How it works */
  .lp-how { background:#ffffff; border-top:1px solid #e6e6e6; border-bottom:1px solid #e6e6e6; padding:100px 60px; }
  .lp-how-inner { max-width:1280px; margin:0 auto; }
  .lp-steps { display:grid; grid-template-columns:repeat(3,1fr); gap:0; }
  .lp-step { padding:32px 40px 32px 0; }
  .lp-step:not(:last-child) { border-right:1px solid #e6e6e6; margin-right:40px; }
  .lp-step-num { font-family:'Syne',sans-serif; font-size:11px; font-weight:700; color:#cc0056; letter-spacing:2px; margin-bottom:18px; }
  .lp-step-icon-wrap { width:56px; height:56px; border-radius:12px; background:#f5f5f5; border:1px solid #e6e6e6; display:flex; align-items:center; justify-content:center; color:#ff3389; font-size:20px; margin-bottom:18px; }
  .lp-step-title { font-family:'Syne',sans-serif; font-size:19px; font-weight:700; color:#111111; margin-bottom:12px; }
  .lp-step-desc { font-size:14px; color:rgba(17,17,17,0.65); line-height:1.8; font-weight:500; max-width:280px; }

  /* CTA */
  .lp-cta { position:relative; padding:120px 60px; text-align:center; overflow:hidden; background:#111111; }
  .lp-cta-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.05; }
  .lp-cta-overlay { position:absolute; inset:0; background:rgba(17,17,17,0.85); }
  .lp-cta-content { position:relative; z-index:1; max-width:560px; margin:0 auto; }
  .lp-cta-title { font-family:'Syne',sans-serif; font-size:clamp(28px,5vw,52px); font-weight:800; color:white; letter-spacing:-1.5px; line-height:1.05; margin-bottom:18px; }
  .lp-cta-sub { font-size:16px; color:rgba(255,255,255,0.85); margin-bottom:36px; font-weight:500; line-height:1.7; }

  /* Footer */
  .lp-footer { background:#111111; padding:60px 60px 28px; border-top:1px solid #333333; }
  .lp-footer-main { display:grid; grid-template-columns:1fr 1fr; gap:60px; margin-bottom:40px; max-width:1280px; margin-left:auto; margin-right:auto; }
  .lp-footer-left { }
  .lp-footer .lp-logo-icon { background:#333333; border-color:#444444; }
  .lp-footer .lp-logo-text { color:#ffffff; }
  .lp-footer-tag { font-size:13px; color:rgba(255,255,255,0.55); font-weight:500; margin-top:12px; margin-bottom:32px; }
  
  /* Contact Info */
  .lp-footer-contact-info { display:flex; flex-direction:column; gap:20px; }
  .lp-contact-item { display:flex; align-items:flex-start; gap:14px; }
  .lp-contact-icon { color:#ff3389; font-size:18px; margin-top:2px; }
  .lp-contact-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:rgba(255,255,255,0.45); margin-bottom:4px; }
  .lp-contact-item a { font-size:15px; color:rgba(255,255,255,0.75); text-decoration:none; transition:all 0.2s; font-weight:600; }
  .lp-contact-item a:hover { color:#ff3389; }
  
  /* Contact Form */
  .lp-footer-contact-title { font-family:'Syne',sans-serif; font-size:19px; font-weight:700; color:white; margin-bottom:22px; }
  .lp-contact-form { display:flex; flex-direction:column; gap:14px; }
  .lp-form-group { display:flex; flex-direction:column; }
  .lp-form-input, .lp-form-textarea { background:rgba(255,255,255,0.05); border:1px solid #333333; color:white; padding:12px 14px; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:14px; transition:all 0.2s; }
  .lp-form-input::placeholder, .lp-form-textarea::placeholder { color:rgba(255,255,255,0.42); }
  .lp-form-input:focus, .lp-form-textarea:focus { outline:none; background:rgba(255,255,255,0.1); border-color:#ff3389; }
  .lp-form-textarea { resize:vertical; min-height:80px; }
  .lp-form-btn { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg, #cc0056, #ff3389); color:white; border:none; border-radius:20px; padding:13px 28px; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:700; cursor:pointer; transition:all 0.2s; }
  .lp-form-btn:hover { transform:translateY(-2px); }
  .lp-form-success { font-size:13px; color:#4ade80; margin-top:8px; font-weight:700; }
  
  .lp-footer-line { height:1px; background:#333333; margin-bottom:20px; }
  .lp-footer-bottom { display:flex; align-items:center; justify-content:space-between; max-width:1280px; margin-left:auto; margin-right:auto; }
  .lp-footer-copy { font-size:12px; color:rgba(255,255,255,0.45); font-weight:500; }
  .lp-footer-links { display:flex; gap:24px; }
  .lp-footer-links span { font-size:13px; color:rgba(255,255,255,0.55); cursor:pointer; transition:all 0.2s; font-weight:600; }
  .lp-footer-links span:hover { color:rgba(255,255,255,0.95); }

  /* Responsive */
  @media(max-width:1100px){
    .lp-hero-image { width:320px; height:400px; }
  }
  @media(max-width:900px){
    .lp-nav{padding:16px 20px}
    .lp-nav-links{display:none}
    .lp-hero{padding:80px 20px 50px; flex-direction:column; align-items:flex-start; gap:40px; min-height:auto}
    .lp-hero-content{max-width:100%}
    .lp-hero-image{width:100%; height:280px; border-radius:12px}
    .lp-section{padding:60px 20px}
    .lp-how{padding:60px 20px}
    .lp-cta{padding:80px 20px}
    .lp-footer{padding:40px 20px 20px}
    .lp-footer-main{grid-template-columns:1fr; gap:40px}
    .lp-movies{grid-template-columns:repeat(2,1fr)}
    .lp-steps{grid-template-columns:1fr}
    .lp-step:not(:last-child){border-right:none;border-bottom:1px solid #e6e6e6;margin-right:0;padding-right:0;margin-bottom:32px;padding-bottom:32px}
    .lp-footer-bottom{flex-direction:column;gap:16px;text-align:center}
    .lp-scroll-hint{display:none}
  }
  @media(max-width:768px){
    .lp-section{padding:50px 16px}
    .lp-cta{padding:70px 16px}
    .lp-hero-title{font-size:clamp(36px,6vw,54px)}
    .lp-movies{grid-template-columns:repeat(2,1fr); gap:16px}
    .lp-movie-card{border-radius:10px}
    .lp-section-title{font-size:clamp(22px,5vw,28px)}
    .lp-btn-primary{padding:12px 28px; font-size:14px}
    .lp-footer-contact-info{gap:16px}
  }
  @media(max-width:640px){
    .lp-hero{padding:70px 16px 40px}
    .lp-hero-title{font-size:clamp(32px,6vw,42px); letter-spacing:-0.8px}
    .lp-hero-sub{font-size:15px}
    .lp-hero-btns{flex-direction:column; gap:10px}
    .lp-btn-primary{padding:12px 24px; width:100%; justify-content:center}
    .lp-movies{grid-template-columns:1fr}
    .lp-hero-image{height:240px}
    .lp-cta-title{font-size:clamp(24px,5vw,32px)}
    .lp-cta-sub{font-size:14px}
    .lp-pill{font-size:12px; padding:6px 12px}
    .lp-nav-cta{padding:8px 16px; font-size:13px}
  }
  @media(max-width:480px){
    .lp-nav{padding:12px 16px}
    .lp-hero{padding:60px 12px 30px}
    .lp-hero-title{font-size:clamp(28px,6vw,36px)}
    .lp-hero-image{height:200px; border-radius:10px}
    .lp-section{padding:40px 12px}
    .lp-how{padding:40px 12px}
    .lp-cta{padding:60px 12px}
    .lp-footer{padding:30px 12px 16px}
    .lp-hero-btns{gap:8px}
    .lp-btn-primary{padding:11px 20px; font-size:13px}
    .lp-footer-contact-title{font-size:16px; margin-bottom:16px}
    .lp-form-input, .lp-form-textarea{padding:10px 12px; font-size:13px}
    .lp-form-textarea{min-height:70px}
    .lp-movies{gap:12px}
    .lp-section-title{font-size:clamp(20px,5vw,24px)}
    .lp-stats{flex-wrap:wrap; gap:12px}
    .lp-stat-num{font-size:18px}
    .lp-scroll-line{width:30px}
    .lp-logo-text{font-size:16px}
  }
`;
