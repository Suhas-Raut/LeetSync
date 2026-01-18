import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";

const btn = document.getElementById("submitBtn");
const status = document.getElementById("status");
const history = document.getElementById("historyList");
const url = document.getElementById("url");
const lang = document.getElementById("lang");
const code = document.getElementById("code");

// Listen for log events emitted from Rust
listen("log", event => {
  status.textContent += event.payload + "\n";
  status.scrollTop = status.scrollHeight;
});

btn.addEventListener("click", async () => {
  const inputVal = url.value.trim();
  const langVal = lang.value;
  const codeVal = code.value.trim();

  if (!inputVal || !codeVal) {
    status.textContent = "❌ Missing input/code\n";
    return;
  }

  status.textContent = "⏳ Working...\n";

  try {
    // invoke the Rust backend
    const result = await invoke("run_leetsync", {
      input: inputVal,
      lang: langVal,
      code: codeVal
    });

    // Log success
    status.textContent += `🤖 Successfully pushed: ${inputVal}\n`;

    // Update history
    const li = document.createElement("li");
    li.textContent = `🤖 ${inputVal} pushed successfully`;
    history.prepend(li);

  } catch (err) {
    status.textContent += `❌ Failed: ${err}\n`;
  }
});
