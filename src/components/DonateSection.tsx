"use client";
import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

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
        background: copied ? "rgba(0,122,61,0.15)" : "rgba(212,167,86,0.1)",
        border: `1px solid ${copied ? "rgba(0,122,61,0.5)" : "rgba(212,167,86,0.25)"}`,
        color: copied ? "var(--sudan-green)" : "var(--sand)",
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

const donationMethods = [
  {
    id: "zelle",
    name: "Zelle",
    logo: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "80px", height: "28px" }}>
        <text x="0" y="30" fontFamily="Arial Black, sans-serif" fontSize="28" fontWeight="900" fill="#6D1ED4">Zelle</text>
      </svg>
    ),
    accentColor: "#6D1ED4",
    accentBg: "rgba(109,30,212,0.08)",
    accentBorder: "rgba(109,30,212,0.3)",
    qrValue: "tel:+17048080245",
    primaryLabel: "Phone Number",
    primaryValue: "+1 (704) 808-0245",
    secondaryLabel: "Recipient",
    secondaryValue: "Jawad Saymeh",
    instructions: [
      "Open your bank's mobile app",
      "Find Zelle (most major banks)",
      "Send to the phone number below",
      "Include 'Sudan Relief' in memo",
    ],
    badge: "Most Banks",
    badgeColor: "#6D1ED4",
  },
  {
    id: "cashapp",
    name: "Cash App",
    logo: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "90px", height: "28px" }}>
        <text x="0" y="30" fontFamily="Arial Black, sans-serif" fontSize="24" fontWeight="900" fill="#00D64F">Cash App</text>
      </svg>
    ),
    accentColor: "#00D64F",
    accentBg: "rgba(0,214,79,0.08)",
    accentBorder: "rgba(0,214,79,0.3)",
    qrValue: "https://cash.app/$pfsulay1",
    primaryLabel: "Cashtag",
    primaryValue: "$pfsulay1",
    secondaryLabel: "Platform",
    secondaryValue: "Cash App",
    instructions: [
      "Download the Cash App",
      "Tap the '$' send button",
      "Search for the cashtag below",
      "Enter any amount and send",
    ],
    badge: "Instant",
    badgeColor: "#00D64F",
  },
];

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

      {/* Background glow */}
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "800px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(212,167,86,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        {/* Section header */}
        <RevealSection>
          <div style={{ marginBottom: "72px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "24px" }}>
              <span style={{ width: "40px", height: "1px", background: "var(--sand)", display: "inline-block" }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--sand)",
              }}>
                How to Help
              </span>
              <span style={{ width: "40px", height: "1px", background: "var(--sand)", display: "inline-block" }} />
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
              maxWidth: "580px",
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
          marginBottom: "60px",
        }}>
          {donationMethods.map((method, i) => (
            <RevealSection key={method.id} delay={i * 120}>
              <div
                className="card-lift"
                style={{
                  background: "linear-gradient(145deg, rgba(20,14,8,0.95), rgba(14,9,4,0.98))",
                  border: `1px solid ${method.accentBorder}`,
                  borderRadius: "6px",
                  padding: "44px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Corner accent */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "120px",
                  height: "120px",
                  background: `radial-gradient(circle at 0 0, ${method.accentBg}, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                {/* Badge */}
                <div style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: `rgba(${method.badgeColor === "#6D1ED4" ? "109,30,212" : "0,214,79"},0.12)`,
                  border: `1px solid ${method.accentBorder}`,
                  borderRadius: "100px",
                  padding: "4px 12px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: method.accentColor,
                }}>
                  {method.badge}
                </div>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "36px" }}>
                  <div style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    background: method.accentBg,
                    border: `1px solid ${method.accentBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {method.logo}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--ash)",
                      marginBottom: "3px",
                    }}>
                      Donate via
                    </div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "28px",
                      fontWeight: 600,
                      color: "var(--cream)",
                      lineHeight: 1,
                    }}>
                      {method.name}
                    </div>
                  </div>
                </div>

                {/* Primary info */}
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "4px",
                  padding: "20px 24px",
                  marginBottom: "16px",
                }}>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ash)",
                    marginBottom: "8px",
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
                      fontSize: "28px",
                      fontWeight: 600,
                      color: method.accentColor,
                      letterSpacing: "0.01em",
                    }}>
                      {method.primaryValue}
                    </span>
                    <CopyButton text={method.primaryValue} />
                  </div>
                </div>

                {/* Secondary info */}
                <div style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "4px",
                  padding: "14px 24px",
                  marginBottom: "32px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "var(--ash)",
                  }}>
                    {method.secondaryLabel}
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--smoke)",
                  }}>
                    {method.secondaryValue}
                  </span>
                </div>

                {/* QR Code + Instructions side by side */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "130px 1fr",
                  gap: "24px",
                  alignItems: "start",
                  marginBottom: "28px",
                }}>
                  {/* QR */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      background: "white",
                      padding: "10px",
                      borderRadius: "6px",
                      display: "inline-block",
                      border: `2px solid ${method.accentBorder}`,
                      boxShadow: `0 0 20px ${method.accentBg}`,
                    }}>
                      <QRCodeSVG
                        value={method.qrValue}
                        size={106}
                        bgColor="white"
                        fgColor="#0C0804"
                        level="H"
                        style={{ display: "block" }}
                      />
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      fontWeight: 400,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--ash)",
                      marginTop: "8px",
                    }}>
                      Scan to send
                    </div>
                  </div>

                  {/* Instructions */}
                  <div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--sand)",
                      marginBottom: "14px",
                    }}>
                      How to donate
                    </div>
                    <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {method.instructions.map((step, j) => (
                        <li key={j} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          marginBottom: "10px",
                        }}>
                          <span style={{
                            flexShrink: 0,
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            background: method.accentBg,
                            border: `1px solid ${method.accentBorder}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "10px",
                            fontWeight: 600,
                            color: method.accentColor,
                          }}>
                            {j + 1}
                          </span>
                          <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "13px",
                            fontWeight: 300,
                            lineHeight: 1.5,
                            color: "var(--smoke)",
                          }}>
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Bottom CTA */}
                {method.id === "cashapp" ? (
                  <a
                    href={method.qrValue}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: method.accentBg,
                      border: `1px solid ${method.accentBorder}`,
                      color: method.accentColor,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "14px 24px",
                      borderRadius: "3px",
                      textDecoration: "none",
                      transition: "all 0.25s",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `rgba(0,214,79,0.18)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = method.accentBg;
                    }}
                  >
                    Open in Cash App
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                ) : (
                  <div style={{
                    background: method.accentBg,
                    border: `1px solid ${method.accentBorder}`,
                    borderRadius: "3px",
                    padding: "14px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={method.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "var(--smoke)",
                      lineHeight: 1.4,
                    }}>
                      Available in most major US banking apps including Chase, Bank of America, Wells Fargo, and more.
                    </span>
                  </div>
                )}
              </div>
            </RevealSection>
          ))}
        </div>

        {/* Trust statement */}
        <RevealSection delay={200}>
          <div style={{
            background: "rgba(0,122,61,0.06)",
            border: "1px solid rgba(0,122,61,0.2)",
            borderRadius: "4px",
            padding: "28px 36px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              flexShrink: 0,
              borderRadius: "50%",
              background: "rgba(0,122,61,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--sudan-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--sudan-green)",
                marginBottom: "4px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                100% Transparent
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--smoke)",
                lineHeight: 1.5,
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
