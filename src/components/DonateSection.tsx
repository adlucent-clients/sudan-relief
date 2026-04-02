"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Editorial L-bracket corner accent
function CornerAccent({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const s = 18;
  const paths: Record<string, string> = {
    tl: `M ${s} 0 L 0 0 L 0 ${s}`,
    tr: `M 0 0 L ${s} 0 L ${s} ${s}`,
    bl: `M 0 0 L 0 ${s} L ${s} ${s}`,
    br: `M 0 ${s} L ${s} ${s} L ${s} 0`,
  };
  const posStyle: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    ...(position.includes("t") ? { top: "16px" } : { bottom: "16px" }),
    ...(position.includes("l") ? { left: "16px" } : { right: "16px" }),
  };
  return (
    <svg width={s + 1} height={s + 1} style={posStyle} viewBox={`0 0 ${s} ${s}`}>
      <path d={paths[position]} stroke="rgba(212,167,86,0.28)" strokeWidth="1" fill="none" />
    </svg>
  );
}

// Small diamond ornament
function Diamond({ opacity = 0.6 }: { opacity?: number }) {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" style={{ flexShrink: 0 }}>
      <rect x="0" y="0" width="6" height="6" transform="rotate(45 3 3)" fill={`rgba(212,167,86,${opacity})`} />
    </svg>
  );
}

const LAUNCHGOOD_URL = "https://www.launchgood.com/v4/campaign/mist_carolina_cato_middle?src=1710041";

function QRPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: "28px" }}>
      {/* Gold divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(212,167,86,0.15), transparent)",
        marginBottom: "20px",
      }} />
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: open ? "rgba(212,167,86,0.1)" : "transparent",
          border: "1px solid rgba(212,167,86,0.18)",
          color: open ? "var(--sand)" : "var(--ash)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "10px 18px",
          borderRadius: "2px",
          cursor: "pointer",
          transition: "all 0.25s",
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        {open ? "Hide QR Code" : "Show QR Code"}
      </button>
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "240px" : "0",
        transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{
          marginTop: "16px",
          padding: "24px",
          background: "rgba(212,167,86,0.04)",
          border: "1px solid rgba(212,167,86,0.13)",
          borderRadius: "3px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <div style={{
            padding: "10px",
            background: "#F7F0E3",
            borderRadius: "2px",
            lineHeight: 0,
            flexShrink: 0,
          }}>
            <Image
              src="/qr-launchgood.png"
              alt="LaunchGood QR code"
              width={110}
              height={110}
              style={{ display: "block", borderRadius: "1px" }}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "15px",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--sand)",
              marginBottom: "6px",
            }}>
              Scan to donate instantly
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 300,
              color: "var(--ash)",
              lineHeight: 1.5,
            }}>
              Point your phone&apos;s camera at the code<br />to open the campaign on LaunchGood.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DonateSection() {
  return (
    <section
      id="donate"
      style={{
        background: "linear-gradient(180deg, #0C0804 0%, #0F0B06 50%, #0C0804 100%)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top rule */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, var(--sand), transparent)",
        opacity: 0.3,
      }} />

      {/* Vertical flanking lines */}
      <div style={{
        position: "absolute",
        top: "8%",
        left: "5%",
        width: "1px",
        height: "65%",
        background: "linear-gradient(180deg, transparent, rgba(212,167,86,0.08), transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "8%",
        right: "5%",
        width: "1px",
        height: "65%",
        background: "linear-gradient(180deg, transparent, rgba(212,167,86,0.08), transparent)",
        pointerEvents: "none",
      }} />

      {/* Radial background glow */}
      <div style={{
        position: "absolute",
        top: "18%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "900px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(212,167,86,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        {/* Section header */}
        <RevealSection>
          <div style={{ marginBottom: "72px", textAlign: "center" }}>
            {/* Ornamental eyebrow */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "28px",
            }}>
              <span style={{
                display: "inline-block",
                width: "56px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(212,167,86,0.5))",
              }} />
              <Diamond opacity={0.55} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--sand)",
              }}>
                How to Help
              </span>
              <Diamond opacity={0.55} />
              <span style={{
                display: "inline-block",
                width: "56px",
                height: "1px",
                background: "linear-gradient(270deg, transparent, rgba(212,167,86,0.5))",
              }} />
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(42px, 6vw, 76px)",
              fontWeight: 600,
              lineHeight: 1.0,
              color: "var(--cream)",
              marginBottom: "20px",
            }}>
              Every Donation{" "}
              <span style={{ fontStyle: "italic", color: "var(--sand)" }}>
                Saves Lives
              </span>
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "17px",
              fontWeight: 300,
              lineHeight: 1.65,
              color: "var(--smoke)",
              maxWidth: "540px",
              margin: "0 auto",
            }}>
              100% of donations go directly to humanitarian relief efforts in Sudan.
            </p>
          </div>
        </RevealSection>

        {/* Primary LaunchGood CTA card */}
        <RevealSection delay={100}>
          <div style={{ maxWidth: "720px", margin: "0 auto 56px", position: "relative" }}>
            <div
              className="card-lift"
              style={{
                background: "linear-gradient(160deg, rgba(20,14,8,0.98) 0%, rgba(13,9,4,0.99) 100%)",
                border: "1px solid rgba(212,167,86,0.22)",
                borderRadius: "4px",
                padding: "clamp(40px, 6vw, 72px) clamp(32px, 6vw, 64px)",
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              <CornerAccent position="tl" />
              <CornerAccent position="tr" />
              <CornerAccent position="bl" />
              <CornerAccent position="br" />

              {/* Top glow */}
              <div style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "360px",
                height: "160px",
                background: "radial-gradient(ellipse at top, rgba(212,167,86,0.09) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              {/* LaunchGood badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(212,167,86,0.07)",
                border: "1px solid rgba(212,167,86,0.22)",
                borderRadius: "100px",
                padding: "5px 16px",
                marginBottom: "32px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--sand)",
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                Secure — via LaunchGood
              </div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 600,
                color: "var(--cream)",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}>
                MIST Carolina Cato Middle
              </div>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 300,
                color: "var(--smoke)",
                lineHeight: 1.65,
                maxWidth: "460px",
                margin: "0 auto 44px",
              }}>
                Donate securely through LaunchGood — the trusted Muslim crowdfunding platform.
                Every dollar goes to verified humanitarian aid for the people of Sudan.
              </p>

              {/* Gold divider */}
              <div style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(212,167,86,0.25), transparent)",
                marginBottom: "44px",
              }} />

              {/* Big CTA button */}
              <a
                href={LAUNCHGOOD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  background: "var(--sand)",
                  color: "var(--ink)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "20px 52px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "all 0.25s",
                  minWidth: "280px",
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <div style={{
                marginTop: "20px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 300,
                color: "var(--ash)",
                letterSpacing: "0.04em",
              }}>
                launchgood.com &nbsp;·&nbsp; Secure &amp; trusted
              </div>

              {/* QR code section */}
              <QRPanel />
            </div>
          </div>
        </RevealSection>

        {/* Trust statement */}
        <RevealSection delay={200}>
          <div style={{
            position: "relative",
            padding: "32px 40px",
            display: "flex",
            alignItems: "flex-start",
            gap: "24px",
            flexWrap: "wrap",
          }}>
            {/* Left gold accent bar */}
            <div style={{
              position: "absolute",
              left: 0,
              top: "15%",
              bottom: "15%",
              width: "1px",
              background: "linear-gradient(180deg, transparent, rgba(212,167,86,0.3), transparent)",
            }} />

            <div style={{
              width: "38px",
              height: "38px",
              flexShrink: 0,
              border: "1px solid rgba(212,167,86,0.2)",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--sand)",
              marginTop: "2px",
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: "240px" }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                color: "var(--sand)",
                marginBottom: "8px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}>
                100% Transparent
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--smoke)",
                lineHeight: 1.65,
                margin: 0,
              }}>
                This campaign is organized by MIST 2026 Humanitarian Services.
                All collected funds are directed to verified humanitarian organizations
                providing direct aid in Sudan. Questions? Contact your local MIST chapter.
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
