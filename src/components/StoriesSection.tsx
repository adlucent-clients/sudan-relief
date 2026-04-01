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

const voices = [
  {
    region: "North Darfur",
    quote:
      "We had to flee with nothing. My children haven't eaten a proper meal in weeks. We sleep on the ground with no shelter from the heat. We just need help to survive.",
    context: "Mother of three, displaced from El Fasher",
    color: "var(--terracotta)",
  },
  {
    region: "Khartoum",
    quote:
      "Our hospital was bombed. Patients who needed surgery couldn't be helped. There are no medicines, no electricity, no clean water. Doctors are trying to work with their bare hands.",
    context: "Emergency physician, Khartoum North",
    color: "var(--sand)",
  },
  {
    region: "Blue Nile State",
    quote:
      "All the roads are blocked. Aid cannot reach us. We have been isolated for months. The children are sick and we have no way to get them care. Please don't forget us.",
    context: "Community elder, Blue Nile State",
    color: "var(--sudan-green)",
  },
];

const timeline = [
  { year: "April 2023", event: "Conflict erupts between SAF and RSF in Khartoum", severity: "high" },
  { year: "May 2023", event: "Violence spreads to Darfur; mass atrocities documented", severity: "critical" },
  { year: "Late 2023", event: "11 million displaced — largest crisis in the world", severity: "critical" },
  { year: "Early 2024", event: "Famine warnings issued; humanitarian corridors blocked", severity: "critical" },
  { year: "Mid 2024", event: "Famine officially declared in North Darfur", severity: "critical" },
  { year: "2025", event: "25 million people require urgent humanitarian assistance", severity: "critical" },
  { year: "Today", event: "The crisis continues — your donation can help right now", severity: "action" },
];

export default function StoriesSection() {
  return (
    <section
      id="stories"
      style={{
        background: "linear-gradient(180deg, #0C0804 0%, #110905 50%, #0C0804 100%)",
        padding: "120px 0",
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
        background: "linear-gradient(90deg, transparent, var(--terracotta), transparent)",
        opacity: 0.3,
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        {/* Voices section */}
        <RevealSection>
          <div style={{ marginBottom: "80px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <span style={{ width: "40px", height: "1px", background: "var(--terracotta)", display: "inline-block" }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--terracotta)",
              }}>
                Voices from Sudan
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 600,
              lineHeight: 1.0,
              color: "var(--cream)",
              maxWidth: "700px",
              marginBottom: "16px",
            }}>
              Behind Every Number,{" "}
              <span style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                a Human Story
              </span>
            </h2>
          </div>
        </RevealSection>

        {/* Testimonials */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          marginBottom: "100px",
        }}>
          {voices.map((voice, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div
                className="card-lift"
                style={{
                  background: "rgba(14,9,4,0.7)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderTop: `3px solid ${voice.color}`,
                  borderRadius: "4px",
                  padding: "36px 32px",
                  height: "100%",
                  position: "relative",
                }}
              >
                {/* Quote mark */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "80px",
                  lineHeight: 0.6,
                  color: voice.color,
                  opacity: 0.3,
                  marginBottom: "20px",
                  fontWeight: 700,
                }}>
                  &ldquo;
                </div>

                {/* Region badge */}
                <div style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "100px",
                  padding: "4px 12px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ash)",
                }}>
                  {voice.region}
                </div>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "20px",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "var(--cream)",
                  marginBottom: "24px",
                }}>
                  {voice.quote}
                </p>

                <div style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: "16px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  color: "var(--ash)",
                  fontStyle: "normal",
                }}>
                  — {voice.context}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* Timeline */}
        <RevealSection>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span style={{ width: "40px", height: "1px", background: "var(--sand)", display: "inline-block" }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--sand)",
              }}>
                Timeline of Crisis
              </span>
            </div>

            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 600,
              lineHeight: 1.1,
              color: "var(--cream)",
              marginBottom: "48px",
            }}>
              Two Years of Devastation
            </h3>
          </div>
        </RevealSection>

        <div style={{ position: "relative", maxWidth: "800px" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "96px",
            top: "10px",
            bottom: "10px",
            width: "1px",
            background: "linear-gradient(to bottom, var(--sand), transparent)",
            opacity: 0.2,
          }} />

          {timeline.map((item, i) => (
            <RevealSection key={i} delay={i * 70}>
              <div style={{
                display: "flex",
                gap: "32px",
                marginBottom: "28px",
                alignItems: "flex-start",
              }}>
                {/* Year */}
                <div style={{
                  flexShrink: 0,
                  width: "80px",
                  textAlign: "right",
                  paddingTop: "3px",
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: item.severity === "action" ? "var(--sand)" : "var(--ash)",
                  }}>
                    {item.year}
                  </span>
                </div>

                {/* Dot */}
                <div style={{
                  flexShrink: 0,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background:
                    item.severity === "action" ? "var(--sand)" :
                    item.severity === "critical" ? "var(--sudan-red)" : "var(--ash)",
                  marginTop: "4px",
                  boxShadow: item.severity === "action" ? "0 0 8px rgba(212,167,86,0.6)" : "none",
                }} />

                {/* Event */}
                <div style={{
                  flex: 1,
                  paddingTop: "1px",
                }}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: item.severity === "action" ? 500 : 300,
                    lineHeight: 1.55,
                    color: item.severity === "action" ? "var(--sand)" : "var(--smoke)",
                    margin: 0,
                  }}>
                    {item.event}
                  </p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
