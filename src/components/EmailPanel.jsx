import { useState } from "react";
import { C, EJS } from "../config/constants";

export function EmailPanel({ score, total, answers, questions }) {
  const [name, setName]           = useState("");
  const [sent, setSent]           = useState(false);
  const [sending, setSending]     = useState(false);
  const [err, setErr]             = useState("");

  const send = async () => {
    if (!name.trim()) { setErr("Please enter your name."); return; }
    setSending(true); setErr("");

    const rows = questions.map((q, i) => {
      const a = answers[i];
      return `${q.id.padEnd(4)} | ${a.correct ? "✓" : "✗"} | ${q.text.slice(0, 55).padEnd(55)} | Your: ${(a.userDisplay || "—").padEnd(12)} | Answer: ${q.displayAnswer}`;
    }).join("\n");

    const results = `Entry 3 Maths Quiz\nName: ${name.trim()}\nScore: ${score}/${total} (${Math.round(score / total * 100)}%)\n\n${"─".repeat(100)}\n${rows}`;

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EJS.svc,
          template_id: EJS.tpl,
          user_id: EJS.key,
          template_params: {
            to_email: EJS.toEmail,
            name: name.trim(),
            score: `${score}/${total} (${Math.round(score / total * 100)}%)`,
            results,
          },
        }),
      });
      if (res.ok) setSent(true);
      else { const txt = await res.text(); setErr(`Send failed (${res.status}): ${txt}`); }
    } catch (e) { setErr("Network error. Please try again."); }

    setSending(false);
  };

  return (
    <div style={{ background: "#f8fafc", borderRadius: 10, padding: 18, marginBottom: 18, border: `1px solid ${C.bdr}` }}>
      <h3 style={{ margin: "0 0 8px", fontSize: 16 }}>📧 Send your results</h3>
      {sent ? (
        <p style={{ color: C.ok, fontWeight: 600, margin: 0 }}>✓ Results sent successfully!</p>
      ) : (
        <>
          <p style={{ fontSize: 13, color: C.neu, margin: "0 0 10px" }}>Enter your name and click Submit to send your results.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Your name…"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              style={{ flex: 1, padding: "10px 14px", border: `2px solid ${C.bdr}`, borderRadius: 7, fontSize: 15, outline: "none" }}
            />
            <button onClick={send} disabled={sending}
              style={{ background: C.pri, color: "#fff", border: "none", borderRadius: 7, padding: "10px 20px", fontWeight: 600, fontSize: 15, cursor: "pointer", opacity: sending ? 0.6 : 1, whiteSpace: "nowrap" }}>
              {sending ? "Sending…" : "Submit"}
            </button>
          </div>
          {err && <p style={{ color: C.err, fontSize: 13, margin: "6px 0 0" }}>{err}</p>}
        </>
      )}
    </div>
  );
}

