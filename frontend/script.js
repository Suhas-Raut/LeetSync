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

  // Reset UI
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

    // 🟡 Print logs slowly (no refresh)
    if (Array.isArray(data.logs)) {
      for (const line of data.logs) {
        statusBox.textContent += line + "\n";
        await new Promise(r => setTimeout(r, 500)); // 500ms (smooth)
      }
    } else {
      statusBox.textContent += "⚠️ No logs received from backend\n";
    }

    // 🟢 Success glow AFTER logs finish
    successLog.textContent = `✅ Code successfully pushed: "${data?.data?.title || "Unknown"}"`;
    successLog.classList.add("success-glow");

    setTimeout(() => {
      successLog.classList.remove("success-glow");
    }, 3000);

  } catch (err) {
    successLog.textContent = `❌ FAILED to push code\n${err.message}`;
  }
});
