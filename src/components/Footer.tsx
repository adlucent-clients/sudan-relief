"use client";
export default function Footer() {
  return (
    <footer
      style={{
        background: "#080503",
        borderTop: "1px solid rgba(212,167,86,0.1)",
        padding: "52px 32px 36px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "40px",
            alignItems: "start",
            marginBottom: "48px",
            flexWrap: "wrap",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--sudan-green)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "var(--cream)",
                  letterSpacing: "0.01em",
                }}
              >
                Sudan Relief
              </span>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "var(--ash)",
                maxWidth: "380px",
                margin: 0,
              }}
            >
              A MIST 2026 Humanitarian Services Campaign raising funds for
              the people of Sudan. Every donation — no matter how small —
              makes a difference.
            </p>
          </div>

          {/* Quick links */}
          <nav>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--sand)",
                marginBottom: "14px",
              }}
            >
              Quick Links
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "The Crisis", href: "#crisis" },
                { label: "Donate", href: "#donate" },
                { label: "Voices from Sudan", href: "#stories" },
                { label: "Organizations", href: "#resources" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="link-line"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 300,
                    color: "var(--ash)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--smoke)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--ash)")
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Sudan flag colors bar */}
        <div
          style={{
            height: "2px",
            background: "linear-gradient(90deg, var(--sudan-red), var(--sudan-red) 33%, rgba(255,255,255,0.3) 33%, rgba(255,255,255,0.3) 66%, var(--sudan-green) 66%)",
            borderRadius: "1px",
            marginBottom: "28px",
            opacity: 0.5,
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 300,
              color: "var(--ash)",
              margin: 0,
              opacity: 0.7,
            }}
          >
            © 2026 MIST Humanitarian Services · Sudan Relief Campaign
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 300,
              color: "var(--ash)",
              margin: 0,
              opacity: 0.6,
            }}
          >
            Stand with Sudan 🇸🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
