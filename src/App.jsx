import { useState, useEffect, useRef } from "react";
import TATVA_LOGO from "./assets/symbol.svg";

const COLORS = {
  purple: "#5B2D8E",
  purpleDark: "#3D1A6E",
  purpleDeep: "#1E0A40",
  purpleLight: "#7B4DB5",
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  goldDark: "#8B6914",
  cream: "#FDF6E3",
  cream2: "#F5EAC8",
  white: "#FFFFFF",
  dark: "#0D0820",
  dark2: "#160D35",
  dark3: "#1F1245",
  text: "#E8D5FF",
  textMuted: "#A78DC0",
};

const FONTS = {
  display: "'Cinzel', serif",
  body: "'Cormorant Garamond', serif",
  sans: "'Outfit', sans-serif",
};

// ─── Social Media Icons SVG ───
const SocialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  ),
};

// ─── Animated Stars Background ───
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.7 + 0.2,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {stars.map((s) => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: "50%",
          background: Math.random() > 0.7 ? COLORS.gold : "#fff",
          opacity: s.opacity,
          animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
}

// ─── Rotating Zodiac Wheel ───
function ZodiacWheel({ size = 320, spinning = true }) {
  const signs = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
  return (
    <div style={{ width: size, height: size, position: "relative", animation: spinning ? "spinSlow 40s linear infinite" : "none" }}>
      <svg viewBox="0 0 320 320" style={{ width: "100%", height: "100%" }}>
        <circle cx="160" cy="160" r="155" stroke={COLORS.gold} strokeWidth="0.8" fill="none" opacity="0.5"/>
        <circle cx="160" cy="160" r="130" stroke={COLORS.gold} strokeWidth="0.5" fill="none" opacity="0.3"/>
        <circle cx="160" cy="160" r="100" stroke={COLORS.purple} strokeWidth="0.5" fill="none" opacity="0.4"/>
        <circle cx="160" cy="160" r="60" stroke={COLORS.gold} strokeWidth="0.8" fill="rgba(91,45,142,0.2)" opacity="0.6"/>
        {signs.map((sign, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = 160 + 140 * Math.cos(angle);
          const y = 160 + 140 * Math.sin(angle);
          return (
            <g key={i}>
              <line x1={160 + 100 * Math.cos(angle)} y1={160 + 100 * Math.sin(angle)} x2={160 + 155 * Math.cos(angle)} y2={160 + 155 * Math.sin(angle)} stroke={COLORS.gold} strokeWidth="0.5" opacity="0.3"/>
              <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill={COLORS.gold} opacity="0.85">{sign}</text>
            </g>
          );
        })}
        {[0,45,90,135,180,225,270,315].map((angle, i) => {
          const rad = angle * Math.PI / 180;
          return <line key={i} x1={160 + 60 * Math.cos(rad)} y1={160 + 60 * Math.sin(rad)} x2={160 + 100 * Math.cos(rad)} y2={160 + 100 * Math.sin(rad)} stroke={COLORS.purple} strokeWidth="0.5" opacity="0.5"/>;
        })}
        <circle cx="160" cy="160" r="20" fill={COLORS.purpleDeep} stroke={COLORS.gold} strokeWidth="1" opacity="0.9"/>
        <text x="160" y="160" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill={COLORS.gold}>✦</text>
      </svg>
    </div>
  );
}

// ─── Floating Particles ───
function FloatingParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i, x: Math.random() * 100,
    size: Math.random() * 6 + 3,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, bottom: "-20px",
          width: p.size, height: p.size, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.gold}, transparent)`,
          opacity: 0.4, animation: `floatUp ${p.duration}s ${p.delay}s linear infinite`,
        }}/>
      ))}
    </div>
  );
}

// ─── Section Reveal ───
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
    }}>{children}</div>
  );
}

// ─── Social Media Bar ───
function SocialBar() {
  const socials = [
    { name: "Instagram", icon: SocialIcons.instagram, url: "https://www.instagram.com/tatva_vastu_consultancy", color: "#E1306C" },
    { name: "Facebook", icon: SocialIcons.facebook, url: "https://www.facebook.com/tatvaVastuConsultancy", color: "#1877F2" },
    { name: "YouTube", icon: SocialIcons.youtube, url: "https://www.youtube.com/@tatvaVastu", color: "#FF0000" },
    { name: "WhatsApp", icon: SocialIcons.whatsapp, url: "https://wa.me/+91 9173878471", color: "#25D366" },
  ];
  return (
    <div style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
      {socials.map((s) => (
        <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
          title={s.name}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: `1px solid rgba(201,168,76,0.25)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: COLORS.textMuted, transition: "all 0.3s", textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; e.currentTarget.style.color = COLORS.textMuted; }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

