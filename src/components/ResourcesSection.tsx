"use client";
import { useEffect, useRef } from "react";

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

const resources = [
  {
    org: "UNICEF",
    description: "Protecting children in Sudan — nutrition, health care, water, and education.",
    url: "https://www.unicef.org/emergencies/crisis-sudan",
    category: "Children & Families",
    color: "var(--sand)",
  },
  {
    org: "UNHCR",
    description: "The UN Refugee Agency providing emergency protection and aid to displaced Sudanese.",
    url: "https://www.unhcr.org/emergencies/sudan-emergency",
    category: "Refugees & Displacement",
    color: "var(--terracotta)",
  },
  {
    org: "International Rescue Committee",
    description: "Delivering emergency aid and long-term recovery programs throughout Sudan.",
    url: "https://www.rescue.org/country/sudan",
    category: "Emergency Relief",
    color: "var(--sudan-green)",
  },
  {
    org: "Doctors Without Borders",
    description: "MSF provides critical medical care in conflict-affected areas across Sudan.",
    url: "https://www.doctorswithoutborders.org/latest/sudan",
    category: "Medical Aid",
    color: "var(--sand)",
  },
  {
    org: "Save the Children",
    description: "Reaching the most vulnerable children with food, water, and protection.",
    url: "https://www.savethechildren.org/us/what-we-do/where-we-work/africa/sudan",
    category: "Children",
    color: "var(--terracotta)",
  },
  {
    org: "World Food Programme",
    description: "Delivering emergency food assistance to millions facing starvation in Sudan.",
    url: "https://www.wfp.org/countries/sudan",
    category: "Food Security",
    color: "var(--sudan-green)",
  },
];

export default function ResourcesSection() {
  return (
    <section
      id="resources"
      style={{
        background: "linear-gradient(180deg, #0C0804 0%, #0F0A05 50%, #0C0804 100%)",
        padding: "clamp(80px, 10vw, 120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, var(--sudan-green), transparent)",
        opacity: 0.3,
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 32px)" }}>
        {/* Header */}
        <RevealSection>
          <div style={{ marginBottom: "72px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <span style={{ width: "40px", height: "1px", background: "var(--sudan-green)", display: "inline-block" }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--sudan-green)",
              }}>
                Learn More
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 600,
              lineHeight: 1.0,
              color: "var(--cream)",
              maxWidth: "700px",
              marginBottom: "20px",
            }}>
              Trusted Organizations{" "}
              <span style={{ fontStyle: "italic", color: "var(--sudan-green)" }}>
                on the Ground
              </span>
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "17px",
              fontWeight: 300,
              lineHeight: 1.65,
              color: "var(--smoke)",
              maxWidth: "580px",
            }}>
              Learn more about the humanitarian response in Sudan from these
              trusted organizations working tirelessly to provide relief.
            </p>
          </div>
        </RevealSection>

        {/* Resources grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "16px",
          marginBottom: "80px",
        }}>
          {resources.map((r, i) => (
            <RevealSection key={i} delay={i * 70}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift"
                style={{
                  display: "block",
                  background: "rgba(14,9,4,0.7)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "4px",
                  padding: "28px 30px",
                  textDecoration: "none",
                  height: "100%",
                  transition: "border-color 0.3s, transform 0.35s, box-shadow 0.35s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,167,86,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                {/* Category */}
                <div style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "100px",
                  padding: "3px 12px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ash)",
                  marginBottom: "16px",
                }}>
                  {r.category}
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "12px",
                  marginBottom: "12px",
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "var(--cream)",
                    lineHeight: 1.1,
                  }}>
                    {r.org}
                  </div>

                  {/* External link icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--ash)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0, marginTop: "4px", transition: "stroke 0.2s" }}
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>

                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "var(--ash)",
                  margin: 0,
                }}>
                  {r.description}
                </p>

                <div style={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: r.color,
                  letterSpacing: "0.06em",
                }}>
                  Visit →
                </div>
              </a>
            </RevealSection>
          ))}
        </div>

        {/* MIST info block */}
        <RevealSection delay={100}>
          <div style={{
            background: "linear-gradient(135deg, rgba(212,167,86,0.05) 0%, rgba(12,8,4,0.8) 100%)",
            border: "1px solid rgba(212,167,86,0.15)",
            borderRadius: "6px",
            padding: "52px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Decorative corner */}
            <div style={{
              position: "absolute",
              top: "-1px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "2px",
              background: "var(--sand)",
              borderRadius: "0 0 2px 2px",
            }} />

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(212,167,86,0.08)",
              border: "1px solid rgba(212,167,86,0.2)",
              borderRadius: "100px",
              padding: "6px 18px",
              marginBottom: "28px",
            }}>
              <span style={{ fontSize: "14px" }}>🤲</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--sand)",
              }}>
                About This Campaign
              </span>
            </div>

            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 600,
              lineHeight: 1.1,
              color: "var(--cream)",
              marginBottom: "20px",
            }}>
              MIST 2026 Humanitarian Services
            </h3>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "17px",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "var(--smoke)",
              maxWidth: "640px",
              margin: "0 auto 36px",
            }}>
              MIST (Math, Islamic Studies, and Science Tournament) brings together
              Muslim students from across the country. Our Humanitarian Services
              campaign channels the strength of this community toward those
              who need us most — the people of Sudan.
            </p>

            <a
              href="#donate"
              className="btn-glow"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "var(--sand)",
                color: "var(--ink)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "16px 36px",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--sand-light)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--sand)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              Donate Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
