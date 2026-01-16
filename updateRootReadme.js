import fs from "fs";
import path from "path";

/**
 * Incrementally update the root README without losing old counts.
 * @param {object} problem - { id, title, difficulty, tags: [] }
 */
export function updateRootReadme(problem) {
  const readmePath = path.join(process.cwd(), "README.md");

  // Initialize counts if README doesn't exist
  let content = "";
  let difficultyCount = { Easy: 0, Medium: 0, Hard: 0 };
  let dsaCount = {};

  if (fs.existsSync(readmePath)) {
    content = fs.readFileSync(readmePath, "utf-8");

    // Read difficulty table
    const diffRegex = /\| Easy\s*\|\s*(\d+)/i;
    const medRegex = /\| Medium\s*\|\s*(\d+)/i;
    const hardRegex = /\| Hard\s*\|\s*(\d+)/i;

    difficultyCount.Easy = diffRegex.test(content) ? parseInt(content.match(diffRegex)[1]) : 0;
    difficultyCount.Medium = medRegex.test(content) ? parseInt(content.match(medRegex)[1]) : 0;
    difficultyCount.Hard = hardRegex.test(content) ? parseInt(content.match(hardRegex)[1]) : 0;

    // Read DSA table
    const dsaRegex = /\| ([\w-]+) \| (\d+) \|/g;
    let match;
    while ((match = dsaRegex.exec(content)) !== null) {
      dsaCount[match[1]] = parseInt(match[2]);
    }
  }

  // Increment difficulty
  if (problem.difficulty && difficultyCount[problem.difficulty] != null) {
    difficultyCount[problem.difficulty]++;
  }

  // Increment DSA topic counts
  for (const tag of problem.tags) {
    if (!dsaCount[tag]) dsaCount[tag] = 0;
    dsaCount[tag]++;
  }

  // Build updated README
  let newReadme = `# 📘 LeetCode Progress Tracker

## Difficulty
| Level | Count |
|-------|-------|
| Easy  | ${difficultyCount.Easy} |
| Medium| ${difficultyCount.Medium} |
| Hard  | ${difficultyCount.Hard} |

## DSA
| Topic | Count |
`;

  for (const [topic, count] of Object.entries(dsaCount)) {
    newReadme += `| ${topic} | ${count} |\n`;
  }

  fs.writeFileSync(readmePath, newReadme);
  console.log("✅ Root README updated incrementally!");
}
