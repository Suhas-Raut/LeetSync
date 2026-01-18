export default function LogsPanel({ logs }) {
  return (
    <div className="card">
      <h2>Logs</h2>
      <pre className="logs">
        {logs.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </pre>
    </div>
  );
}
