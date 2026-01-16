const btn = document.getElementById("submitBtn");
const statusBox = document.getElementById("status");
const historyList = document.getElementById("historyList");

btn.addEventListener("click", async () => {
  const input = document.getElementById("url").value.trim();
  const lang = document.getElementById("lang").value;
  const code = document.getElementById("code").value.trim();

  if (!input || !code) {
    statusBox.textContent = "❌ Please fill all fields";
    return;
  }

  statusBox.textContent = "⏳ Working on it...\n";

  try {
    const res = await fetch("http://localhost:3000/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, lang, code })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Push failed");

    // ✅ STATUS LOGS
    if (Array.isArray(data.logs)) {
      for (const line of data.logs) {
        statusBox.textContent += line + "\n";
        await new Promise(r => setTimeout(r, 400));
      }
    }

    statusBox.textContent += "\n🤖 Successfully pushed to GitHub";

    // ✅ HISTORY ENTRY (NOW WORKS)
    const li = document.createElement("li");
    li.textContent = `🤖 ${data.data.title} — pushed successfully`;
    historyList.prepend(li);

  } catch (err) {
    statusBox.textContent += `\n❌ ${err.message}`;
  }
});
