import { C } from "../config/constants";

export function FeedbackBox({ correct, explanation }) {
  return (
    <div style={{ background: correct ? "#f0fdf4" : "#fef2f2", border: `2px solid ${correct ? "#86efac" : "#fca5a5"}`, borderRadius: 10, padding: 16, marginBottom: 18 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: correct ? C.ok : C.err, marginBottom: 6 }}>
        {correct ? "✓ Correct!" : "✗ Not quite"}
      </div>
      <p style={{ margin: 0, color: "#334155", fontSize: 15, lineHeight: 1.65 }}>{explanation}</p>
    </div>
  );
}