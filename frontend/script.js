import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

const status = document.getElementById("status");
const btn = document.getElementById("submitBtn");

listen("log", e => {
  status.textContent += e.payload + "\n";
});

btn.addEventListener("click", async () => {
  status.textContent = "⏳ Working...\n";

  await invoke("run_leetsync", {
    input: document.getElementById("url").value,
    lang: document.getElementById("lang").value,
    code: document.getElementById("code").value
  });
});