// ─── Nav ───
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setMenuOpen(false);
    if (menuOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "blog", label: "Articles" },
    { id: "enquiry", label: "Enquiry" },
    { id: "booking", label: "Book Now" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: scrolled ? "0.7rem 4%" : "1.1rem 4%",
      background: scrolled ? "rgba(14,8,32,0.97)" : "rgba(14,8,32,0.5)",
      borderBottom: `1px solid rgba(201,168,76,${scrolled ? 0.25 : 0.1})`,
      backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.4s ease",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.10rem", cursor: "pointer", flexShrink: 0 }}
        onClick={() => { setPage("home"); setMenuOpen(false); }}>
        <img src={TATVA_LOGO} alt="Tatva Vastu Logo" style={{
          width: 60, height: 42,
          objectFit: "contain", flexShrink: 0,
          filter: "drop-shadow(0 0 6px rgba(201,168,76,0.4))",
        }}/>
        <div>
          <div style={{ fontFamily: FONTS.display, fontSize: "0.85rem", letterSpacing: "0.1em", color: COLORS.gold, lineHeight: 2 }}>TATVA VASTU</div>
          <div style={{ fontFamily: FONTS.sans, fontSize: "0.57rem", letterSpacing: "0.2em", color: COLORS.textMuted, lineHeight: 1.3 }}>Align your life,</div>
          <div style={{ fontFamily: FONTS.sans, fontSize: "0.57rem", letterSpacing: "0.2em", color: COLORS.textMuted, lineHeight: 1.5 }}>Elevate your space.</div>
          <div style={{ fontFamily: FONTS.sans, fontSize: "0.57rem", letterSpacing: "0.2em", color: COLORS.textMuted, lineHeight: 1.3 }}>Since2010</div>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="desktop-nav" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {links.map((l) => (
          <button key={l.id} onClick={() => setPage(l.id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: FONTS.sans, fontSize: "0.72rem", letterSpacing: "0.08em",
              color: page === l.id ? COLORS.gold : COLORS.text,
              borderBottom: page === l.id ? `1px solid ${COLORS.gold}` : "1px solid transparent",
              paddingBottom: "2px", transition: "all 0.3s",
            }}>{l.label}</button>
        ))}
        <button onClick={() => setPage("booking")}
          style={{
            fontFamily: FONTS.sans, fontSize: "0.68rem", letterSpacing: "0.1em",
            background: COLORS.gold, color: COLORS.purpleDeep,
            border: "none", padding: "0.5rem 1.2rem", cursor: "pointer",
            fontWeight: 700, borderRadius: "2px", transition: "all 0.3s",
          }}>Book Now</button>
      </div>

      {/* Mobile: 3 dot button */}
      <button
        className="mobile-menu-btn"
        onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
        style={{
          background: "transparent", border: `1px solid rgba(201,168,76,0.4)`,
          color: COLORS.gold, cursor: "pointer", display: "none",
          width: 38, height: 38, borderRadius: "6px",
          fontSize: "18px", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: "4px",
        }}>
        <span style={{ display: "block", width: 18, height: 2, background: COLORS.gold, borderRadius: 2 }}/>
        <span style={{ display: "block", width: 18, height: 2, background: COLORS.gold, borderRadius: 2 }}/>
        <span style={{ display: "block", width: 18, height: 2, background: COLORS.gold, borderRadius: 2 }}/>
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div onClick={(e) => e.stopPropagation()} style={{
          position: "absolute", top: "100%", right: "4%",
          background: COLORS.dark2,
          border: `1px solid rgba(201,168,76,0.3)`,
          borderRadius: "8px", padding: "0.5rem",
          zIndex: 999, minWidth: "180px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}>
          {links.map((l) => (
            <div key={l.id}
              onClick={() => { setPage(l.id); setMenuOpen(false); }}
              style={{
                padding: "0.75rem 1rem", cursor: "pointer",
                color: page === l.id ? COLORS.gold : COLORS.text,
                fontFamily: FONTS.sans, fontSize: "0.85rem",
                borderRadius: "4px",
                background: page === l.id ? "rgba(201,168,76,0.1)" : "transparent",
                transition: "all 0.2s",
                borderLeft: page === l.id ? `2px solid ${COLORS.gold}` : "2px solid transparent",
              }}>
              {l.label}
            </div>
          ))}
          <div style={{ borderTop: `1px solid rgba(201,168,76,0.15)`, margin: "0.5rem 0", padding: "0.75rem 1rem" }}>
            <div style={{ fontFamily: FONTS.sans, fontSize: "0.7rem", color: COLORS.textMuted, marginBottom: "0.5rem" }}>Follow Us</div>
            <SocialBar />
          </div>
        </div>
      )}
    </nav>
  );
}

