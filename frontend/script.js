const btn = document.getElementById("submitBtn");
const statusBox = document.getElementById("status");
const historyList = document.getElementById("historyList");

btn.addEventListener("click", async () => {
  statusBox.textContent = "⏳ Sending request...\n";
  console.log("🌐 FETCH STARTED");

  try {
    const res = await fetch("http://localhost:3000/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: "https://leetcode.com/problems/zigzag-conversion",
        lang: "cpp",
        code: "TEST"
      })
    });

    console.log("📡 RESPONSE STATUS:", res.status);

    const raw = await res.text();
    console.log("📦 RAW RESPONSE:", raw);

    statusBox.textContent += "📦 Raw response received\n";

  } catch (err) {
    console.error("❌ FETCH ERROR:", err);
    statusBox.textContent += "❌ Fetch failed\n";
  }
});
