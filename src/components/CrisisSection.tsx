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

const FactIcon = ({ type, color }: { type: string; color: string }) => {
  const s = { width: 28, height: 28, display: "block" as const };
  if (type === "people") return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
  if (type === "displaced") return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
      <line x1="3" y1="9" x2="1" y2="11"/>
      <line x1="21" y1="9" x2="23" y2="11"/>
    </svg>
  );
  if (type === "famine") return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10"/>
      <path d="M12 6v6l4 2"/>
      <line x1="18" y1="2" x2="18" y2="8"/>
      <line x1="15" y1="5" x2="21" y2="5"/>
    </svg>
  );
  if (type === "health") return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );
  if (type === "education") return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
  if (type === "conflict") return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
  return null;
};

const facts = [
  {
    iconType: "people",
    title: "25 Million",
    subtitle: "people need humanitarian assistance",
    detail:
      "Over half of Sudan's population requires urgent aid — food, water, shelter, and medical care.",
    color: "var(--sudan-red)",
  },
  {
    iconType: "displaced",
    title: "11 Million",
    subtitle: "displaced from their homes",
    detail:
      "Sudan has one of the world's largest displacement crises. Millions have fled violence leaving everything behind.",
    color: "var(--terracotta)",
  },
  {
    iconType: "famine",
    title: "Famine Declared",
    subtitle: "in multiple regions",
    detail:
      "Famine conditions have been confirmed across multiple states. Children are dying of malnutrition at alarming rates.",
    color: "var(--sand)",
  },
  {
    iconType: "health",
    title: "Healthcare Collapsed",
    subtitle: "across conflict zones",
    detail:
      "Most hospitals are non-functional. Disease outbreaks — cholera, malaria — go untreated. Medical supplies are inaccessible.",
    color: "var(--sudan-green)",
  },
  {
    iconType: "education",
    title: "19 Million",
    subtitle: "children out of school",
    detail:
      "An entire generation is losing access to education. Schools have been destroyed or repurposed as shelters.",
    color: "var(--sand)",
  },
  {
    iconType: "conflict",
    title: "Ongoing Conflict",
    subtitle: "since April 2023",
    detail:
      "Fighting between the SAF and RSF has devastated civilian infrastructure. Atrocities are being documented across Darfur.",
    color: "var(--terracotta)",
  },
];

export default function CrisisSection() {
  return (
    <section
      id="crisis"
      style={{
        background: "linear-gradient(180deg, #0C0804 0%, #120A04 60%, #0C0804 100%)",
        padding: "clamp(80px, 10vw, 120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--sand), transparent)",
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-200px",
          top: "20%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,80,26,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 32px)",
        }}
      >
        {/* Section header */}
        <RevealSection>
          <div style={{ marginBottom: "72px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "40px",
                  height: "1px",
                  background: "var(--sand)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--sand)",
                }}
              >
                The Crisis
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(42px, 6vw, 80px)",
                fontWeight: 600,
                lineHeight: 1.0,
                color: "var(--cream)",
                maxWidth: "700px",
                marginBottom: "24px",
              }}
            >
              A Nation on the{" "}
              <span
                style={{
                  fontStyle: "italic",
                  color: "var(--sand)",
                }}
              >
                Edge of Collapse
              </span>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "17px",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "var(--smoke)",
                maxWidth: "640px",
              }}
            >
              Since April 2023, Sudan has been engulfed in a brutal civil war between the Sudanese
              Armed Forces (SAF) and the Rapid Support Forces (RSF). The conflict has triggered the
              world&apos;s largest displacement crisis, with catastrophic consequences for millions of civilians.
            </p>
          </div>
        </RevealSection>

        {/* Pull quote */}
        <RevealSection delay={100}>
          <div
            style={{
              borderLeft: "3px solid var(--sudan-red)",
              paddingLeft: "28px",
              marginBottom: "80px",
              maxWidth: "700px",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.45,
                color: "var(--cream)",
                marginBottom: "12px",
              }}
            >
              &ldquo;Sudan is experiencing one of the most severe and complex humanitarian
              emergencies in the world — yet it remains dangerously underfunded.&rdquo;
            </p>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ash)",
              }}
            >
              — United Nations OCHA
            </span>
          </div>
        </RevealSection>

        {/* Facts grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1px",
            background: "rgba(212,167,86,0.08)",
            border: "1px solid rgba(212,167,86,0.08)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {facts.map((fact, i) => (
            <RevealSection key={i} delay={i * 80}>
              <div
                className="card-lift"
                style={{
                  background: "rgba(12,8,4,0.8)",
                  padding: "36px 32px",
                  height: "100%",
                  borderBottom: `3px solid transparent`,
                  transition: "border-color 0.3s, transform 0.35s, box-shadow 0.35s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderBottomColor = fact.color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
                }}
              >
                <div style={{ marginBottom: "20px", opacity: 0.85 }}>
                  <FactIcon type={fact.iconType} color={fact.color} />
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "38px",
                    fontWeight: 600,
                    color: fact.color,
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}
                >
                  {fact.title}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    color: "var(--smoke)",
                    marginBottom: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  {fact.subtitle}
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: "var(--ash)",
                  }}
                >
                  {fact.detail}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
