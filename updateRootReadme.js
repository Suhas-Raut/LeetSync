import fs from "fs";
import path from "path";

/**
 * Updates the root README with full stats (accumulative)
 */
export function updateRootReadme() {
  const baseDir = process.cwd();
  const difficultyCount = { Easy: 0, Medium: 0, Hard: 0 };
  const dsaCount = {};

  // Get all DSA folders
  const folders = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(f => f.isDirectory() && f.name !== "frontend");

  for (const folder of folders) {
    const dsaFolder = folder.name;
    dsaCount[dsaFolder] = 0;

    const problems = fs.readdirSync(path.join(baseDir, dsaFolder), { withFileTypes: true })
      .filter(f => f.isDirectory());

    for (const prob of problems) {
      const readmePath = path.join(baseDir, dsaFolder, prob.name, "README.md");
      if (!fs.existsSync(readmePath)) continue;
      const content = fs.readFileSync(readmePath, "utf-8");

      // Count difficulty reliably
      if (/Difficulty:\s*Easy/i.test(content)) difficultyCount.Easy++;
      else if (/Difficulty:\s*Medium/i.test(content)) difficultyCount.Medium++;
      else if (/Difficulty:\s*Hard/i.test(content)) difficultyCount.Hard++;

      // Count DSA topic
      dsaCount[dsaFolder]++;
    }
  }

  // Build README
  let readme = `# 📘 LeetCode Progress Tracker

## Difficulty
| Level | Count |
|-------|-------|
| Easy  | ${difficultyCount.Easy} |
| Medium| ${difficultyCount.Medium} |
| Hard  | ${difficultyCount.Hard} |

## DSA
| Topic | Count |
`;

  for (const [dsa, count] of Object.entries(dsaCount)) {
    readme += `| ${dsa} | ${count} |\n`;
  }

  fs.writeFileSync(path.join(baseDir, "README.md"), readme);
  console.log("✅ Root README fully updated!");
}
