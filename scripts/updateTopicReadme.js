import fs from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "Leetcode DSA");

export function updateTopicReadmes() {
  if (!fs.existsSync(ROOT)) return;

  const topics = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  topics.forEach(topic => {
    const topicPath = path.join(ROOT, topic);

    const problemDirs = fs.readdirSync(topicPath, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort((a, b) => {
        const idA = parseInt(a);
        const idB = parseInt(b);
        return idA - idB;
      });

    let readme = `# 📚 ${topic}\n\n`;
    readme += `Total Problems: ${problemDirs.length}\n\n`;
    readme += `## 🧩 Problems\n`;

    problemDirs.forEach(dir => {
      const id = dir.split("-")[0];
      const title = dir
        .split("-")
        .slice(1)
        .join(" ")
        .replace(/\b\w/g, c => c.toUpperCase());

      readme += `- [${id}. ${title}](./${dir})\n`;
    });

    fs.writeFileSync(path.join(topicPath, "README.md"), readme);
  });

  console.log("✅ Topic READMEs updated");
}
