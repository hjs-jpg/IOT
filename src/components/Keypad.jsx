import Button from "./Button";

export default function Keypad({ onKey, onEqual }) {
  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "(", ")"];
  const specials = ["C", "DEL", "%"]; // C = clear input, DEL = backspace, % = modulo
  const operators = ["+", "-", "*", "/", "="];

  return (
    <div className="keypad">
      <div className="numbers">
        {numbers.map((n) => (
          <Button key={n} label={n} onClick={onKey} />
        ))}
      </div>
      <div className="specials">
        {specials.map((s) => (
          <Button key={s} label={s} onClick={onKey} variant={s === "C" ? "outline" : ""} />
        ))}
      </div>
      <div className="operators">
        {operators.map((o) => (
          o === "=" ? (
            <button key={o} className="btn primary" onClick={onEqual} aria-label="계산 실행">
              =
            </button>
          ) : (
            <Button key={o} label={o} onClick={onKey} variant="ghost" />
          )
        ))}
      </div>
    </div>
  );
}