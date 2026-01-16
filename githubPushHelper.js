import { execSync } from "child_process";
import path from "path";

/**
 * Perform a local Git add, commit, and push for the given folder.
 * @param {string} problemId
 * @param {string} problemTitle
 */
export function pushProblemLocal(problemId, problemTitle) {
  try {
    // Stage all changes
    execSync("git add .", { stdio: "ignore" });

    // Commit changes
    execSync(
      `git commit -m "📘 LC ${problemId}: ${problemTitle}"`,
      { stdio: "ignore" }
    );

    // Push to remote main branch
    execSync("git push origin main", { stdio: "ignore" });

    console.log("🤖 Local git commit and push completed!");
  } catch (err) {
    console.log("⚠️ Git commit/push skipped (not a git repo or remote not set)");
  }
}