// ═══════════════════════════════════════════════
// PAGE: HOME
// ═══════════════════════════════════════════════
function HomePage({ setPage }) {
  const services = [
    { icon: "⊛", name: "Chart Analysis", sub: "Nakshatra & KP Astrology" },
    { icon: "🏭", name: "Industrial Vastu", sub: "Factory & Warehouse" },
    { icon: "📐", name: "Plot Vastu", sub: "Land & Site Guidance" },
    { icon: "🏠", name: "Residential Vastu", sub: "Home & Flat Solutions" },
    { icon: "✨", name: "Reiki Training", sub: "Energy Healing" },
  ];
  const testimonials = [
    { name: "Ramesh Patel", city: "Ahmedabad", text: "After Vastu correction in my factory, production efficiency improved dramatically within 3 months.", init: "RP", rating: 5 },
    { name: "Priya Shah", city: "Surat", text: "The KP chart analysis was incredibly accurate. Clear, honest guidance — exactly what they promise.", init: "PS", rating: 5 },
    { name: "Mahesh Desai", city: "Vadodara", text: "Industrial Vastu for my warehouse was exceptional. No demolition needed — energy balance achieved perfectly.", init: "MD", rating: 5 },
  ];
  const scrollingText = ["Chart Analysis", "Industrial Vastu", "Plot Vastu", "Residential Vastu", "Reiki Training", "Nakshatra", "KP Astrology", "Vastu Shastra"];

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: "100vh", position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "8rem 5% 4rem",
        background: `radial-gradient(ellipse 80% 70% at 50% 30%, rgba(91,45,142,0.35) 0%, transparent 70%)`,
        overflow: "hidden",
      }}>
        <FloatingParticles />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.07 }}>
          <ZodiacWheel size={600} spinning={true}/>
        </div>
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "inline-block", fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: COLORS.gold, border: `1px solid rgba(201,168,76,0.4)`, padding: "0.4rem 1.5rem", marginBottom: "1.5rem", animation: "fadeUp 0.8s 0.2s both" }}>
            ✦ Since 2010 · Trusted Vastu & Astrology ✦
          </div>
          <h1 style={{ fontFamily: FONTS.display, fontSize: "clamp(2.2rem, 7vw, 5.5rem)", fontWeight: 700, lineHeight: 1.05, color: COLORS.white, marginBottom: "0.4rem", animation: "fadeUp 0.8s 0.4s both" }}>
            TATVA VASTU
          </h1>
          <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(1rem, 3vw, 2.2rem)", fontWeight: 400, letterSpacing: "0.18em", color: COLORS.gold, marginBottom: "1.2rem", animation: "fadeUp 0.8s 0.5s both" }}>
            CONSULTANCY
          </h2>
          <p style={{ fontFamily: FONTS.body, fontStyle: "italic", fontSize: "clamp(1rem, 2vw, 1.35rem)", color: COLORS.cream2, maxWidth: 520, margin: "0 auto 1rem", lineHeight: 1.8, animation: "fadeUp 0.8s 0.6s both" }}>
            "We believe in clear, honest guidance — not false hope."
          </p>
          <p style={{ fontFamily: FONTS.sans, fontSize: "0.9rem", color: COLORS.textMuted, maxWidth: 440, margin: "0 auto 2.5rem", lineHeight: 1.8, animation: "fadeUp 0.8s 0.7s both" }}>
            Transforming spaces and lives through authentic Vastu Shastra, KP Astrology, and Reiki healing since 2010.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.8s 0.9s both" }}>
            <button onClick={() => setPage("booking")} style={{ background: COLORS.gold, color: COLORS.purpleDeep, fontFamily: FONTS.sans, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, padding: "0.9rem 2rem", border: "none", cursor: "pointer", borderRadius: "2px" }}>
              📅 Book Appointment
            </button>
            <button onClick={() => setPage("enquiry")} style={{ background: "transparent", color: COLORS.cream, fontFamily: FONTS.sans, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.9rem 2rem", border: `1px solid rgba(245,234,200,0.35)`, cursor: "pointer", borderRadius: "2px" }}>
              💬 Send Enquiry
            </button>
          </div>
          {/* Social Media in Hero */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", animation: "fadeUp 0.8s 1s both" }}>
            <SocialBar />
          </div>
        </div>
        {/* Stats */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "3rem", justifyContent: "center", marginTop: "4rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(201,168,76,0.2)", flexWrap: "wrap", animation: "fadeUp 0.8s 1.1s both" }}>
          {[["15+", "Years Experience"], ["500+", "Projects Done"], ["1000+", "Happy Clients"], ["3", "Specialisations"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FONTS.display, fontSize: "2rem", color: COLORS.gold, lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: FONTS.sans, fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.textMuted, marginTop: "0.3rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: COLORS.gold, padding: "0.7rem 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "4rem", animation: "marquee 20s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {[...scrollingText, ...scrollingText].map((t, i) => (
            <span key={i} style={{ fontFamily: FONTS.display, fontSize: "0.78rem", letterSpacing: "0.2em", color: COLORS.purpleDeep, textTransform: "uppercase" }}>✦ {t}</span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section style={{ padding: "5rem 5%" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.7rem" }}>✦ What We Offer</div>
            <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.6rem, 3.5vw, 3rem)", color: COLORS.white }}>Our Sacred Services</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.2rem", maxWidth: 1100, margin: "0 auto" }}>
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <div onClick={() => setPage("services")} style={{ background: "rgba(91,45,142,0.2)", border: `1px solid rgba(201,168,76,0.2)`, padding: "2rem 1.5rem", cursor: "pointer", borderRadius: "4px", position: "relative", overflow: "hidden", transition: "all 0.3s" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>{s.icon}</div>
                <h3 style={{ fontFamily: FONTS.display, fontSize: "0.95rem", color: COLORS.cream, marginBottom: "0.3rem" }}>{s.name}</h3>
                <p style={{ fontFamily: FONTS.sans, fontSize: "0.75rem", color: COLORS.textMuted }}>{s.sub}</p>
                <div style={{ position: "absolute", bottom: 0, left: 0, height: "2px", width: "40%", background: COLORS.gold, opacity: 0.5 }}/>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button onClick={() => setPage("services")} style={{ background: "transparent", color: COLORS.gold, border: `1px solid ${COLORS.gold}`, fontFamily: FONTS.sans, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.8rem 1.8rem", cursor: "pointer", borderRadius: "2px" }}>
            View All Services →
          </button>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.purpleDark}, ${COLORS.purpleDeep})`, padding: "5rem 5%", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.05 }}>
          <ZodiacWheel size={400} spinning={false}/>
        </div>
        <Reveal>
          <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "2.5rem", color: COLORS.gold, opacity: 0.25, lineHeight: 0.5, marginBottom: "1.2rem" }}>"</div>
            <p style={{ fontFamily: FONTS.body, fontStyle: "italic", fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)", color: COLORS.cream, lineHeight: 1.7 }}>
              We believe in clear, honest guidance — not false hope. Every space has a unique energy that can be harnessed to create a harmonious, prosperous environment.
            </p>
            <div style={{ marginTop: "1.2rem", fontFamily: FONTS.sans, fontSize: "0.72rem", letterSpacing: "0.2em", color: COLORS.gold }}>— Tatva Vastu Consultancy</div>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "5rem 5%" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.7rem" }}>✦ Client Stories</div>
            <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", color: COLORS.white }}>Transformations That Speak</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.2rem", maxWidth: 1100, margin: "0 auto" }}>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <div style={{ background: "rgba(91,45,142,0.15)", border: "1px solid rgba(201,168,76,0.15)", padding: "1.8rem", borderRadius: "4px" }}>
                <div style={{ color: COLORS.gold, fontSize: "0.75rem", letterSpacing: "3px", marginBottom: "0.8rem" }}>{"★".repeat(t.rating)}</div>
                <p style={{ fontFamily: FONTS.body, fontStyle: "italic", fontSize: "1rem", color: COLORS.cream2, lineHeight: 1.8, marginBottom: "1.2rem" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(201,168,76,0.15)", border: `1px solid ${COLORS.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.display, fontSize: "0.75rem", color: COLORS.gold, flexShrink: 0 }}>{t.init}</div>
                  <div>
                    <div style={{ fontFamily: FONTS.sans, fontSize: "0.78rem", color: COLORS.cream }}>{t.name}</div>
                    <div style={{ fontFamily: FONTS.sans, fontSize: "0.7rem", color: COLORS.textMuted }}>{t.city}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section style={{ padding: "4rem 5%", textAlign: "center", background: "rgba(91,45,142,0.1)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <Reveal>
          <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.8rem" }}>✦ Start Your Journey</div>
          <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.6rem, 3.5vw, 3rem)", color: COLORS.white, marginBottom: "0.8rem" }}>Ready to Transform Your Space?</h2>
          <p style={{ fontFamily: FONTS.sans, color: COLORS.textMuted, fontSize: "0.9rem", marginBottom: "2rem" }}>
            Call us: <a href="tel:+91 9173878471" style={{ color: COLORS.gold, fontWeight: 700, textDecoration: "none" }}>+91 9173878471</a>
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("booking")} style={{ background: COLORS.gold, color: COLORS.purpleDeep, fontFamily: FONTS.sans, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, padding: "0.9rem 2.2rem", border: "none", cursor: "pointer", borderRadius: "2px" }}>📅 Book Now</button>
            <button onClick={() => setPage("enquiry")} style={{ background: "transparent", color: COLORS.gold, border: `1px solid ${COLORS.gold}`, fontFamily: FONTS.sans, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.9rem 2.2rem", cursor: "pointer", borderRadius: "2px" }}>💬 Enquiry</button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PAGE: ABOUT
// ═══════════════════════════════════════════════
function AboutPage() {
  const values = [
    { icon: "✦", title: "Honest Guidance", desc: "Clear, truthful advice without any false promises or exaggerated claims." },
    { icon: "◈", title: "Non-Demolition", desc: "Our Vastu solutions work with your existing structure — no expensive demolition required." },
    { icon: "⊛", title: "Scientific Approach", desc: "Blending ancient Shastra with modern logic for real, measurable life improvements." },
    { icon: "❋", title: "Personal Attention", desc: "Every consultation is deeply personalised — we stay present through every stage." },
  ];
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "5rem 5% 4rem", background: `radial-gradient(ellipse 70% 60% at 30% 50%, rgba(91,45,142,0.3) 0%, transparent 70%)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="responsive-grid">
          <div>
            <Reveal>
              <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.8rem" }}>✦ Our Story</div>
              <h1 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: COLORS.white, lineHeight: 1.1, marginBottom: "1.2rem" }}>
                Guiding Lives Since<br /><span style={{ color: COLORS.gold }}>2010</span>
              </h1>
              <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.cream2, lineHeight: 1.9, marginBottom: "1.2rem" }}>
              At Tatva Vastu, we offer practical and result-oriented guidance through Astrology, Vastu, and Healing. Samrat Achesariya, with 17+ years of experience, specializes in Astrology and Vastu consultancy, helping individuals, homeowners, and businesses achieve growth, clarity, and balance through plot, residential, commercial, and project-based Vastu solutions.              </p>
              <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.textMuted, lineHeight: 1.9 }}>
              Veeral Achesariya, with 7+ years of experience, focuses on KP Astrology and Nakshatra-based analysis, guiding individuals to understand their life path and make confident decisions. He is also a Reiki teacher, supporting emotional healing and inner peace. </p>
              <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.cream2, lineHeight: 1.9 }}>
              We believe in clear, honest guidance based on logic and experience—without promoting superstition—helping you move forward with clarity and confidence.              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div style={{ background: "rgba(91,45,142,0.3)", border: `1px solid rgba(201,168,76,0.3)`, borderRadius: "4px", padding: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
              <ZodiacWheel size={180} spinning={true}/>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: FONTS.display, fontSize: "2.5rem", color: COLORS.gold }}>15+</div>
                <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.textMuted }}>Years of Service</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", width: "100%", textAlign: "center" }}>
                {[["500+","Projects"],["1000+","Clients"],["3","Specialties"],["100%","Honest"]].map(([n,l]) => (
                  <div key={l} style={{ background: "rgba(201,168,76,0.08)", padding: "0.7rem", borderRadius: "2px" }}>
                    <div style={{ fontFamily: FONTS.display, fontSize: "1.2rem", color: COLORS.gold }}>{n}</div>
                    <div style={{ fontFamily: FONTS.sans, fontSize: "0.6rem", color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section style={{ padding: "4rem 5%", background: "rgba(91,45,142,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.7rem" }}>✦ Our Foundation</div>
              <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: COLORS.white }}>What Sets Us Apart</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem" }}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div style={{ background: "rgba(91,45,142,0.2)", border: `1px solid rgba(201,168,76,0.18)`, padding: "2rem 1.5rem", borderRadius: "4px" }}>
                  <div style={{ fontSize: "1.4rem", color: COLORS.gold, marginBottom: "0.8rem" }}>{v.icon}</div>
                  <h3 style={{ fontFamily: FONTS.display, fontSize: "1rem", color: COLORS.cream, marginBottom: "0.5rem" }}>{v.title}</h3>
                  <p style={{ fontFamily: FONTS.sans, fontSize: "0.82rem", color: COLORS.textMuted, lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PAGE: SERVICES
// ═══════════════════════════════════════════════
function ServicesPage({ setPage }) {
  const [active, setActive] = useState(null);
  const services = [
    { icon: "⊛", name: "Chart Analysis", sub: "Nakshatra & KP Astrology", desc: "Deep dive into your birth chart using the precise KP (Krishnamurti Paddhati) system and Nakshatra analysis. We decode planetary positions, dashas, and yogas to give you actionable life guidance.", features: ["Birth Chart (Kundali) Reading","Nakshatra Analysis","KP System Predictions","Dasha & Antardasha","Marriage Timing","Career & Finance Forecast"] },
    { icon: "🏭", name: "Industrial Vastu", sub: "Factories, Warehouses & Plants", desc: "Optimise your industrial space for maximum productivity. Our non-demolition approach works with your existing layout to balance elemental energies.", features: ["Factory Layout Analysis","Production Unit Planning","Machinery Placement","Entry & Gate Direction","Energy Flow Correction","Site Visit Available"] },
    { icon: "📐", name: "Plot Vastu", sub: "Land & Site Selection", desc: "Before you invest in land, know its energy. We assess plot shape, direction, slope, and surrounding environment to ensure your investment brings prosperity.", features: ["Plot Shape Analysis","Direction Assessment","Surrounding Environment","Soil Energy Testing","Road & Water Analysis","Purchase Guidance"]},
    { icon: "🏠", name: "Residential Vastu", sub: "Homes, Flats & Apartments", desc: "Create a home that nurtures health, harmony, and happiness. From room placement to kitchen direction, we ensure every corner supports positive energy flow.", features: ["Room-wise Analysis","Kitchen & Bedroom Direction","Entrance & Main Door","Remedy Suggestions","No Demolition Required","Online & Offline Available"] },
    { icon: "✨", name: "Reiki Training", sub: "Energy Healing & Attunement", desc: "Learn the ancient Japanese art of energy healing. Our certified Reiki trainer offers Level 1, 2, and Master-level courses.", features: ["Reiki Level 1, 2 & Master","Chakra Healing","Distance Healing","Certification Provided","Small Batch Classes","Ongoing Support"] },
  ];
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "5rem 5% 3rem", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.8rem" }}>✦ Sacred Sciences</div>
          <h1 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: COLORS.white, marginBottom: "0.8rem" }}>Our Services</h1>
          <p style={{ fontFamily: FONTS.sans, fontSize: "0.9rem", color: COLORS.textMuted, maxWidth: 480, margin: "0 auto" }}>Every service is rooted in classical texts, delivered with honesty, and personalised for your unique situation.</p>
        </Reveal>
      </section>
      <section style={{ padding: "1rem 5% 5rem", maxWidth: 1100, margin: "0 auto" }}>
        {services.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.08}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem", alignItems: "start", padding: "2.5rem", marginBottom: "1.2rem", background: active === i ? "rgba(91,45,142,0.25)" : "rgba(91,45,142,0.1)", border: `1px solid ${active === i ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.15)"}`, borderRadius: "4px", cursor: "pointer", transition: "all 0.4s" }}
              className="service-card-grid"
              onClick={() => setActive(active === i ? null : i)}>
              <div>
                <div style={{ fontSize: "2.2rem", marginBottom: "0.7rem" }}>{s.icon}</div>
                <h2 style={{ fontFamily: FONTS.display, fontSize: "1.25rem", color: COLORS.cream, marginBottom: "0.3rem" }}>{s.name}</h2>
                <p style={{ fontFamily: FONTS.sans, fontSize: "0.75rem", color: COLORS.textMuted, marginBottom: "0.8rem" }}>{s.sub}</p>
                <div style={{ fontFamily: FONTS.display, fontSize: "1.1rem", color: COLORS.gold }}>{s.price}</div>
              </div>
              <div>
                <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.cream2, lineHeight: 1.85, marginBottom: "1.2rem" }}>{s.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", maxHeight: active === i ? "300px" : "0", overflow: "hidden", transition: "max-height 0.5s ease" }}>
                  {s.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: FONTS.sans, fontSize: "0.8rem", color: COLORS.text }}>
                      <span style={{ color: COLORS.gold, fontSize: "0.55rem" }}>✦</span>{f}
                    </div>
                  ))}
                </div>
                {active !== i && <div style={{ fontFamily: FONTS.sans, fontSize: "0.75rem", color: COLORS.gold, marginTop: "0.7rem" }}>Click to see features →</div>}
              </div>
            </div>
          </Reveal>
        ))}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button onClick={() => setPage("booking")} style={{ background: COLORS.gold, color: COLORS.purpleDeep, fontFamily: FONTS.sans, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, padding: "0.9rem 2.5rem", border: "none", cursor: "pointer", borderRadius: "2px" }}>
            📅 Book a Service →
          </button>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PAGE: GALLERY
