export default function Display({ value, error }) {
    return (
      <div className="display-wrap">
        <div className="display" role="status" aria-live="polite">
          {value}
        </div>
        {error && (
          <p className="error" data-testid="error-msg">
            {error}
          </p>
        )}
      </div>
    );
  }