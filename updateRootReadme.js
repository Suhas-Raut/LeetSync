import fs from "fs";
import path from "path";
import { TAG_TO_DSA } from "./tagMapper.js";

/**
 * Updates the root README with progress stats
 */
export function updateRootReadme() {
  const baseDir = process.cwd();

  const difficultyCount = { Easy: 0, Medium: 0, Hard: 0 };
  const dsaCount = {};

  // Scan all DSA folders
  for (const folder of fs.readdirSync(baseDir, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    if (folder.name === "frontend") continue;

    const dsaFolder = folder.name;
    const problems = fs.readdirSync(path.join(baseDir, dsaFolder), { withFileTypes: true })
      .filter(f => f.isDirectory());

    dsaCount[dsaFolder] = problems.length;

    // Count difficulty from each README inside the folder
    for (const prob of problems) {
      const readmePath = path.join(baseDir, dsaFolder, prob.name, "README.md");
      if (!fs.existsSync(readmePath)) continue;
      const content = fs.readFileSync(readmePath, "utf-8");
      if (content.includes("Difficulty: Easy")) difficultyCount.Easy++;
      else if (content.includes("Difficulty: Medium")) difficultyCount.Medium++;
      else if (content.includes("Difficulty: Hard")) difficultyCount.Hard++;
    }
  }

  // Build README content
  let readmeContent = `# 📘 LeetCode Progress Tracker

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
    readmeContent += `| ${dsa} | ${count} |\n`;
  }

  fs.writeFileSync(path.join(baseDir, "README.md"), readmeContent);
  console.log("✅ Root README updated with full counts!");
}