// ═══════════════════════════════════════════════
function GalleryPage() {
  const items = [
    { cat: "Industrial", label: "Factory Layout Correction", desc: "Complete Vastu alignment for a 50,000 sq ft production unit in Ahmedabad" },
    { cat: "Residential", label: "Luxury Bungalow Project", desc: "End-to-end residential Vastu for a 4BHK home in Surat" },
    { cat: "Plot", label: "Commercial Plot Assessment", desc: "Pre-purchase energy analysis for a prime commercial plot" },
    { cat: "Industrial", label: "Warehouse Energy Mapping", desc: "Elemental energy mapping for a logistics warehouse" },
    { cat: "Residential", label: "Apartment Vastu Correction", desc: "Non-demolition Vastu remedies for a high-rise flat in Vadodara" },
    { cat: "Reiki", label: "Reiki Level 2 Batch", desc: "Group attunement and certification for 12 students" },
  ];
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Industrial", "Residential", "Plot", "Reiki"];
  const filtered = filter === "All" ? items : items.filter((i) => i.cat === filter);
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "5rem 5% 3rem", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.8rem" }}>✦ Our Work</div>
          <h1 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: COLORS.white, marginBottom: "2rem" }}>Project Gallery</h1>
          <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {cats.map((c) => (
              <button key={c} onClick={() => setFilter(c)} style={{ fontFamily: FONTS.sans, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.5rem 1.1rem", background: filter === c ? COLORS.gold : "transparent", color: filter === c ? COLORS.purpleDeep : COLORS.text, border: `1px solid ${filter === c ? COLORS.gold : "rgba(201,168,76,0.3)"}`, cursor: "pointer", borderRadius: "2px" }}>
                {c}
              </button>
            ))}
          </div>
        </Reveal>
      </section>
      <section style={{ padding: "0 5% 5rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
          {filtered.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div style={{ background: "rgba(91,45,142,0.2)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: 180, background: `linear-gradient(135deg, rgba(91,45,142,0.5), ${COLORS.purpleDeep})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <ZodiacWheel size={110} spinning={false}/>
                  <div style={{ position: "absolute", top: "0.8rem", right: "0.8rem", background: COLORS.gold, color: COLORS.purpleDeep, fontFamily: FONTS.sans, fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.2rem 0.7rem", borderRadius: "2px", fontWeight: 700 }}>{item.cat}</div>
                </div>
                <div style={{ padding: "1.3rem" }}>
                  <h3 style={{ fontFamily: FONTS.display, fontSize: "1rem", color: COLORS.cream, marginBottom: "0.4rem" }}>{item.label}</h3>
                  <p style={{ fontFamily: FONTS.sans, fontSize: "0.8rem", color: COLORS.textMuted, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PAGE: BLOG
// ═══════════════════════════════════════════════
function BlogPage() {
  const posts = [
    { cat: "Vastu", title: "5 Easy Vastu Tips for Your Kitchen", date: "March 2025", read: "4 min", desc: "The kitchen represents the fire element. Learn how direction and placement affect your family's health and prosperity." },
    { cat: "Astrology", title: "Understanding KP vs Vedic Astrology", date: "Feb 2025", read: "6 min", desc: "KP (Krishnamurti Paddhati) offers pin-point accuracy. Here's how it differs from traditional Parashari Jyotish." },
    { cat: "Vastu", title: "Industrial Vastu: Why Factories Fail", date: "Jan 2025", read: "5 min", desc: "Many industrial units face recurring problems. Discover how Vastu imbalances silently affect production and profits." },
    { cat: "Reiki", title: "What Happens During a Reiki Session?", date: "Dec 2024", read: "3 min", desc: "Demystifying Reiki — what to expect, how energy healing works, and why it complements Vastu beautifully." },
    { cat: "Astrology", title: "Your Nakshatra & Your Career Path", date: "Nov 2024", read: "5 min", desc: "Each of the 27 Nakshatras carries a distinct energy signature. Find out what yours says about your ideal profession." },
    { cat: "Vastu", title: "Vastu for Plots: 7 Things to Check Before Buying", date: "Oct 2024", read: "4 min", desc: "These 7 Vastu checks before buying land can save you from years of struggle." },
  ];
  const catColors = { Vastu: COLORS.purple, Astrology: COLORS.gold, Reiki: COLORS.purpleLight };
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "5rem 5% 3rem", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.8rem" }}>✦ Knowledge Centre</div>
          <h1 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: COLORS.white, marginBottom: "0.8rem" }}>Articles & Insights</h1>
          <p style={{ fontFamily: FONTS.sans, fontSize: "0.9rem", color: COLORS.textMuted, maxWidth: 480, margin: "0 auto" }}>Free knowledge from our experts — practical tips on Vastu, Astrology, and Energy Healing.</p>
        </Reveal>
      </section>
      <section style={{ padding: "1rem 5% 5rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div style={{ background: "rgba(91,45,142,0.12)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "4px", padding: "1.8rem", borderTop: `3px solid ${catColors[p.cat] || COLORS.purple}`, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                  <span style={{ background: "rgba(201,168,76,0.15)", color: COLORS.gold, fontFamily: FONTS.sans, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "2px" }}>{p.cat}</span>
                  <span style={{ fontFamily: FONTS.sans, fontSize: "0.7rem", color: COLORS.textMuted }}>{p.read} read</span>
                </div>
                <h3 style={{ fontFamily: FONTS.display, fontSize: "1.05rem", color: COLORS.cream, marginBottom: "0.6rem", lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontFamily: FONTS.sans, fontSize: "0.8rem", color: COLORS.textMuted, lineHeight: 1.7, marginBottom: "0.8rem" }}>{p.desc}</p>
                <div style={{ fontFamily: FONTS.sans, fontSize: "0.7rem", color: COLORS.textMuted }}>{p.date}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PAGE: ENQUIRY FORM
// ═══════════════════════════════════════════════
function EnquiryPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async () => {
    if (!form.name || !form.phone) return alert("Please fill Name and Phone.");
    setLoading(true);
    const res = await fetch("https://formspree.io/f/xykbvoqw", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, _subject: `New Enquiry from ${form.name}` }),
    });
    setLoading(false);
    if (res.ok) setSubmitted(true);
    else alert("Something went wrong. Please try again.");
  };
  const inputStyle = { background: "rgba(245,234,200,0.06)", border: "1px solid rgba(201,168,76,0.25)", color: COLORS.cream, fontFamily: FONTS.sans, fontSize: "0.9rem", padding: "0.85rem 1.1rem", width: "100%", outline: "none", borderRadius: "2px" };

  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "5rem 5% 3rem", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.8rem" }}>✦ Got Questions?</div>
          <h1 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: COLORS.white, marginBottom: "0.8rem" }}>Send an Enquiry</h1>
          <p style={{ fontFamily: FONTS.sans, fontSize: "0.9rem", color: COLORS.textMuted, maxWidth: 480, margin: "0 auto" }}>
            Have questions before booking? Send us your query and we'll get back to you within 24 hours.
          </p>
        </Reveal>
      </section>

      <section style={{ padding: "1rem 5% 5rem" }}>
        <div style={{ maxWidth: 650, margin: "0 auto" }}>
          {submitted ? (
            <Reveal>
              <div style={{ textAlign: "center", padding: "4rem 2rem", background: "rgba(91,45,142,0.2)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "8px" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💬</div>
                <h2 style={{ fontFamily: FONTS.display, fontSize: "2rem", color: COLORS.gold, marginBottom: "0.8rem" }}>Enquiry Sent!</h2>
                <p style={{ fontFamily: FONTS.sans, color: COLORS.cream2, lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  Thank you <strong>{form.name}</strong>! We'll reply on <strong>{form.phone}</strong> within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name:"", phone:"", email:"", city:"", service:"", message:"" }); }}
                  style={{ background: "transparent", color: COLORS.gold, border: `1px solid ${COLORS.gold}`, fontFamily: FONTS.sans, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.8rem 1.8rem", cursor: "pointer", borderRadius: "2px" }}>
                  Send Another Enquiry
                </button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div style={{ background: "rgba(91,45,142,0.12)", border: "1px solid rgba(201,168,76,0.2)", padding: "2.5rem", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", padding: "1rem", background: "rgba(201,168,76,0.08)", borderRadius: "4px", border: "1px solid rgba(201,168,76,0.15)" }}>
                  <div style={{ fontSize: "1.5rem" }}>💬</div>
                  <div>
                    <div style={{ fontFamily: FONTS.display, fontSize: "1rem", color: COLORS.cream }}>General Enquiry Form</div>
                    <div style={{ fontFamily: FONTS.sans, fontSize: "0.75rem", color: COLORS.textMuted }}>We'll answer your questions before you commit to booking</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-grid">
                  <input style={inputStyle} name="name" placeholder="Your Full Name *" value={form.name} onChange={handleChange}/>
                  <input style={inputStyle} name="phone" placeholder="Phone / WhatsApp *" value={form.phone} onChange={handleChange}/>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-grid">
                  <input style={inputStyle} name="email" placeholder="Email Address" value={form.email} onChange={handleChange}/>
                  <input style={inputStyle} name="city" placeholder="Your City" value={form.city} onChange={handleChange}/>
                </div>
                <select style={{ ...inputStyle, marginBottom: "1rem" }} name="service" value={form.service} onChange={handleChange}>
                  <option value="">Which service are you enquiring about?</option>
                  <option>Chart Analysis (Nakshatra & KP)</option>
                  <option>Industrial Vastu</option>
                  <option>Plot Vastu Guidance</option>
                  <option>Residential Vastu</option>
                  <option>Reiki Training</option>
                  <option>General Question</option>
                </select>
                <textarea style={{ ...inputStyle, marginBottom: "1.5rem", resize: "vertical", minHeight: 110 }}
                  name="message" placeholder="Write your question or concern here..." value={form.message} onChange={handleChange}/>
                <button onClick={handleSubmit} disabled={loading}
                  style={{ background: loading ? COLORS.textMuted : COLORS.purpleLight, color: COLORS.white, fontFamily: FONTS.sans, fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, padding: "1rem", width: "100%", border: "none", cursor: loading ? "not-allowed" : "pointer", borderRadius: "2px" }}>
                  {loading ? "Sending..." : "💬 Send Enquiry"}
                </button>
                <p style={{ fontFamily: FONTS.sans, fontSize: "0.72rem", color: COLORS.textMuted, textAlign: "center", marginTop: "1rem" }}>
                  Or call directly: <a href="tel:+91 9173878471" style={{ color: COLORS.gold, textDecoration: "none", fontWeight: 700 }}>+91 9173878471</a>
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PAGE: BOOKING FORM
// ═══════════════════════════════════════════════
function BookingPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", service: "", mode: "", date: "", time: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.service) return alert("Please fill Name, Phone and Service.");
    setLoading(true);
    const res = await fetch("https://formspree.io/f/mwvwjljy", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, _subject: `New Booking from ${form.name} - ${form.service}` }),
    });
    setLoading(false);
    if (res.ok) setSubmitted(true);
    else alert("Something went wrong. Please try again.");
  };
  const inputStyle = { background: "rgba(245,234,200,0.06)", border: "1px solid rgba(201,168,76,0.25)", color: COLORS.cream, fontFamily: FONTS.sans, fontSize: "0.9rem", padding: "0.85rem 1.1rem", width: "100%", outline: "none", borderRadius: "2px" };

  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "5rem 5% 3rem", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.8rem" }}>✦ Ready to Begin?</div>
          <h1 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: COLORS.white, marginBottom: "0.8rem" }}>Book Appointment</h1>
          <p style={{ fontFamily: FONTS.sans, fontSize: "0.9rem", color: COLORS.textMuted, maxWidth: 480, margin: "0 auto" }}>
            Confirm your consultation slot. We will call you to finalize the appointment timing.
          </p>
        </Reveal>
      </section>

      <section style={{ padding: "1rem 5% 5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "2.5rem", alignItems: "start" }} className="booking-layout">
          <Reveal>
            <div>
              <a href="tel:+91 9173878471" style={{ textDecoration: "none" }}>
                <div style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleDark})`, border: `2px solid ${COLORS.gold}`, borderRadius: "8px", padding: "1.8rem", textAlign: "center", marginBottom: "1.2rem", cursor: "pointer" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📞</div>
                  <div style={{ fontFamily: FONTS.display, fontSize: "1rem", color: COLORS.gold, letterSpacing: "0.05em", marginBottom: "0.3rem" }}>Call to Book</div>
                  <div style={{ fontFamily: FONTS.sans, fontSize: "1.2rem", color: COLORS.white, fontWeight: 700, letterSpacing: "0.05em" }}>+91 9173878471</div>
                  <div style={{ fontFamily: FONTS.sans, fontSize: "0.72rem", color: COLORS.cream2, marginTop: "0.5rem" }}>Tap to call directly</div>
                </div>
              </a>
              <a href="https://wa.me/+91 9173878471?text=Hello%2C%20I%20want%20to%20book%20a%20Vastu%20consultation." target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.35)", borderRadius: "8px", padding: "1.5rem", textAlign: "center", marginBottom: "1.2rem", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.7rem" }}>
                    <span style={{ color: "#25D366" }}>{SocialIcons.whatsapp}</span>
                    <div>
                      <div style={{ fontFamily: FONTS.sans, fontSize: "0.85rem", color: "#25D366", fontWeight: 700 }}>WhatsApp Us</div>
                      <div style={{ fontFamily: FONTS.sans, fontSize: "0.72rem", color: COLORS.textMuted }}>Quick booking via chat</div>
                    </div>
                  </div>
                </div>
              </a>
              <div style={{ background: "rgba(91,45,142,0.15)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "6px", padding: "1.2rem" }}>
                <div style={{ fontFamily: FONTS.sans, fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.8rem" }}>Hours</div>
                {[["Mon – Sat", "9 AM – 7 PM"], ["Sunday", "By Appointment"], ["Online", "Available"]].map(([d, t]) => (
                  <div key={d} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: FONTS.sans, fontSize: "0.8rem", color: COLORS.textMuted }}>{d}</span>
                    <span style={{ fontFamily: FONTS.sans, fontSize: "0.8rem", color: COLORS.cream }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 2rem", background: "rgba(91,45,142,0.2)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "8px" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
                <h2 style={{ fontFamily: FONTS.display, fontSize: "1.8rem", color: COLORS.gold, marginBottom: "0.8rem" }}>Booking Confirmed!</h2>
                <p style={{ fontFamily: FONTS.sans, color: COLORS.cream2, lineHeight: 1.7, marginBottom: "0.5rem" }}>
                  Thank you <strong>{form.name}</strong>!
                </p>
                <p style={{ fontFamily: FONTS.sans, color: COLORS.textMuted, fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  We will call you on <strong style={{ color: COLORS.gold }}>{form.phone}</strong> within 24 hours to confirm your appointment for <strong style={{ color: COLORS.cream }}>{form.service}</strong>.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name:"", phone:"", email:"", city:"", service:"", mode:"", date:"", time:"", message:"" }); }}
                  style={{ background: "transparent", color: COLORS.gold, border: `1px solid ${COLORS.gold}`, fontFamily: FONTS.sans, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.8rem 1.8rem", cursor: "pointer", borderRadius: "2px" }}>
                  Book Another
                </button>
              </div>
            ) : (
              <div style={{ background: "rgba(91,45,142,0.12)", border: "1px solid rgba(201,168,76,0.2)", padding: "2.2rem", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", padding: "1rem", background: "rgba(201,168,76,0.1)", borderRadius: "4px", border: "1px solid rgba(201,168,76,0.2)" }}>
                  <div style={{ fontSize: "1.5rem" }}>📅</div>
                  <div>
                    <div style={{ fontFamily: FONTS.display, fontSize: "1rem", color: COLORS.gold }}>Appointment Booking</div>
                    <div style={{ fontFamily: FONTS.sans, fontSize: "0.72rem", color: COLORS.textMuted }}>Fill form & we'll confirm your slot by call</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-grid">
                  <input style={inputStyle} name="name" placeholder="Full Name *" value={form.name} onChange={handleChange}/>
                  <input style={inputStyle} name="phone" placeholder="Phone / WhatsApp *" value={form.phone} onChange={handleChange}/>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-grid">
                  <input style={inputStyle} name="email" placeholder="Email Address" value={form.email} onChange={handleChange}/>
                  <input style={inputStyle} name="city" placeholder="Your City" value={form.city} onChange={handleChange}/>
                </div>
                <select style={{ ...inputStyle, marginBottom: "1rem" }} name="service" value={form.service} onChange={handleChange}>
                  <option value="">Select Service *</option>
                  <option>Chart Analysis (Nakshatra & KP)</option>
                  <option>Industrial Vastu</option>
                  <option>Plot Vastu Guidance</option>
                  <option>Residential Vastu</option>
                  <option>Reiki Training</option>
                </select>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-grid">
                  <select style={inputStyle} name="mode" value={form.mode} onChange={handleChange}>
                    <option value="">Consultation Mode</option>
                    <option>In-Person Visit</option>
                    <option>Phone Call</option>
                    <option>Video Call</option>
                    <option>WhatsApp Call</option>
                  </select>
                  <input style={inputStyle} type="date" name="date" placeholder="Preferred Date" value={form.date} onChange={handleChange}/>
                </div>
                <select style={{ ...inputStyle, marginBottom: "1rem" }} name="time" value={form.time} onChange={handleChange}>
                  <option value="">Preferred Time Slot</option>
                  <option>Morning (9 AM – 12 PM)</option>
                  <option>Afternoon (12 PM – 3 PM)</option>
                  <option>Evening (3 PM – 7 PM)</option>
                </select>
                <textarea style={{ ...inputStyle, marginBottom: "1.5rem", resize: "vertical", minHeight: 80 }}
                  name="message" placeholder="Any specific concerns or requirements..." value={form.message} onChange={handleChange}/>
                <button onClick={handleSubmit} disabled={loading}
                  style={{ background: loading ? COLORS.textMuted : COLORS.gold, color: COLORS.purpleDeep, fontFamily: FONTS.sans, fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, padding: "1rem", width: "100%", border: "none", cursor: loading ? "not-allowed" : "pointer", borderRadius: "2px" }}>
                  {loading ? "Booking..." : "📅 Confirm Booking"}
                </button>
                <p style={{ fontFamily: FONTS.sans, fontSize: "0.72rem", color: COLORS.textMuted, textAlign: "center", marginTop: "1rem" }}>
                  We will call you on your number to confirm the appointment
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PAGE: CONTACT
// ═══════════════════════════════════════════════
function ContactPage() {
  const socials = [
    { name: "Instagram", icon: SocialIcons.instagram, url: "https://www.instagram.com/tatva_vastu_consultancy", color: "#E1306C", handle: "@tatva_vastu_consultancy" },
    { name: "Facebook", icon: SocialIcons.facebook, url: "https://www.facebook.com/tatvaVastuConsultancy", color: "#1877F2", handle: "Tatva Vastu Consultancy" },
    { name: "YouTube", icon: SocialIcons.youtube, url: "https://www.youtube.com/@tatvaVastu", color: "#FF0000", handle: "@tatvaVastu" },
    { name: "WhatsApp", icon: SocialIcons.whatsapp, url: "https://wa.me/+91 9173878471", color: "#25D366", handle: "+91 9173878471" },
  ];
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "5rem 5% 3rem", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.8rem" }}>✦ Find Us</div>
          <h1 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: COLORS.white, marginBottom: "0.8rem" }}>Contact Us</h1>
          <p style={{ fontFamily: FONTS.sans, fontSize: "0.9rem", color: COLORS.textMuted, maxWidth: 480, margin: "0 auto" }}>Reach us through any of these channels — we're always available to guide you.</p>
        </Reveal>
      </section>

      <section style={{ padding: "1rem 5% 5rem", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", marginBottom: "3rem" }}>
          {[
            { icon: "📞", label: "Phone / WhatsApp", val: "+91 9173878471", link: "tel:+91 9173878471" },
            { icon: "🕐", label: "Working Hours", val: "Mon–Sat: 9 AM – 7 PM", link: null },
            { icon: "📍", label: "Location", val: "Ahmedabad, Gujarat", link: null },
            { icon: "🌐", label: "Online Sessions", val: "Available Worldwide", link: null },
          ].map((c) => (
            <Reveal key={c.label}>
              <div style={{ background: "rgba(91,45,142,0.15)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "6px", padding: "1.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.7rem" }}>{c.icon}</div>
                <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.textMuted, marginBottom: "0.4rem" }}>{c.label}</div>
                {c.link ? (
                  <a href={c.link} style={{ fontFamily: FONTS.sans, fontSize: "0.95rem", color: COLORS.gold, fontWeight: 700, textDecoration: "none" }}>{c.val}</a>
                ) : (
                  <div style={{ fontFamily: FONTS.sans, fontSize: "0.9rem", color: COLORS.cream }}>{c.val}</div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ fontFamily: FONTS.sans, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.7rem" }}>✦ Follow & Connect</div>
              <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: COLORS.white }}>Find Us On Social Media</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.2rem" }}>
              {socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{ background: "rgba(91,45,142,0.15)", border: `1px solid rgba(201,168,76,0.15)`, borderRadius: "8px", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", transition: "all 0.3s", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.background = `${s.color}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)"; e.currentTarget.style.background = "rgba(91,45,142,0.15)"; }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${s.color}25`, border: `1px solid ${s.color}50`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>
                      {s.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: FONTS.sans, fontSize: "0.82rem", color: COLORS.cream, fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontFamily: FONTS.sans, fontSize: "0.72rem", color: COLORS.textMuted }}>{s.handle}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ textAlign: "center", background: "rgba(91,45,142,0.12)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "8px", padding: "2.5rem" }}>
            <ZodiacWheel size={120} spinning={true}/>
            <p style={{ fontFamily: FONTS.body, fontStyle: "italic", fontSize: "1.1rem", color: COLORS.cream2, marginTop: "1rem", marginBottom: "2rem", lineHeight: 1.7 }}>
              "Every space has a story. Let us help you rewrite yours."
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:+91 9173878471" style={{ background: COLORS.gold, color: COLORS.purpleDeep, fontFamily: FONTS.sans, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, padding: "0.9rem 1.8rem", borderRadius: "2px", textDecoration: "none" }}>📞 Call Now</a>
              <a href="https://wa.me/+91 9173878471" target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", fontFamily: FONTS.sans, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, padding: "0.9rem 1.8rem", borderRadius: "2px", textDecoration: "none" }}>WhatsApp</a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

// ─── Footer ───
function Footer({ setPage }) {
  const socials = [
    { name: "Instagram", icon: SocialIcons.instagram, url: "https://www.instagram.com/tatva_vastu_consultancy", color: "#E1306C" },
    { name: "Facebook", icon: SocialIcons.facebook, url: "https://www.facebook.com/tatvaVastuConsultancy", color: "#1877F2" },
    { name: "YouTube", icon: SocialIcons.youtube, url: "https://www.youtube.com/@tatvaVastu", color: "#FF0000" },
    { name: "WhatsApp", icon: SocialIcons.whatsapp, url: "https://wa.me/+91 9173878471", color: "#25D366" },
  ];
  return (
    <footer style={{ background: COLORS.dark2, borderTop: "1px solid rgba(201,168,76,0.15)", padding: "4rem 5% 2rem", position: "relative", zIndex: 1 }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2.5rem", maxWidth: 1100, margin: "0 auto 2.5rem" }} className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.7rem" }}>
            <img src={TATVA_LOGO} alt="Tatva Vastu" style={{ width: 32, height: 32, objectFit: "contain" }}/>
            <span style={{ fontFamily: FONTS.display, fontSize: "1rem", color: COLORS.gold, letterSpacing: "0.1em" }}>TATVA VASTU CONSULTANCY</span>
          </div>
          <p style={{ fontFamily: FONTS.sans, fontSize: "0.82rem", color: COLORS.textMuted, lineHeight: 1.8, maxWidth: 230, marginBottom: "1.2rem" }}>
            Authentic Vastu Shastra, KP Astrology & Reiki services since 2010. Honest guidance, real results.
          </p>
          <div style={{ fontFamily: FONTS.sans, fontSize: "0.82rem", color: COLORS.cream, marginBottom: "0.4rem" }}>
            <a href="tel:+91 9173878471" style={{ color: COLORS.gold, textDecoration: "none", fontWeight: 700 }}>📞 +91 9173878471</a>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <div style={{ fontFamily: FONTS.sans, fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.textMuted, marginBottom: "0.7rem" }}>Follow Us</div>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                  style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, transition: "all 0.3s", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = s.color; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = COLORS.textMuted; e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        {[
          ["Quick Links", [["home","Home"],["about","About Us"],["services","Services"],["gallery","Gallery"],["blog","Articles"]]],
          ["Services", [["services","Nakshatra & KP"],["services","Industrial Vastu"],["services","Plot Vastu"],["services","Residential Vastu"],["services","Reiki Training"]]],
          ["Connect", [["booking","Book Appointment"],["enquiry","Send Enquiry"],["contact","Contact Us"],["contact","WhatsApp Us"]]],
        ].map(([title, links]) => (
          <div key={title}>
            <div style={{ fontFamily: FONTS.sans, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "1rem" }}>{title}</div>
            <ul style={{ listStyle: "none" }}>
              {links.map(([pg, label]) => (
                <li key={label} style={{ marginBottom: "0.5rem" }}>
                  <button onClick={() => setPage(pg)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONTS.sans, fontSize: "0.82rem", color: COLORS.textMuted, padding: 0, textAlign: "left" }}>{label}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1100, margin: "0 auto", flexWrap: "wrap", gap: "0.8rem" }}>
        <p style={{ fontFamily: FONTS.sans, fontSize: "0.75rem", color: COLORS.textMuted }}>© 2025 Tatva Vastu Consultancy. All rights reserved.</p>
        <p style={{ fontFamily: FONTS.sans, fontSize: "0.75rem", color: COLORS.textMuted }}>Ahmedabad, Gujarat · Since 2010</p>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const pageMap = {
    home: <HomePage setPage={setPage} />,
    about: <AboutPage />,
    services: <ServicesPage setPage={setPage} />,
    gallery: <GalleryPage />,
    blog: <BlogPage />,
    enquiry: <EnquiryPage />,
    booking: <BookingPage />,
    contact: <ContactPage />,
  };

  return (
<div style={{ background: COLORS.dark, minHeight: "100vh", color: COLORS.text, position: "relative", width: "100%", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { overflow-x: hidden; }

        @keyframes twinkle { from { opacity:0.1; transform:scale(0.8); } to { opacity:0.9; transform:scale(1.2); } }
        @keyframes spinSlow { to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes floatUp { 0% { transform:translateY(0) scale(1); opacity:0.4; } 100% { transform:translateY(-100vh) scale(0.3); opacity:0; } }

        select option { background:#1E0A40; color:#E8D5FF; }
        input::placeholder, textarea::placeholder { color:#A78DC0; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:#0D0820; }
        ::-webkit-scrollbar-thumb { background:#5B2D8E; border-radius:3px; }

        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .responsive-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .service-card-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .booking-layout { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 1.5rem !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          section { padding-left: 4% !important; padding-right: 4% !important; }
        }

        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <StarField />
      <Nav page={page} setPage={setPage} />
      <main style={{ position: "relative", zIndex: 1 }}>
        {pageMap[page] || pageMap.home}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}