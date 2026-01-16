const btn = document.getElementById("submitBtn");
const statusBox = document.getElementById("status");

btn.addEventListener("click", async () => {
  const input = document.getElementById("url").value.trim();
  const lang = document.getElementById("lang").value;
  const code = document.getElementById("code").value.trim();

  if (!input || !code) {
    statusBox.textContent += "\n❌ Please fill all fields\n";
    return;
  }

  statusBox.textContent = "⏳ Processing logs...\n";

  try {
const res = await fetch("http://localhost:3000/push", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ input, lang, code })
});

const data = await res.json();

// 👇 YAHAN DAAL
console.log("BACKEND RESPONSE 👉", data);

if (!res.ok) throw new Error(data.error || "Push failed");


    if (Array.isArray(data.logs)) {
      data.logs.forEach(line => {
        statusBox.textContent += line + "\n";
      });
    }

  } catch (err) {
    statusBox.textContent += `\n❌ ERROR: ${err.message}\n`;
  }
});
