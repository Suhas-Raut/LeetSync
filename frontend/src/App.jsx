import { useState } from "react";
import { runLeetSync } from "./api";
import Header from "./components/Header";
import SubmitCard from "./components/SubmitCard";
import LogsPanel from "./components/LogsPanel";
import History from "./components/History";
// frontend/src/App.jsx
import Dashboard from "./components/Dashboard";


export default function App() {
  const [logs, setLogs] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    setLogs(["⏳ Running LeetSync..."]);

    try {
      const res = await runLeetSync(data);

      setLogs(res.logs || ["✅ Done"]);
      setHistory((h) => [
        {
          id: Date.now(),
          url: data.url,
          time: new Date().toLocaleTimeString(),
        },
        ...h,
      ]);
    } catch (err) {
      setLogs((l) => [...l, `❌ ${err.message}`]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="grid">
        <SubmitCard onSubmit={handleSubmit} loading={loading} />
        <LogsPanel logs={logs} />
      </div>
      <History items={history} />
      <Dashboard />
    </>
  
  );
}
