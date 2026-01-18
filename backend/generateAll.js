import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runLeetSync({ url, lang, code }) {
  return new Promise((resolve, reject) => {
    const logs = [];

    const worker = spawn(
      "node",
      ["scripts/index.js", url, lang, code],
      {
        cwd: __dirname,
        env: process.env,
        shell: true,
      }
    );

    worker.stdout.on("data", (data) => {
      logs.push(data.toString());
      console.log(data.toString());
    });

    worker.stderr.on("data", (data) => {
      logs.push("❌ " + data.toString());
      console.error(data.toString());
    });

    worker.on("close", (code) => {
      if (code === 0) resolve(logs);
      else reject(new Error("Worker exited with code " + code));
    });
  });
}
