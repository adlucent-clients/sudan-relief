"use client";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "The Crisis", href: "#crisis" },
    { label: "Donate", href: "#donate" },
    { label: "Stories", href: "#stories" },
    { label: "Learn More", href: "#resources" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(12,8,4,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(212,167,86,0.15)"
          : "1px solid transparent",
        padding: scrolled ? "14px 0" : "24px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 32px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: "22px",
            letterSpacing: "0.02em",
            color: "var(--cream)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--sudan-green)",
              boxShadow: "0 0 8px rgba(0,122,61,0.8)",
              flexShrink: 0,
            }}
          />
          <span>Sudan Relief</span>
          <span
            style={{
              fontSize: "10px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              color: "var(--sand)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.75,
              background: "rgba(212,167,86,0.1)",
              border: "1px solid rgba(212,167,86,0.2)",
              borderRadius: "3px",
              padding: "2px 7px",
            }}
          >
            MIST 2026
          </span>
        </a>

        {/* Desktop nav */}
        <ul
          style={{
            display: "flex",
            gap: "36px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="hidden-mobile"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-line"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--smoke)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--sand)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--smoke)")
                }
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://www.launchgood.com/v4/campaign/mist_carolina_cato_middle?src=1710041"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden-mobile btn-glow"
          style={{
            background: "var(--sand)",
            color: "var(--ink)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "10px 22px",
            borderRadius: "2px",
            textDecoration: "none",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--sand-light)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--sand)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          Donate Now
        </a>

        {/* Mobile menu toggle */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "none",
          }}
          aria-label="Toggle menu"
        >
          <div
            style={{
              width: "24px",
              height: "1px",
              background: "var(--cream)",
              marginBottom: "6px",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <div
            style={{
              width: "24px",
              height: "1px",
              background: "var(--cream)",
              transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <div
            style={{
              width: "24px",
              height: "1px",
              background: "var(--cream)",
              marginTop: "6px",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(12,8,4,0.98)",
            borderTop: "1px solid rgba(212,167,86,0.15)",
            padding: "20px 32px 28px",
          }}
          className="show-mobile"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--smoke)",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.launchgood.com/v4/campaign/mist_carolina_cato_middle?src=1710041"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              marginTop: "20px",
              background: "var(--sand)",
              color: "var(--ink)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "14px 24px",
              borderRadius: "2px",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Donate Now
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
