import { C } from "../config/constants";
import { ParcelTable } from "./ParcelTable";

export function QuestionInput({ q, a, onUpdate, onSubmit, canSubmit }) {
  const upd = patch => onUpdate(patch);

  if (q.type === "number" || q.type === "text") {
    return (
      <div style={{ display: "flex", alignItems: "center", border: `2px solid ${C.bdr}`, borderRadius: 8, marginBottom: 18, overflow: "hidden" }}>
        <input
          type={q.type === "number" ? "number" : "text"}
          value={a.input}
          onChange={e => upd({ input: e.target.value })}
          onKeyDown={e => e.key === "Enter" && canSubmit && onSubmit()}
          placeholder="Enter your answer…"
          style={{ flex: 1, padding: "13px 16px", border: "none", fontSize: 20, outline: "none", boxSizing: "border-box" }}
        />
        {q.suffix && (
          <span style={{ padding: "13px 16px", background: "#f1f5f9", color: C.neu, fontSize: 18, fontWeight: 600, borderLeft: `2px solid ${C.bdr}` }}>
            {q.suffix}
          </span>
        )}
      </div>
    );
  }

  if (q.type === "twonumber") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
        {q.labels.map((label, i) => (
          <div key={i}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.neu, marginBottom: 5 }}>{label}</div>
            <input
              type="number"
              value={i === 0 ? a.input : a.input2}
              onChange={e => upd(i === 0 ? { input: e.target.value } : { input2: e.target.value })}
              onKeyDown={e => e.key === "Enter" && canSubmit && onSubmit()}
              placeholder={`Enter number of ${label}…`}
              style={{ width: "100%", padding: "13px 16px", border: `2px solid ${C.bdr}`, borderRadius: 8, fontSize: 20, outline: "none", boxSizing: "border-box" }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (q.type === "choice") {
    const sc = q.sec === "A" ? C.a : C.b;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {q.options.map(opt => (
          <button key={opt} onClick={() => upd({ selected: opt })}
            style={{ padding: "12px 16px", border: `2px solid ${a.selected === opt ? sc : C.bdr}`, borderRadius: 8, background: a.selected === opt ? (q.sec === "A" ? "#e0f2fe" : "#ede9fe") : "#fff", color: a.selected === opt ? sc : "#334155", fontSize: 16, cursor: "pointer", textAlign: "left", fontWeight: a.selected === opt ? 600 : 400, transition: "all 0.12s" }}>
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (q.type === "yesno") {
    const sc = q.sec === "A" ? C.a : C.b;
    return (
      <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
        {["Yes", "No"].map(v => (
          <button key={v} onClick={() => upd({ yesNo: v })}
            style={{ flex: 1, padding: "16px", border: `2px solid ${a.yesNo === v ? sc : C.bdr}`, borderRadius: 8, background: a.yesNo === v ? (q.sec === "A" ? "#e0f2fe" : "#ede9fe") : "#fff", color: a.yesNo === v ? sc : "#334155", fontSize: 20, fontWeight: 600, cursor: "pointer", transition: "all 0.12s" }}>
            {v}
          </button>
        ))}
      </div>
    );
  }

  if (q.type === "parcel") {
    return <ParcelTable sel={a.selected} onSel={v => upd({ selected: v })} />;
  }

  return null;
}