import fs from "fs";
import path from "path";

const ROOT_README = path.join(process.cwd(), "README.md");

export function updateRootReadme(problem, dsaFolders) {
  const data = loadData();

  // Update difficulty count
  data.difficulty[problem.difficulty] =
    (data.difficulty[problem.difficulty] || 0) + 1;

  // Update DSA counts
  for (const dsa of dsaFolders) {
    data.dsa[dsa] = (data.dsa[dsa] || 0) + 1;
  }

  saveData(data);
  const markdown = buildRootReadme(data);
  fs.writeFileSync(ROOT_README, markdown);
}

/* ---------------- HELPERS ---------------- */

function loadData() {
  if (!fs.existsSync(ROOT_README)) {
    return {
      difficulty: {},
      dsa: {}
    };
  }

  const content = fs.readFileSync(ROOT_README, "utf8");

  return {
    difficulty: extractTable(content, "Difficulty"),
    dsa: extractTable(content, "DSA")
  };
}

function extractTable(content, section) {
  const map = {};
  const regex = new RegExp(`## ${section}[\\s\\S]*?\\n\\n`, "m");
  const match = content.match(regex);

  if (!match) return map;

  const rows = match[0].split("\n").slice(3);
  for (const row of rows) {
    if (!row.includes("|")) continue;
    const [key, val] = row.split("|").map(s => s.trim());
    if (key && val && !isNaN(val)) {
      map[key] = Number(val);
    }
  }
  return map;
}

function saveData(data) {
  fs.writeFileSync(
    ".leetsync.json",
    JSON.stringify(data, null, 2)
  );
}

function buildRootReadme(data) {
  return `
# 📘 LeetCode Progress Tracker

## Difficulty
| Level | Count |
|------|-------|
| Easy | ${data.difficulty.Easy || 0} |
| Medium | ${data.difficulty.Medium || 0} |
| Hard | ${data.difficulty.Hard || 0} |

## DSA
| Topic | Count |
|------|-------|
${Object.entries(data.dsa)
  .map(([k, v]) => `| ${k} | ${v} |`)
  .join("\n")}

---
_Updated automatically by **LeetSync** 🚀_
`;
}
