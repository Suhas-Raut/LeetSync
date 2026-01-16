const btn = document.getElementById("submitBtn");
const successLog = document.getElementById("successLog");

btn.addEventListener("click", async () => {
  const input = document.getElementById("url").value.trim();
  const lang = document.getElementById("lang").value;
  const code = document.getElementById("code").value.trim();

  if (!input || !code) {
    successLog.textContent = "❌ Please fill all fields";
    return;
  }

  successLog.textContent = "⏳ Processing...\n";

  try {
    const res = await fetch("http://localhost:3000/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, lang, code })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // ✅ SUCCESS PRINT
    successLog.textContent =
      "✅ SUCCESSFULLY PUSHED\n\n" +
      `🆔 ID: ${data.data.id}\n` +
      `📌 Title: ${data.data.title}\n` +
      `⚡ Difficulty: ${data.data.difficulty}\n\n` +
      "🚀 Code pushed to GitHub successfully";

  } catch (err) {
    successLog.textContent =
      "❌ FAILED\n\n" +
      err.message;
  }
});
