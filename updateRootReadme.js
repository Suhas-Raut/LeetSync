import fs from "fs";
import path from "path";

const TRACKER_FILE = path.join(process.cwd(), ".leetsync.json");
const ROOT_README = path.join(process.cwd(), "README.md");

export function updateRootReadme(problem) {
  let tracker = {
    problems: [],
    counts: { Easy: 0, Medium: 0, Hard: 0, DSA: {} }
  };

  // ✅ Load existing tracker if exists
  if (fs.existsSync(TRACKER_FILE)) {
    tracker = JSON.parse(fs.readFileSync(TRACKER_FILE, "utf-8"));
  }

  // Check if problem already exists
  if (!tracker.problems.some(p => p.id === problem.id)) {
    tracker.problems.push({
      id: problem.id,
      title: problem.title,
      difficulty: problem.difficulty,
      tags: problem.tags
    });

    // Increment difficulty count
    tracker.counts[problem.difficulty] = (tracker.counts[problem.difficulty] || 0) + 1;

    // Increment DSA counts
    problem.tags.forEach(tag => {
      tracker.counts.DSA[tag] = (tracker.counts.DSA[tag] || 0) + 1;
    });

    // Save updated tracker
    fs.writeFileSync(TRACKER_FILE, JSON.stringify(tracker, null, 2));
  }

  // Generate README from tracker
  const lines = [];
  lines.push("# 📘 LeetCode Progress Tracker\n");
  lines.push("## Difficulty\n");
  lines.push("| Level | Count |");
  lines.push("|-------|-------|");
  lines.push(`| Easy | ${tracker.counts.Easy} |`);
  lines.push(`| Medium | ${tracker.counts.Medium} |`);
  lines.push(`| Hard | ${tracker.counts.Hard} |`);
  lines.push("\n## DSA Topics\n");
  lines.push("| Topic | Count |");
  lines.push("|-------|-------|");
  for (const [tag, count] of Object.entries(tracker.counts.DSA)) {
    lines.push(`| ${tag} | ${count} |`);
  }

  fs.writeFileSync(ROOT_README, lines.join("\n"));
}
