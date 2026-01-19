import { execSync } from "child_process";

export function pushProblemLocal(problemId, problemTitle) {
  try {
    execSync("git add .", { stdio: "pipe" });

    execSync(
      `git commit -m "LC ${problemId}: ${problemTitle}"`,
      { stdio: "pipe" }
    );

    execSync("git push origin main", { stdio: "pipe" });

    return "🎉 Git commit & push successful";

  } catch (err) {
    const output =
      err.stdout?.toString() ||
      err.stderr?.toString() ||
      err.message;

    if (output.includes("nothing to commit")) {
      return "⚠️ No changes to commit (already synced)";
    }

    throw new Error(`Git failed: ${output}`);
  }
}
