export default function Button({ label, onClick, variant }) {
    return (
      <button
        className={`btn ${variant || ""}`}
        onClick={() => onClick(label)}
        aria-label={`키 ${label}`}
      >
        {label}
      </button>
    );
  }