export function TravelCosts() {
    const items = [{ name: "travel", cost: "£169" }, { name: "hotel", cost: "£108" }];
    return (
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        {items.map(h => (
          <div key={h.name} style={{ flex: 1, background: "#fff", border: "2px solid #334155", borderRadius: 14, padding: "20px 18px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 600, fontSize: 17, color: "#334155", marginBottom: 8 }}>{h.name}</div>
            <div style={{ fontWeight: 700, fontSize: 26, color: "#334155" }}>{h.cost}</div>
          </div>
        ))}
      </div>
    );
  }