import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👉 points to D:/Projects/LeetSync
const PROJECT_ROOT = path.resolve(__dirname, "..", "..");

export function pushProblemLocal(problemId, problemTitle) {
  try {
    const opts = {
      cwd: PROJECT_ROOT,
      stdio: "pipe",
    };

    execSync("git add .", opts);

    execSync(
      `git commit -m "📘 LC ${problemId}: ${problemTitle}"`,
      opts
    );

    execSync("git push origin main", opts);

    return "🎉 Git commit & push successful";

  } catch (err) {
    const output =
      err.stdout?.toString() ||
      err.stderr?.toString() ||
      err.message;

    if (output.includes("nothing to commit")) {
      return "⚠️ No changes to commit (already synced)";
    }

    throw new Error(output);
  }
}
