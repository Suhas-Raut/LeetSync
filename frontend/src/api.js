const API_BASE = "http://localhost:3001"; // <--- match your backend port

// frontend/src/api.js
export async function runLeetSync({ url, lang, code }) {
  const res = await fetch("http://localhost:3001/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, lang, code }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Backend failed");
  }

  return data.logs; // <-- return logs to frontend
}
