export default function History({ records }) {
    if (!records.length) return null;
    return (
      <div className="history">
        <h2>계산 기록</h2>
        <ul>
          {records.map((r, idx) => (
            <li key={idx}>{r}</li>
          ))}
        </ul>
      </div>
    );
  }
  