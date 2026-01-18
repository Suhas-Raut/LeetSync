// frontend/src/components/Dashboard.jsx
import { useState } from "react";
import SubmitCard from "./SubmitCard";
import { runLeetSync } from "../api";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ url, lang, code }) {
    setLoading(true);
    setLogs(["⏳ Running LeetSync..."]);

    try {
      const res = await runLeetSync({ url, lang, code });

      // backend returns { success, logs }
      setLogs(res.logs || []);
      setHistory((prev) => [`✅ ${url} pushed`, ...prev]);
    } catch (err) {
      setLogs((prev) => [...prev, `❌ ${err.message}`]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard">
      <SubmitCard onSubmit={handleSubmit} loading={loading} />

      <div className="card">
        <h3>Status</h3>
        <pre>{logs.join("\n")}</pre>
      </div>

      <div className="card">
        <h3>History</h3>
        <ul>
          {history.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
