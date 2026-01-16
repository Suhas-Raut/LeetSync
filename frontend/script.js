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

  statusBox.textContent = "⏳ Processing...";

  try {
    const res = await fetch("http://localhost:3000/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, lang, code })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    // Update status box
    statusBox.textContent =
      `✅ Pushed!\n\n` +
      `ID: ${data.data.id}\n` +
      `Title: ${data.data.title}\n` +
      `Difficulty: ${data.data.difficulty}`;

    // ✅ Call the notification function here
    showSuccessNotification(data.data);

  } catch (err) {
    statusBox.textContent = "❌ " + err.message;
  }
});

/* ------------------ Notification Function ------------------ */
function showSuccessNotification(problem) {
  if (!("Notification" in window)) return; // Browser doesn't support

  if (Notification.permission === "granted") {
    new Notification("LeetSync ✅", {
      body: `Problem "${problem.title}" successfully pushed to GitHub!`,
      icon: "favicon.png",
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("LeetSync ✅", {
          body: `Problem "${problem.title}" successfully pushed to GitHub!`,
          icon: "favicon.png",
        });
      }
    });
  }
}
