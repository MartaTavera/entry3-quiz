export function ImgBox({ label, src }) {
    return (
      <div style={{ border: "2px dashed #94a3b8", borderRadius: 8, padding: 10, textAlign: "center", marginBottom: 18, background: "#f8fafc" }}>
        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginBottom: 4 }}>📷 {label}</div>
        {src
          ? <img src={src} alt={label} style={{ maxWidth: "100%", maxHeight: 380, display: "block", margin: "0 auto" }} />
          : <div style={{ fontSize: 11, color: "#94a3b8" }}>Set imgSrc on this question in the questions array</div>}
      </div>
    );
  }