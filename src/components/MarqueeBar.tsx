"use client";
export default function MarqueeBar() {
  const items = [
    "24 Million in Crisis",
    "Food Insecurity at Record High",
    "11 Million Displaced",
    "Hospitals Destroyed",
    "Children Starving",
    "Infrastructure Collapsed",
    "Urgent Aid Needed",
    "Lives Depend on You",
  ];

  const repeated = [...items, ...items];

  return (
    <div
      style={{
        background: "var(--sudan-red)",
        overflow: "hidden",
        padding: "10px 0",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: "flex",
          gap: "0",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
              paddingRight: "0",
            }}
          >
            {item}
            <span
              style={{
                display: "inline-block",
                margin: "0 24px",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
