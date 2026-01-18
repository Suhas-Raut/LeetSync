import { useState } from "react";

export default function SubmitCard({ onSubmit, loading }) {
  const [url, setUrl] = useState("");
  const [lang, setLang] = useState("cpp");
  const [code, setCode] = useState("");

  function handleClick() {
    if (!url || !code) {
      alert("Missing input");
      return;
    }

    onSubmit({ url, lang, code });
  }

  return (
    <div className="card">
      <h2>Submit Problem</h2>

      <input
        placeholder="LeetCode URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="cpp">C++</option>
        <option value="js">JavaScript</option>
        <option value="python">Python</option>
      </select>

      <textarea
        placeholder="Paste your solution code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button disabled={loading} onClick={handleClick}>
        {loading ? "Running..." : "Push to GitHub"}
      </button>
    </div>
  );
}
