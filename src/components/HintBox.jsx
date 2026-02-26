import { C } from "../config/constants";

export function HintBox({ hint, show, onToggle }) {
  return (
    <>
      <button onClick={onToggle}
        style={{ background: "none", border: "1px dashed #94a3b8", borderRadius: 7, padding: "6px 14px", fontSize: 13, color: C.neu, cursor: "pointer", marginBottom: show ? 10 : 16, alignSelf: "flex-start" }}>
        {show ? "Hide hint ▲" : "Show hint 💡"}
      </button>
      {show && (
        <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: 7, padding: "10px 14px", fontSize: 15, color: "#713f12", marginBottom: 16 }}>
          {hint}
        </div>
      )}
    </>
  );
}