export default function History({ entries }) {
  return (
    <div className="card">
      <h2>Uploaded Problems</h2>
      <ul>
        {entries.map((title, i) => (
          <li key={i}>🤖 {title} — pushed successfully</li>
        ))}
      </ul>
    </div>
  );
}
