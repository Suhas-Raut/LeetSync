const btn = document.getElementById("submitBtn");
const statusBox = document.getElementById("status");

btn.addEventListener("click", async () => {
  const input = document.getElementById("url").value.trim();
  const lang = document.getElementById("lang").value;
  const code = document.getElementById("code").value.trim();

  if (!input || !code) {
    statusBox.textContent = "❌ Please fill all fields";
    return;
  }

  // Reset status log
  statusBox.textContent = "⏳ Processing...\n";

  try {
    const res = await fetch("http://localhost:3000/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, lang, code })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Backend error");
    }

    // ✅ SUCCESS LOG BOX (terminal-style)
    statusBox.textContent = "";

    if (Array.isArray(data.logs)) {
      data.logs.forEach(line => {
        statusBox.textContent += line + "\n";
      });
    } else {
      statusBox.textContent = "⚠️ No logs received from backend";
    }

  } catch (err) {
    statusBox.textContent = "❌ " + err.message;
  }
});
