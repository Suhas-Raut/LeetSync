import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* ---------------- PROJECT ROOT ---------------- */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
            id: id?.trim(),
            title: title?.trim(),
            difficulty: normalizeDifficulty(difficulty),
            tags: normalizeTags(tags)
          };
        });
    }
  } else {
    fs.writeFileSync(TRACKER_FILE, "id,title,difficulty,tags");
  }

  // 2️⃣ Append new problem safely
  if (!data.find(p => p.id === problem.id)) {
    const cleanDifficulty = normalizeDifficulty(problem.difficulty);
    const cleanTags = normalizeTags(problem.tags.join("|"));

    fs.appendFileSync(
      TRACKER_FILE,
      `\n${problem.id},${problem.title},${cleanDifficulty},${cleanTags.join("|")}`
    );

    data.push({
      id: problem.id,
      title: problem.title,
      difficulty: cleanDifficulty,
      tags: cleanTags
    });
  }

  // 3️⃣ Count totals (clean data only)
  const counts = {
    difficulty: { Easy: 0, Medium: 0, Hard: 0 },
    tags: {}
  };

  for (const p of data) {
    if (counts.difficulty[p.difficulty] !== undefined) {
      counts.difficulty[p.difficulty]++;
    }

    for (const tag of p.tags) {
      counts.tags[tag] = (counts.tags[tag] || 0) + 1;
    }
  }

  // 4️⃣ Generate README
  let readme = "# 📘 LeetCode Progress Tracker\n\n";
  readme += "## 🧠 LeetCode DSA\n\n";

  readme += "### Difficulty\n\n";
  readme += "| Level | Count |\n|-------|-------|\n";
  ["Easy", "Medium", "Hard"].forEach(level => {
    readme += `| ${level} | ${counts.difficulty[level]} |\n`;
  });

  readme += "\n### DSA Topics\n\n";
  readme += "| Topic | Count |\n|-------|-------|\n";

  Object.entries(counts.tags)
    .sort((a, b) => b[1] - a[1])
    .forEach(([tag, count]) => {
      readme += `| ${tag} | ${count} |\n`;
    });

  fs.writeFileSync(ROOT_README, readme);
}

/* ---------------- HELPERS ---------------- */

function normalizeDifficulty(diff = "") {
  const d = diff.trim().toLowerCase();
  if (d === "easy") return "Easy";
  if (d === "medium") return "Medium";
  if (d === "hard") return "Hard";
  return "Easy";
}

function normalizeTags(raw = "") {
  if (!raw) return [];

  return [...new Set(
    raw
      .split("|")
      .map(t => t.trim())
      .filter(Boolean)
  )];
}
