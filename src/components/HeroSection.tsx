"use client";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, duration = 2200, suffix = "" }: {
  target: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const colors = ["rgba(212,167,86,", "rgba(196,80,26,", "rgba(0,122,61,"];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(170deg, #0C0804 0%, #1A0E06 40%, #0F0902 70%, #0C0804 100%)",
      }}
    >
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Radial glows */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,80,26,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,167,86,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "20%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,122,61,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Sudan flag strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, var(--sudan-red) 0%, var(--sudan-red) 33%, #fff 33%, #fff 66%, var(--sudan-green) 66%, var(--sudan-green) 100%)",
          opacity: 0.7,
        }}
      />

      {/* Content */}
      <div
        className="hero-inner"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "120px 32px 80px",
          width: "100%",
        }}
      >
        {/* MIST badge */}
        <div
          className="fade-up d1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(212,167,86,0.08)",
            border: "1px solid rgba(212,167,86,0.25)",
            borderRadius: "100px",
            padding: "6px 16px 6px 10px",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--sudan-green)",
              display: "inline-block",
              boxShadow: "0 0 6px rgba(0,122,61,0.8)",
              animation: "pulse-ring 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--sand)",
            }}
          >
            MIST 2026 · Humanitarian Services Campaign
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(60px, 9vw, 140px)",
            fontWeight: 600,
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            color: "var(--cream)",
            marginBottom: "8px",
          }}
        >
          <span className="fade-up d2" style={{ display: "block" }}>
            Sudan
          </span>
          <span
            className="fade-up d3"
            style={{
              display: "block",
              fontStyle: "italic",
              fontWeight: 300,
              background: "linear-gradient(90deg, #D4A756, #F5D68A, #C49030)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Needs Us
          </span>
          <span
            className="fade-up d4"
            style={{
              display: "block",
              fontSize: "clamp(40px, 6vw, 90px)",
              fontWeight: 500,
              fontStyle: "normal",
              color: "var(--cream)",
              opacity: 0.9,
            }}
          >
            Now.
          </span>
        </h1>

        {/* Divider */}
        <div
          className="fade-up d5"
          style={{
            width: "80px",
            height: "1px",
            background: "linear-gradient(90deg, var(--sand), transparent)",
            margin: "32px 0",
          }}
        />

        {/* Description */}
        <p
          className="fade-up d5"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(16px, 2vw, 20px)",
            fontWeight: 300,
            lineHeight: 1.65,
            color: "var(--smoke)",
            maxWidth: "580px",
            marginBottom: "48px",
          }}
        >
          Sudan is experiencing one of the world&apos;s worst humanitarian catastrophes.
          Millions are displaced, starving, and in desperate need of aid.
          Your donation provides food, medicine, and shelter to families who have lost everything.
        </p>

        {/* CTAs */}
        <div
          className="fade-up d6 cta-row"
          style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "80px" }}
        >
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
              padding: "16px 32px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLElement).style.background = "var(--sand-light)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.background = "var(--sand)";
            }}
          >
            <span>Donate Today</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>

          <a
            href="#crisis"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "transparent",
              color: "var(--smoke)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "16px 32px",
              borderRadius: "2px",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,167,86,0.4)";
              (e.currentTarget as HTMLElement).style.color = "var(--sand)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLElement).style.color = "var(--smoke)";
            }}
          >
            Learn More
          </a>
        </div>

        {/* Stats row */}
        <div
          className="fade-up d7 stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(212,167,86,0.1)",
            border: "1px solid rgba(212,167,86,0.1)",
            borderRadius: "4px",
            overflow: "hidden",
            maxWidth: "700px",
          }}
        >
          {[
            { num: 24, suffix: "M+", label: "People in Need" },
            { num: 11, suffix: "M+", label: "Displaced" },
            { num: 8, suffix: "M+", label: "Internally Displaced" },
            { num: 2023, suffix: "", label: "Conflict Started" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "rgba(12,8,4,0.6)",
                padding: "20px 16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "36px",
                  fontWeight: 600,
                  color: "var(--sand)",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                <AnimatedNumber target={stat.num} suffix={stat.suffix} />
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ash)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-inner { padding: 100px 20px 60px !important; }
          .cta-row { flex-direction: column !important; }
          .cta-row a { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

      {/* Scroll indicator */}
      <div
        className="fade-in d8"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.4,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--ash)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--ash), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
