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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={copy}
      style={{
        background: copied ? "rgba(212,167,86,0.18)" : "rgba(212,167,86,0.07)",
        border: `1px solid ${copied ? "rgba(212,167,86,0.5)" : "rgba(212,167,86,0.18)"}`,
        color: copied ? "var(--sand-light)" : "var(--sand)",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "6px 14px",
        borderRadius: "2px",
        cursor: "pointer",
        transition: "all 0.25s",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {copied ? (
        <>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
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

type DonationMethod = {
  id: string;
  name: string;
  badge: string;
  qrImage: string;
  primaryLabel: string;
  primaryValue: string;
  secondaryLabel: string;
  secondaryValue: string;
  instructions: string[];
  icon: React.ReactNode;
  link?: string;
  note?: string;
};

const donationMethods: DonationMethod[] = [
  {
    id: "zelle",
    name: "Zelle",
    badge: "Via Bank",
    qrImage: "/qr-zelle.png",
    primaryLabel: "Phone Number",
    primaryValue: "+1 (704) 808-0245",
    secondaryLabel: "Recipient",
    secondaryValue: "Jawad Saymeh",
    instructions: [
      "Open your bank's mobile app",
      "Navigate to Zelle transfers",
      "Send to the phone number below",
      "Include 'Sudan Relief' in memo",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    note: "Available in most major US banks — Chase, Bank of America, Wells Fargo, and more",
  },
  {
    id: "cashapp",
    name: "Cash App",
    badge: "Via App",
    qrImage: "/qr-cashapp.jpeg",
    primaryLabel: "Cashtag",
    primaryValue: "$pfsulay1",
    secondaryLabel: "Platform",
    secondaryValue: "Cash App",
    instructions: [
      "Download or open Cash App",
      "Tap the $ send button",
      "Search for the cashtag below",
      "Enter any amount and send",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    link: "https://cash.app/$pfsulay1",
  },
];

function DonationCard({ method, index }: { method: DonationMethod; index: number }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <RevealSection delay={index * 130}>
      <div
        className="card-lift"
        style={{
          background: "linear-gradient(160deg, rgba(20,14,8,0.98) 0%, rgba(13,9,4,0.99) 100%)",
          border: "1px solid rgba(212,167,86,0.14)",
          borderRadius: "4px",
          padding: "44px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Editorial corner brackets */}
        <CornerAccent position="tl" />
        <CornerAccent position="tr" />
        <CornerAccent position="bl" />
        <CornerAccent position="br" />

        {/* Top center glow */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "240px",
          height: "120px",
          background: "radial-gradient(ellipse at top, rgba(212,167,86,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Badge */}
        <div style={{
          position: "absolute",
          top: "20px",
          right: "38px",
          background: "rgba(212,167,86,0.07)",
          border: "1px solid rgba(212,167,86,0.18)",
          borderRadius: "100px",
          padding: "3px 12px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ash)",
        }}>
          {method.badge}
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "3px",
            background: "rgba(212,167,86,0.07)",
            border: "1px solid rgba(212,167,86,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "var(--sand)",
          }}>
            {method.icon}
          </div>
          <div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--ash)",
              marginBottom: "3px",
            }}>
              Donate via
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "30px",
              fontWeight: 600,
              color: "var(--cream)",
              lineHeight: 1,
            }}>
              {method.name}
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, rgba(212,167,86,0.3), rgba(212,167,86,0.05) 60%, transparent)",
          marginBottom: "28px",
        }} />

        {/* Primary value */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ash)",
            marginBottom: "10px",
          }}>
            {method.primaryLabel}
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "34px",
              fontWeight: 600,
              color: "var(--sand)",
              letterSpacing: "0.01em",
              lineHeight: 1,
            }}>
              {method.primaryValue}
            </span>
            <CopyButton text={method.primaryValue} />
          </div>
        </div>

        {/* Recipient / secondary info */}
        <div style={{
          background: "rgba(212,167,86,0.04)",
          border: "1px solid rgba(212,167,86,0.09)",
          borderRadius: "2px",
          padding: "10px 16px",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            color: "var(--ash)",
          }}>
            {method.secondaryLabel}
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "var(--smoke)",
            letterSpacing: "0.02em",
          }}>
            {method.secondaryValue}
          </span>
        </div>

        {/* Instructions */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--sand)",
            }}>
              Steps
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(212,167,86,0.12)" }} />
          </div>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {method.instructions.map((step, j) => (
              <li key={j} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: j < method.instructions.length - 1 ? "11px" : 0,
              }}>
                <span style={{
                  flexShrink: 0,
                  width: "22px",
                  height: "22px",
                  border: "1px solid rgba(212,167,86,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--sand)",
                  marginTop: "1px",
                }}>
                  {j + 1}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  lineHeight: 1.55,
                  color: "var(--smoke)",
                }}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Gold divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(212,167,86,0.12), transparent)",
          marginBottom: "20px",
        }} />

        {/* Action row */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          {/* QR toggle */}
          <button
            onClick={() => setShowQR(!showQR)}
            style={{
              background: showQR ? "rgba(212,167,86,0.1)" : "transparent",
              border: "1px solid rgba(212,167,86,0.18)",
              color: showQR ? "var(--sand)" : "var(--ash)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "10px 16px",
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
            {showQR ? "Hide QR" : "Show QR"}
          </button>

          {/* Cash App link or Zelle note */}
          {method.link ? (
            <a
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                minWidth: "140px",
                background: "rgba(212,167,86,0.07)",
                border: "1px solid rgba(212,167,86,0.18)",
                color: "var(--sand)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "10px 16px",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "all 0.25s",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(212,167,86,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(212,167,86,0.07)";
              }}
            >
              Open Cash App
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ) : method.note ? (
            <p style={{
              flex: 1,
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 300,
              color: "var(--ash)",
              lineHeight: 1.45,
            }}>
              {method.note}
            </p>
          ) : null}
        </div>

        {/* QR panel — collapsible */}
        <div style={{
          overflow: "hidden",
          maxHeight: showQR ? "240px" : "0",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{
            marginTop: "20px",
            padding: "24px",
            background: "rgba(212,167,86,0.04)",
            border: "1px solid rgba(212,167,86,0.13)",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}>
            <div style={{
              padding: "10px",
              background: "#F7F0E3",
              borderRadius: "2px",
              lineHeight: 0,
              flexShrink: 0,
            }}>
              <Image
                src={method.qrImage}
                alt={`${method.name} QR code`}
                width={110}
                height={110}
                style={{ display: "block", borderRadius: "1px" }}
              />
            </div>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "15px",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--sand)",
                marginBottom: "6px",
              }}>
                Scan with your camera
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 300,
                color: "var(--ash)",
                lineHeight: 1.5,
              }}>
                Point your phone&apos;s camera at the code to open {method.name} directly.
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
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
              Choose your preferred payment method below.
            </p>
          </div>
        </RevealSection>

        {/* Donation cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: "24px",
          marginBottom: "56px",
        }}>
          {donationMethods.map((method, i) => (
            <DonationCard key={method.id} method={method} index={i} />
          ))}
        </div>

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
