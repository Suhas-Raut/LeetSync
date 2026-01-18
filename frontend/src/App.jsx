import { useState } from "react";
import ProblemForm from "./components/ProblemForm";
import History from "./components/History";
import "./App.css";

export default function App() {
  const [history, setHistory] = useState([]);

  return (
    <div className="container">
      <ProblemForm onHistoryUpdate={(title) => setHistory([title, ...history])} />
      <History entries={history} />
    </div>
  );
}
