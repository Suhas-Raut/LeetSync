export default function History({ items }) {
  if (!items.length) return null;

  return (
    <section className="history">
      <h2>Submission History</h2>
      <ul>
        {items.map((h) => (
          <li key={h.id}>
            <span>{h.url}</span>
            <small>{h.time}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
