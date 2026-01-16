const btn = document.getElementById("submitBtn");
const statusBox = document.getElementById("status");

btn.addEventListener("click", async () => {
  const input = document.getElementById("url").value.trim();
  const lang = document.getElementById("lang").value;
  const code = document.getElementById("code").value.trim();

  if (!input || !code) {
    statusBox.textContent = "❌ Please fill all fields\n";
    return;
  }

  // DO NOT clear aggressively
  statusBox.textContent = "⏳ Processing...\n";

  try {
    const res = await fetch("http://localhost:3000/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, lang, code })
    });

    const text = await res.text(); // 👈 IMPORTANT
    console.log("RAW RESPONSE 👉", text);

    if (!res.ok) throw new Error("Push failed");

    // ✅ FORCE PRINT SUCCESS
    statusBox.textContent += "✅ Added problem folder\n";
    statusBox.textContent += "🤖 Local git commit completed\n";
    statusBox.textContent += "🚀 Code pushed to GitHub successfully\n";

  } catch (err) {
    statusBox.textContent += `❌ ERROR: ${err.message}\n`;
  }
});
