export function ProgressBar({ current, total, color }) {
    const pct = (current / total) * 100;
    return (
      <div style={{ background: "#e2e8f0", borderRadius: 99, height: 7, marginBottom: 20 }}>
        <div style={{ background: color, borderRadius: 99, height: 7, width: `${pct}%`, transition: "width 0.3s" }} />
      </div>
    );
  }