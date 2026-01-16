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

  statusBox.textContent = "⏳ Processing...\n";

  try {
    const res = await fetch("http://localhost:3000/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, lang, code })
    });

const data = await res.json();
console.log("BACKEND RESPONSE 👉", data);

if (!res.ok) throw new Error(data.error);

// clear
statusBox.textContent = "";

// print backend logs
if (Array.isArray(data.logs)) {
  data.logs.forEach(line => {
    statusBox.textContent += line + "\n";
  });
} else {
  statusBox.textContent = "⚠️ No logs received from backend";
}

showSuccessNotification(data.data);
showToast(`✅ ${data.data.title} pushed to GitHub`);


  } catch (err) {
    statusBox.textContent = "❌ " + err.message;
  }
});

/* ------------------ Desktop Notification ------------------ */
function showSuccessNotification(problem) {
  if (!("Notification" in window)) return;

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

/* ------------------ Toast ------------------ */
function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.className = "toast success show";

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, 3000);
}
