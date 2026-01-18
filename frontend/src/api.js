const API_BASE = "http://localhost:3000";

export async function pushProblem({ input, lang, code, onLog }) {
  const res = await fetch(`${API_BASE}/push`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input, lang, code })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Push failed");
  }

  const data = await res.json();

  if (onLog && Array.isArray(data.logs)) {
    for (const log of data.logs) {
      onLog(log);
      await new Promise(r => setTimeout(r, 300));
    }
  }

  return data.data;
}
