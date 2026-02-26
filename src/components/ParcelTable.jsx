import { C } from "../config/constants";

const PARCEL_ROWS = [
  { h: 27, w: 11 }, { h: 21, w: 17 }, { h: 24, w: 7 },
  { h: 30, w: 15 }, { h: 25, w: 12 }, { h: 22, w: 16 }, { h: 14, w: 6 },
];

export function ParcelTable({ sel, onSel }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, marginBottom: 18 }}>
      <thead>
        <tr style={{ background: "#f1f5f9" }}>
          {["Height (cm)", "Weight (kg)", "Qualifies? (h<25 & w<15)"].map(h => (
            <th key={h} style={{ padding: "9px 10px", textAlign: "left", border: `1px solid ${C.bdr}`, fontSize: 14 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {PARCEL_ROWS.map((r, i) => {
          const key = `${r.h}/${r.w}`, ok = r.h < 25 && r.w < 15, active = sel === key;
          return (
            <tr key={i} onClick={ok ? () => onSel(key) : undefined}
              style={{ background: active ? "#ede9fe" : ok ? "#fff" : "#f9fafb", cursor: ok ? "pointer" : "default", outline: active ? `2px solid ${C.b}` : "none", transition: "background 0.1s" }}>
              <td style={{ padding: "9px 10px", border: `1px solid ${C.bdr}` }}>{r.h}</td>
              <td style={{ padding: "9px 10px", border: `1px solid ${C.bdr}` }}>{r.w}</td>
              <td style={{ padding: "9px 10px", border: `1px solid ${C.bdr}` }}>
                {ok
                  ? <span style={{ color: C.ok, fontWeight: 600 }}>✓ Yes — click to select</span>
                  : <span style={{ color: C.neu }}>✗ No</span>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}