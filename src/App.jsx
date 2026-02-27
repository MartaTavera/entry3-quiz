import { useState } from "react";
import { C } from "./config/constants";
import { questions } from "./data/questions";
import { checkAnswer } from "./logic/answerChecker";
import { ImgBox }        from "./components/ImgBox";
import { HotelBoxes }    from "./components/HotelBoxes";
import { TravelCosts }   from "./components/TravelCosts";
import { ProgressBar }   from "./components/ProgressBar";
import { HintBox }       from "./components/HintBox";
import { FeedbackBox }   from "./components/FeedbackBox";
import { QuestionInput } from "./components/QuestionInput";
import { ResultsTable }  from "./components/ResultsTable";
import { EmailPanel }    from "./components/EmailPanel";

const initA = () => ({ input: "", input2: "", selected: null, yesNo: null, skipped:false, submitted: false, correct: false, attempts:0, revealed:false, userDisplay: "" });

export default function Quiz() {
  const [answers, setAnswers]   = useState(() => questions.map(initA));
  const [current, setCurrent]   = useState(0);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const q   = questions[current];
  const a   = answers[current];
  const sc  = q.sec === "A" ? C.a : C.b;
  const upd = patch => setAnswers(prev => prev.map((x, i) => i === current ? { ...x, ...patch } : x));

  const canSubmit =
    q.type === "number"    ? a.input !== "" :
    q.type === "text"      ? a.input !== "" :
    q.type === "choice"    ? !!a.selected :
    q.type === "yesno"     ? !!a.yesNo :
    q.type === "parcel"    ? !!a.selected :
    q.type === "twonumber" ? a.input !== "" && a.input2 !== "" : false;

  const handleSubmit = () => {
    const result = checkAnswer(q, a);
    upd({ submitted: true, attempts:a.attempts + 1, ...result });
  };
  
  const goNext  = () => { setShowHint(false); if (current + 1 >= questions.length) setFinished(true); else setCurrent(c => c + 1); };
  const goBack  = () => { setShowHint(false); 
    setShowHint(false);
  const prev = current - 1;
    if (answers[prev].skipped) setAnswers(a => a.map((x, i) => i === prev ? initA() : x));
      setCurrent(prev);
  };
  const retry = () => upd({ input: "", input2: "", inputs: undefined, selected: null, yesNo: null, submitted: false, correct: false, userDisplay: "", revealed: false });
  const skip    = () => { upd({ submitted: true, correct: false, skipped:true,  userDisplay: "(skipped)" }); goNext(); };
  const reset   = () => { setAnswers(questions.map(initA)); setCurrent(0); setFinished(false); setShowHint(false); };
  const reveal = () => { upd({revealed:true}) };
  const score = answers.filter(x => x.correct).length;

  // ── Results screen ──────────────────────────────────────────
  if (finished) {
    const pct = Math.round(score / questions.length * 100);
    return (
      <div style={{ minHeight: "100vh", background: C.bg, padding: "24px 16px", fontFamily: "system-ui,sans-serif" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: C.card, borderRadius: 16, padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginBottom: 20 }}>

            {/* Score summary */}
            <div style={{ textAlign: "center", paddingBottom: 20, borderBottom: `1px solid ${C.bdr}`, marginBottom: 20 }}>
              <div style={{ fontSize: 48 }}>{pct >= 80 ? "🌟" : pct >= 60 ? "👍" : "📚"}</div>
              <h1 style={{ color: C.pri, margin: "8px 0 4px", fontSize: 24 }}>Quiz Complete!</h1>
              <div style={{ fontSize: 44, fontWeight: 700, color: pct >= 60 ? C.ok : C.err }}>{pct}%</div>
              <div style={{ color: C.neu, marginBottom: 10, fontSize: 16 }}>{score} / {questions.length} questions correct</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {["A", "B"].map(s => {
                  const qs = questions.filter(q => q.sec === s);
                  const sc = qs.filter(q => answers[questions.indexOf(q)].correct).length;
                  return (
                    <span key={s} style={{ background: s === "A" ? "#e0f2fe" : "#ede9fe", color: s === "A" ? C.a : C.b, padding: "4px 16px", borderRadius: 99, fontSize: 14, fontWeight: 600 }}>
                      Section {s}: {sc}/{qs.length}
                    </span>
                  );
                })}
              </div>
            </div>

            <ResultsTable questions={questions} answers={answers} sec="A" />
            <ResultsTable questions={questions} answers={answers} sec="B" />

            <EmailPanel score={score} total={questions.length} answers={answers} questions={questions} />

            <button onClick={reset}
              style={{ width: "100%", background: C.pri, color: "#fff", border: "none", borderRadius: 8, padding: "14px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
// ── Question screen ─────────────────────────────────────────
return (
  <div style={{ minHeight: "100vh", width: "100vw", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 24px", fontFamily: "system-ui,sans-serif", boxSizing: "border-box" }}>
    <div style={{ background: C.card, borderRadius: 16, padding: "48px 56px", width: 780, maxWidth: "100%", minHeight: 560, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: sc, background: q.sec === "A" ? "#e0f2fe" : "#ede9fe", borderRadius: 99, padding: "4px 12px" }}>
          SECTION {q.sec} – {q.sec === "A" ? "Non-calculator" : "Calculator"}
        </span>
        <span style={{ fontSize: 15, color: C.neu }}>Q{current + 1} / {questions.length}</span>
      </div>

      <ProgressBar current={current} total={questions.length} color={sc} />

      {current === 4 && (
        <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 8, padding: "9px 14px", fontSize: 14, color: C.b, marginBottom: 14, fontWeight: 600 }}>
          🧮 Section B starts here — calculator allowed!
        </div>
      )}

      {/* Marks badge */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <span style={{ background: q.sec === "A" ? "#e0f2fe" : "#ede9fe", color: sc, borderRadius: 99, padding: "3px 12px", fontSize: 13, fontWeight: 600 }}>{q.marks} mark{q.marks > 1 ? "s" : ""}</span>
        <span style={{ color: C.neu, fontSize: 13, lineHeight: "1.8" }}>Question {q.id}</span>
      </div>

      {q.preText && <p style={{ fontSize: 18, fontWeight: 500, color: "#334155", marginBottom: 12, marginTop: 0 }}>{q.preText}</p>}
      {q.customContent === "hotels" && <HotelBoxes />}
      {q.customContent === "travel" && <TravelCosts />}
      {q.image && <ImgBox label={q.image} src={q.imgSrc || ""} />}

      <p style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", lineHeight: 1.2, marginBottom: 18, marginTop: 0, whiteSpace: "pre-line" }}>{q.text}</p>

      {!a.submitted && <HintBox hint={q.hint} show={showHint} onToggle={() => setShowHint(h => !h)} />}

      {!a.submitted && (
        <QuestionInput q={q} a={a} onUpdate={upd} onSubmit={handleSubmit} canSubmit={canSubmit} />
      )}

      {a.submitted && <FeedbackBox correct={a.correct} explanation={q.explanation} showExplanation={a.correct || a.revealed} />}

      <div style={{ flex: 1 }} />

      {/* Navigation buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        {current > 0 && (
          <button onClick={goBack}
            style={{ padding: "13px 16px", background: "#fff", color: C.neu, border: `2px solid ${C.bdr}`, borderRadius: 8, fontSize: 15, cursor: "pointer", fontWeight: 500 }}>
            ← Back
          </button>
        )}
        {!a.submitted ? (
          <>
            <button onClick={handleSubmit} disabled={!canSubmit}
              style={{ flex: 1, background: sc, color: "#fff", border: "none", borderRadius: 8, padding: "13px", fontSize: 16, fontWeight: 600, cursor: "pointer", opacity: canSubmit ? 1 : 0.4 }}>
              Submit Answer
            </button>
            <button onClick={skip}
              style={{ padding: "13px 16px", background: "#fff", color: C.neu, border: `2px solid ${C.bdr}`, borderRadius: 8, fontSize: 15, cursor: "pointer" }}>
              Skip
            </button>
          </>
        ) : (
          <>
            {!a.correct && (
              <button onClick={retry}
                style={{ flex: 1, background: "#fff", color: sc, border: `2px solid ${sc}`, borderRadius: 8, padding: "13px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                Try Again
              </button>
            )}
            <button onClick={goNext}
              style={{ flex: 1, background: sc, color: "#fff", border: "none", borderRadius: 8, padding: "13px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
              {current + 1 >= questions.length ? "Finish Quiz →" : "Next →"}
            </button>
          </>
        )}
        {a.submitted && !a.correct && !a.revealed && (
          <button onClick={reveal}
          style={{ padding: "13px 16px", background: "#fff", color: C.neu, border: `2px solid ${C.bdr}`, borderRadius: 8, fontSize: 15, cursor: "pointer" }}>
            Show Answer
          </button>

        )}
      </div>
     
      <div style={{ marginTop: 14, textAlign: "center", fontSize: 13, color: C.neu }}>
        Score so far: {score} / {current} correct
      </div>
    </div>
  </div>
);
}