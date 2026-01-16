import fs from "fs";
import path from "path";

export function updateRootReadme(problem) {
  const TRACKER_FILE = path.join(process.cwd(), "tracker.csv");

  // Read existing CSV
  let data = [];
  if (fs.existsSync(TRACKER_FILE)) {
    data = fs.readFileSync(TRACKER_FILE, "utf-8")
      .trim()
      .split("\n")
      .slice(1)
      .map(line => {
        const [id, title, difficulty, tags] = line.split(",");
        return { id, title, difficulty, tags: tags.split("|") };
      });
  }

  // Append new problem if not already present
  if (!data.find(p => p.id === problem.id)) {
    fs.appendFileSync(
      TRACKER_FILE,
      `\n${problem.id},${problem.title},${problem.difficulty},${problem.tags.join("|")}`
    );
    data.push({
      id: problem.id,
      title: problem.title,
      difficulty: problem.difficulty,
      tags: problem.tags
    });
  }

  // Count totals
  const counts = data.reduce((acc, p) => {
    acc.difficulty[p.difficulty] = (acc.difficulty[p.difficulty] || 0) + 1;
   p.tags.forEach(t => {
  const tag = t.trim();
  acc.tags[tag] = (acc.tags[tag] || 0) + 1;
});

    return acc;
  }, { difficulty: {}, tags: {} });

  // Generate README
// Generate README
let readmeContent = "# 📘 LeetCode Progress Tracker\n\n";

readmeContent += "## 🧠 LeetCode DSA\n\n";

/* ---------- Difficulty ---------- */
readmeContent += "### Difficulty\n\n";
readmeContent += "| Level | Count |\n|-------|-------|\n";
["Easy", "Medium", "Hard"].forEach(level => {
  readmeContent += `| ${level} | ${counts.difficulty[level] || 0} |\n`;
});

/* ---------- DSA Topics ---------- */
readmeContent += "\n### DSA Topics\n\n";
readmeContent += "| Topic | Count |\n|-------|-------|\n";
for (const [tag, count] of Object.entries(counts.tags)) {
  readmeContent += `| ${tag} | ${count} |\n`;
}

fs.writeFileSync(path.join(process.cwd(), "README.md"), readmeContent);


