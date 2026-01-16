// scripts/updateTopicReadme.js
import fs from "fs";
import path from "path";
import { TAG_TO_DSA } from "./tagMapper.js"; // same folder


export function updateTopicReadme(problem) {
  const baseDir = path.join(process.cwd(), "Leetcode DSA");

  const tags = problem.tags ?? [];

tags.forEach(tag => {
    const folderName = TAG_TO_DSA[tag];
    if (!folderName) return;

    const topicDir = path.join(baseDir, folderName);
    if (!fs.existsSync(topicDir)) return;

    const problems = fs.readdirSync(topicDir)
      .filter(f => fs.statSync(path.join(topicDir, f)).isDirectory())
      .sort((a, b) => a.localeCompare(b));

    let content = `# ${folderName}\n\n## Problems\n\n`;
    problems.forEach(p => {
      content += `- [${p}](${p}/README.md)\n`;
    });

    fs.writeFileSync(path.join(topicDir, "README.md"), content);
  });
}
