import { useState } from "react";
import { pushProblem } from "../api";

export default function ProblemForm({ onHistoryUpdate }) {
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("cpp");
  const [code, setCode] = useState("");
  const [logs, setLogs] = useState("");

  const handlePush = async () => {
    if (!input || !code) {
      setLogs("❌ Please fill all fields");
      return;
    }

    setLogs("⏳ Working...\n");

    try {
      const data = await pushProblem({
        input,
        lang,
        code,
        onLog: (msg) => setLogs((prev) => prev + msg + "\n")
      });

      setLogs((prev) => prev + "\n🤖 Successfully pushed!");
      onHistoryUpdate?.(data.title);
    } catch (err) {
      setLogs((prev) => prev + `\n❌ ${err.message}`);
    }
  };

  return (
    <div className="card">
      <h2>Submit Problem</h2>

      <input
        placeholder="LeetCode URL or Problem Number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="cpp">C++</option>
        <option value="js">JavaScript</option>
        <option value="python">Python</option>
      </select>

      <textarea
        placeholder="// Paste your code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handlePush}>Push to GitHub</button>

      <pre>{logs}</pre>
    </div>
  );
}
