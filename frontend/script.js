const btn = document.getElementById("submitBtn");
const statusBox = document.getElementById("status");     // previous logs
const successLog = document.getElementById("successLog"); // success only

btn.addEventListener("click", async () => {
  const input = document.getElementById("url").value.trim();
  const lang = document.getElementById("lang").value;
  const code = document.getElementById("code").value.trim();

  if (!input || !code) {
    successLog.textContent = "❌ Please fill all fields";
    return;
  }

  // Clear both boxes
  statusBox.textContent = "⏳ Processing logs...\n";
  successLog.textContent = "";

  try {
    const res = await fetch("http://localhost:3000/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, lang, code })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // ✅ Print backend logs in statusBox with 500ms delay
    if (Array.isArray(data.logs)) {
      for (const line of data.logs) {
        statusBox.textContent += line + "\n";
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
      }
    } else {
      statusBox.textContent += "⚠️ No logs received from backend\n";
    }

    // 🔥 Success message with green glow
    successLog.textContent = `✅ Code successfully pushed: "${data.data.title}"`;
    successLog.classList.add("success-glow");

    // Remove glow after 3s
    setTimeout(() => {
      successLog.classList.remove("success-glow");
    }, 3000);

  } catch (err) {
    successLog.textContent = `❌ FAILED to push code\n${err.message}`;
  }
});
