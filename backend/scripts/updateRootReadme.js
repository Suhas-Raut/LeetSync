import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* ---------------- PROJECT ROOT ---------------- */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// D:/Projects/LeetSync
const PROJECT_ROOT = path.resolve(__dirname, "../..");

/* ---------------- PATHS ---------------- */

const TRACKER_FILE = path.join(PROJECT_ROOT, "tracker.csv");
const ROOT_README = path.join(PROJECT_ROOT, "README.md");

/* ---------------- MAIN ---------------- */

export function updateRootReadme(problem) {
  let data = [];

  // 1️⃣ Read tracker.csv
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

  // 2️⃣ Append if new
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

  // 3️⃣ Count totals
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

  readme += "### Difficulty\n\n";
  readme += "| Level | Count |\n|-------|-------|\n";
  ["Easy", "Medium", "Hard"].forEach(level => {
    readme += `| ${level} | ${counts.difficulty[level] || 0} |\n`;
  });

  readme += "\n### DSA Topics\n\n";
  readme += "| Topic | Count |\n|-------|-------|\n";
  Object.entries(counts.tags).forEach(([tag, count]) => {
    readme += `| ${tag} | ${count} |\n`;
  });

  fs.writeFileSync(ROOT_README, readme);
}
