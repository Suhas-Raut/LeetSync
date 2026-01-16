import fs from "fs";
import path from "path";

export function updateTopicReadme(topicPath, problem) {
  const readmePath = path.join(topicPath, "README.md");

  let lines = [];

  // If README exists → read it
  if (fs.existsSync(readmePath)) {
    lines = fs.readFileSync(readmePath, "utf-8").split("\n");
  } else {
    // Create header if first time
    lines.push(`# ${path.basename(topicPath)}`);
    lines.push("");
    lines.push("## Problems");
    lines.push("");
  }

  const entry = `- **${problem.id}. ${problem.title}** (${problem.difficulty})`;

  // Prevent duplicates
  if (!lines.includes(entry)) {
    lines.push(entry);
  }

  fs.writeFileSync(readmePath, lines.join("\n"));
}
