import { execSync } from "child_process";

export function pushProblemLocal(problemId, problemTitle) {
  try {
    execSync("git add .", { stdio: "inherit" });

    execSync(
      `git commit -m "LC ${problemId}: ${problemTitle}"`,
      { stdio: "inherit" }
    );

    execSync("git push origin main", { stdio: "inherit" });

    console.log("🤖 Local git commit and push completed!");
  } catch (err) {
    console.error("❌ Git operation failed");
    console.error(err.message);
  }
}
