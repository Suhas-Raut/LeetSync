import fs from "fs";
import path from "path";

export function updateRootReadme(problem) {
  const TRACKER_FILE = path.join(process.cwd(), "tracker.csv");

  // 1️⃣ Read existing CSV
  let data = [];
  if (fs.existsSync(TRACKER_FILE)) {
    const raw = fs.readFileSync(TRACKER_FILE, "utf-8").trim();

    if (raw.length > 0) {
      data = raw
        .split("\n")
        .slice(1)
        .map(line => {
          const [id, title, difficulty, tags] = line.split(",");
          return {
            id,
            title,
            difficulty,
            tags: tags ? tags.split("|") : []
          };
        });
    }
  } else {
    fs.writeFileSync(TRACKER_FILE, "id,title,difficulty,tags");
  }

  // 2️⃣ Append new problem
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

  // 3️⃣ Count totals (data IS VALID HERE)
  const counts = data.reduce(
    (acc, p) => {
      acc.difficulty[p.difficulty] =
        (acc.difficulty[p.difficulty] || 0) + 1;

      p.tags.forEach(tag => {
        if (!tag) return;
        acc.tags[tag] = (acc.tags[tag] || 0) + 1;
      });

      return acc;
    },
    { difficulty: {}, tags: {} }
  );

// 4️⃣ Generate README
let readme = "# 📘 LeetCode Progress Tracker\n\n";
readme += "## 🧠 LeetCode DSA\n\n";

// Difficulty table
readme += "### Difficulty\n\n";
readme += "| Level | Count |\n|-------|-------|\n";
["Easy", "Medium", "Hard"].forEach(level => {
  readme += `| ${level} | ${counts.difficulty[level] || 0} |\n`;
});

// DSA Topics table with clickable links
readme += "\n### DSA Topics\n\n";
readme += "| Topic | Count |\n|-------|-------|\n";

Object.entries(counts.tags).forEach(([tag, count]) => {
  readme += `| ${tag} | ${count} |\n`; // ✅ plain text, no link
});


fs.writeFileSync(path.join(process.cwd(), "README.md"), readme);

}
