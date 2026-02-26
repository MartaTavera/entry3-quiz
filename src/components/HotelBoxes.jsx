export function HotelBoxes() {
    const hotels = [
      { name: "Style Hotel", dist: "450 m from stadium", color: "#0369a1", bg: "#e0f2fe" },
      { name: "Fair Hotel",  dist: "1 km from stadium",  color: "#7c3aed", bg: "#ede9fe" },
    ];
    return (
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        {hotels.map(h => (
          <div key={h.name} style={{ flex: 1, background: h.bg, border: `2px solid ${h.color}22`, borderRadius: 14, padding: "20px 18px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🏨</div>
            <div style={{ fontWeight: 700, fontSize: 17, color: h.color, marginBottom: 8 }}>{h.name}</div>
            <div style={{ fontWeight: 600, fontSize: 18, color: h.color }}>{h.dist}</div>
          </div>
        ))}
      </div>
    );
  }