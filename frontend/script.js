const btn = document.getElementById("submitBtn");
const statusBox = document.getElementById("status");
const successLog = document.getElementById("successLog");

btn.addEventListener("click", async () => {
  const input = document.getElementById("url").value.trim();
  const lang = document.getElementById("lang").value;
  const code = document.getElementById("code").value.trim();

  if (!input || !code) {
    successLog.textContent = "❌ Please fill all fields";
    return;
  }

  // Reset UI ONCE
  statusBox.textContent = "⏳ Processing logs...\n";
  successLog.textContent = "";

  try {
    const res = await fetch("http://localhost:3000/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, lang, code })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Push failed");

    // 🟡 Print backend logs slowly
    if (Array.isArray(data.logs)) {
      for (const line of data.logs) {
        statusBox.textContent += line + "\n";
        await new Promise(r => setTimeout(r, 500)); // smooth typing
      }
    }

    // 🛑 STOP status log here (nothing overwrites it)

    // 🤖 Success message
    successLog.textContent = "🤖 Successfully pushed to GitHub";
    successLog.classList.add("success-glow");

    // ⏳ Wait 10 seconds
    await new Promise(r => setTimeout(r, 10000));

    // ✅ Done message
    successLog.textContent = "✅ Done published";

    // 🔁 OPTIONAL: refresh after 2s
    setTimeout(() => {
      location.reload();
    }, 2000);

  } catch (err) {
    successLog.textContent = `❌ FAILED to push code\n${err.message}`;
  }
});
