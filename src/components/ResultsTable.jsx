import { C } from "../config/constants";

export function ResultsTable({ questions, answers, sec }) {
  const secQuestions = questions.filter(q => q.sec === sec);
  const color = sec === "A" ? C.a : C.b;

  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ color, margin: "0 0 10px", fontSize: 16 }}>
        Section {sec} — {sec === "A" ? "Non-calculator" : "Calculator"}
      </h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 400 }}>
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              {["Q", "✓/✗", "Your Answer", "Correct Answer"].map(h => (
                <th key={h} style={{ padding: "8px 10px", textAlign: "left", border: `1px solid ${C.bdr}`, fontSize: 13, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {secQuestions.map(q => {
              const a = answers[questions.indexOf(q)];
              return (
                <tr key={q.id} style={{ background: a.correct ? "#f0fdf4" : a.userDisplay && a.userDisplay !== "(skipped)" ? "#fef2f2" : "#fff" }}>
                  <td style={{ padding: "8px 10px", border: `1px solid ${C.bdr}`, fontWeight: 700, color }}>{q.id}</td>
                  <td style={{ padding: "8px 10px", border: `1px solid ${C.bdr}`, fontWeight: 700, color: a.correct ? C.ok : C.err, textAlign: "center" }}>{a.correct ? "✓" : "✗"}</td>
                  <td style={{ padding: "8px 10px", border: `1px solid ${C.bdr}`, color: a.userDisplay && a.userDisplay !== "(skipped)" ? "#334155" : C.neu }}>{a.userDisplay || "—"}</td>
                  <td style={{ padding: "8px 10px", border: `1px solid ${C.bdr}`, color: C.ok, fontWeight: 600 }}>{q.displayAnswer}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
