import { useEffect, useMemo, useState } from "react";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import History from "./components/History";
import { Parser } from "expr-eval";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]); // most recent first
  const [error, setError] = useState("");

  // Build parser once
  const parser = useMemo(() => new Parser({ operators: { in: false } }), []);

  // Format numeric result to avoid 0.1+0.2 = 0.30000000000000004
  const formatResult = (value) => {
    if (typeof value !== "number" || !isFinite(value)) return String(value);
    // Round to 12 significant digits, trim trailing zeros
    const str = Number.parseFloat(value.toPrecision(12)).toString();
    return str;
  };

  const addHistory = (expr, result) => {
    const record = `${expr} = ${result}`;
    setHistory((prev) => [record, ...prev].slice(0, 5));
  };

  const clearAll = () => {
    setInput("");
    setError("");
  };

  const handleEqual = () => {
    if (!input) return;
    try {
      setError("");
      // Sanitize: allow digits, operators, parentheses, dot, spaces
      const safe = input.replace(/[^0-9+\-*/%(). ]/g, "");
      const value = parser.evaluate(safe);
      const result = formatResult(value);
      addHistory(safe, result);
      setInput(result);
    } catch (e) {
      setError("잘못된 수식입니다.");
    }
  };

  const handleClick = (val) => {
    if (val === "C") {
      // clear current input only
      setInput("");
      setError("");
      return;
    }
    if (val === "=") {
      handleEqual();
      return;
    }
    if (val === "DEL") {
      setInput((prev) => prev.slice(0, -1));
      return;
    }
    // append value
    setError("");
    setInput((prev) => prev + val);
  };

  const handleClearHistory = () => setHistory([]);

  // Keyboard support (optional assignment)
  useEffect(() => {
    const onKeyDown = (e) => {
      const key = e.key;
      if (/^[0-9]$/.test(key)) return handleClick(key);
      if (["+", "-", "*", "/", "%", ".", "(", ")"].includes(key)) return handleClick(key);
      if (key === "Enter" || key === "=") return handleEqual();
      if (key === "Backspace") return handleClick("DEL");
      if (key === "Escape") return clearAll();
      if (key.toLowerCase() === "c") return handleClick("C");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      <h1>React 계산기</h1>
      <Display value={input || "0"} error={error} />
      <Keypad onKey={handleClick} onEqual={handleEqual} />

      <div className="actions">
        <button className="btn outline" onClick={clearAll} title="입력 초기화 (ESC)">입력 초기화</button>
        <button className="btn danger" onClick={handleClearHistory} title="기록 초기화">기록 초기화</button>
      </div>

      <History records={history} />

      <footer className="hint">
        <p>
          <strong>키보드 지원:</strong> 숫자/연산자, Enter(=), Backspace(DEL), Esc(입력 초기화), C(입력 초기화)
        </p>
        <p>
          <strong>주의:</strong> 보안을 위해 <code>eval</code> 대신 <code>expr-eval</code> 파서를 사용합니다.
        </p>
      </footer>
    </div>
  );
}